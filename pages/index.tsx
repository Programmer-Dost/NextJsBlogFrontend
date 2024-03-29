import Head from "next/head";
import { AxiosResponse } from "axios";
import type { GetServerSideProps, NextPage } from "next";
import { fetchArticles, fetchCategories } from "@/http";
import { IArticle, ICategory, ICollectionResponse, IPagination, IQueryOptions } from "@/types";
import Tabs from "@/components/Tabs";
import ArticleList from "@/components/ArticleList";
import qs from "qs";
import Pagination from "@/components/Pagination";
import { useRouter } from "next/router";
import { debounce } from "@/utils";

interface IPropTypes {
  categories: {
    items: ICategory[];
  };
  articles: {
    items: IArticle[];
    pagination: IPagination;
  };
}

const Home: NextPage<IPropTypes> = ({ categories, articles }) => {
  const router = useRouter()
  const { page, pageCount } = articles?.pagination;
  //Search Functionality
  const handleSearch  = (query: string)=>{
router.push(`?search=${query}`)
  }

  return (
    <>
      <Head>
        <title>Next.js Blog</title>
        <meta name="description" content="Next Js Blog" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/LOGO.png" />
      </Head>
      {/* Tabs */}
      <Tabs categories={categories?.items} handleOnSearch={debounce(handleSearch,500)} />
      <ArticleList articles={articles?.items} />
      <Pagination page={page} pageCount={pageCount} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
// console.log("handling search")
  {
    /* Fetch Articles */
  }
  const options: Partial<IQueryOptions> = {
    populate: ["author.avatar"],
    sort: ["id:desc"],
    pagination: {
      page: query.page ? +query.page : 1,
      pageSize:2,
    },
  };

  if(query?.search) {
  options.filters = {
    Title: {
      $containsi: query?.search
    }
  }
  }
  const queryString = qs.stringify(options);
  const { data: articles }: AxiosResponse<ICollectionResponse<IArticle[]>> =
    await fetchArticles(queryString);
  //Fetch Categories
  const { data: categories }: AxiosResponse<ICollectionResponse<ICategory[]>> =
    await fetchCategories();
  // console.log("Categories", categories);
  return {
    props: {
      categories: {
        items: categories?.data,
      },
      articles: {
        items: articles?.data,
        pagination: articles?.meta?.pagination,
      },
    },
  };
};
export default Home;

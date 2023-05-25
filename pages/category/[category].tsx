import React, { use } from "react";
import { GetServerSideProps } from "next";
import { fetchArticles, fetchCategories } from "@/http";
import { AxiosResponse } from "axios";
import { IArticle, ICategory, ICollectionResponse, IPagination, IQueryOptions } from "@/types";
import Tabs from "@/components/Tabs";
import qs from "qs";
import ArticleList from "@/components/ArticleList";
import { useRouter } from "next/router";
import Head from "next/head";
import { debounce, formattedUrl } from "@/utils";
import Pagination from "@/components/Pagination";
interface IPropType {
  categories: {
    items: ICategory[];
    pagination: IPagination;
  };
  articles: {
    items: IArticle[];
    pagination: IPagination;
  };
  slug: string;
}
const Category = ({ categories, articles, slug }: IPropType) => {
  const router = useRouter();
  const { category: categorySlug } = router?.query;
  // const router = useRouter();

  // const formattedUrl = router.asPath.replace(/\//g, "").replace("category","");
  //Way 1
  // const newUrl = formattedUrl.replace(/\-/g, " ");
  // const formatUrl = newUrl.replace("category","");

  //Way 2nd

  // const formattedStr = formattedUrl
  //   .split("-")
  //   .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  //   .join(" ");
  // const capitalizedStr =
  //   formattedUrl.charAt(0).toUpperCase() + formattedUrl.slice(1);

  //Final best way
  const formattedCategory = formattedUrl(slug);
  const { page, pageCount } = articles?.pagination;
  

  //Search Functionality
  const handleSearch = (query: string) => {
    router.push(`/category/${categorySlug}/?search=${query}`);
  };

  return (
    <div>
      <Head>
        <meta name="description" content="Category" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{formattedCategory}</title>
        <link rel="icon" href="/LOGO.png" />
      </Head>
      <div>
        <Tabs categories={categories?.items} handleOnSearch={debounce(handleSearch,500)} />
        <ArticleList articles={articles?.items} />
        <Pagination
          page={page}
          pageCount={pageCount}
          redirectUrl={`/category/${categorySlug}`}
        />
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  // console.log("handling search")
  const options: Partial<IQueryOptions> = {
    populate: ["author.avatar"],
    sort: ["id:desc"],
    filters: {
      category: {
        slug: query.category,
      },
    },
    pagination: {
      page: query.page ? +query.page : 1,
      pageSize: 1,
    },
  };
  if(query.search) {
    options.filters = {
      Title: {
        $containsi: query.search
      }
    }
    }
  const queryString = qs.stringify(options);
  const { data: articles }: AxiosResponse<ICollectionResponse<IArticle[]>> =
    await fetchArticles(queryString);

  //Fetch Categories
  const { data: categories }: AxiosResponse<ICollectionResponse<ICategory[]>> =
    await fetchCategories();
  return {
    props: {
      categories: {
        items: categories.data,
        pagination: categories.meta.pagination,
      },
      articles: {
        items: articles.data,
        pagination: articles.meta.pagination,
      },
      slug: query.category,
    },
  };
};

export default Category;

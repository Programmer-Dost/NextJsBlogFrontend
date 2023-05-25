import Tabs from "@/components/Tabs";
import { fetchArticleByUrl, fetchCategories } from "@/http";
import { IArticle, ICategory, ICollectionResponse, IPagination } from "@/types";
import { debounce, formatDate, serializeMarkdown } from "@/utils";
import { AxiosResponse } from "axios";
import { GetServerSideProps } from "next";
import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import Script from "next/script";
import qs from "qs";

interface IPropType {
  article: IArticle;
  notFound?: boolean;
  categories: {
    items: ICategory[];
    pagination: IPagination;
  };
}

const Slug = ({ categories, article, notFound = false }: IPropType) => {
  //Search Functionality
  const router = useRouter();
  const handleSearch = (query: string) => {
    router.push(`?search=${query}`);
  };
  const title = article?.attributes?.Title;
  const text = article?.attributes?.shortDescription;
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: title,
          text: text,
          url: window.location.href,
        })
        .then(() => console.log("Sharing succeeded."))
        .catch((error) => console.log("Sharing failed:", error));
    } else {
      <div>Sharing failed</div>;
    }
  };

  return (
    <div>
      <Head>
        <title>{article?.attributes?.Title}</title>
        <meta name="description" content="Article" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="https://res.cloudinary.com/dkv7cimyy/image/upload/v1684947640/LOGO_mvvenp.png" />
      </Head>
      {/* {article.attributes.Title} */}
      <Tabs
        categories={categories?.items}
        handleOnSearch={debounce(handleSearch, 500)}
      />

      <div className="my-12 grid p-2 md:p-6 lg:grid-cols-3 gap-12 custom-class w-full">
        <div className="col-span-2">
          <h1 className="text-3xl font-bold py-2">
            {article?.attributes?.Title}
          </h1>
          <div className="flex items-center my-4">
            <div className="rounded-lg overflow-hidden flex items-center justify-center mr-2">
              <Image
                className="h-auto w-auto"
                alt="author-profile"
                src={`${article?.attributes?.author?.data?.attributes?.avatar?.data?.attributes?.formats?.thumbnail?.url}`}
                height={40}
                width={40}
              />
            </div>
            <span className="text-sm font-bold text-gray-600">
              {article?.attributes?.author?.data?.attributes?.firstname}{" "}
              {article?.attributes?.author?.data?.attributes?.lastname} on
              &nbsp;
              <span className="text-gray-400">
                {formatDate(article?.attributes?.updatedAt)}
              </span>
            </span>
          </div>
          <div className="text-md text-gray-600 leading-8 ">
            <img
              className="my-12 mb-6"
              src={`${article?.attributes?.Media?.data[0]?.attributes?.url}`}
              alt={article?.attributes?.Title}
              
            ></img>
            <MDXRemote
              {...(article?.attributes?.Body as MDXRemoteSerializeResult)}
            />
          </div>
        </div>

        <div className="sticky top-0">
          <h2 className="font-bold text-gray-600 text-lg">
            Signup to our newsletter
          </h2>
          <p className="mt-4 text-gray-500">
            Get the latest article on all things data delivered straight to your
            inbox
          </p>
          <input
            className="border w-full p-2 pl-3 my-6 outline-primary"
            type="email"
            placeholder="Your work email"
          />
          <button className="border-2 border-primary rounded py-1 px-6 text-primary font-bold">
            Subscribe
          </button>
          <hr className="my-6 border-gray-100" />
          <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
            {/* {isSupported ? ( */}
            <span
              onClick={handleShare}
              className="text-gray-500 mr-2 cursor-pointer"
            >
              Share
            </span>
            {/* ) : (
        <p>Sharing not supported on this device.</p>
      )} */}

            <a
              href="https://facebook.com/theprogrammerdost"
              className="text-gray-500"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
              </svg>
            </a>
            <a
              href="https://twitter.com/programmerdost"
              className="ml-3 text-gray-500"
            >
              <svg
                fill="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/programmerdost/"
              className="ml-3 text-gray-500"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/programmerdost/"
              className="ml-3 text-gray-500"
            >
              <svg
                fill="currentColor"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="0"
                className="w-5 h-5"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="none"
                  d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                ></path>
                <circle cx="4" cy="4" r="2" stroke="none"></circle>
              </svg>
            </a>
          </span>
          <div className="a2a_kit a2a_kit_size_32 a2a_default_style">
            {/* AddToAny share buttons */}
            <a className="a2a_button_facebook"></a>
            <a className="a2a_button_twitter"></a>
            {/* Additional share buttons */}
          </div>
          <hr className="my-6 border-gray-100" />
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const queryString = qs?.stringify({
    populate: ["Media", "author.avatar"],
    filters: {
      Slug: {
        $eq: query.slug,
      },
    },
  });
  const { data: articles }: AxiosResponse<ICollectionResponse<IArticle[]>> =
    await fetchArticleByUrl(queryString);
  //Fetch Categories
  const { data: categories }: AxiosResponse<ICollectionResponse<ICategory[]>> =
    await fetchCategories();
  if (articles?.data?.length === 0) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      article: await serializeMarkdown(articles?.data[0]),

      categories: {
        items: categories?.data,
      },
    },
  };
};
export default Slug;

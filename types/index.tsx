import { MDXRemoteSerializeResult } from "next-mdx-remote";
export interface ICategory {
  id: number;
  attributes: ICategoryAttribute;
}
export interface ICategoryAttribute {
  Title: string;
  Slug: string;
}
export interface IPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
export interface IResourceMeta {
  pagination: IPagination;
}

export interface ICollectionResponse<T> {
  data: T;
  meta: IResourceMeta;
}

export interface IImageData {
  data: {
    attributes: {
      url: string;
      formats: {
        small: {
          url: string;
        };
      };
    };
  }[];
}
export interface IAuthor {
  data: {
    attributes: {
      firstname: string;
      lastname: string;
      avatar: {
        data: {
          attributes: {
            formats: {
              thumbnail: {
                url: string;
              };
            };
          };
        };
      };
    };
  };
}
export interface IArticleAttributes {
  Body: string | MDXRemoteSerializeResult;
  Title: string;
  Slug: string;
  Media: IImageData;
  updatedAt: string;
  author: IAuthor;
  shortDescription: string;
}

export interface IArticle {
  id: number;
  attributes: IArticleAttributes;
}

export type TDirection = 1 | -1;

export interface IQueryOptions {
  filters: any;
  populate: any;
  sort: any;
  pagination: {
    page: number;
    pageSize: number;
  };
}

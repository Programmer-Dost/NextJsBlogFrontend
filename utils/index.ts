import { IArticle } from "@/types";
import { serialize } from "next-mdx-remote/serialize";

export const formatDate = (dateString: string): String => {
  const date = new Date(dateString).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return date;
};
export const formattedUrl = (slug: string): string => {
  if (typeof slug === "string") {
    const partialFormat = slug.replace(/\//g, "").replace("category", "");
    const formatted = partialFormat
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    return formatted;
  }

  return "";
};
// fn:()=>void fu = function, ()=>void is defined type of function
export const debounce = (fn: (query: string) => void, timeout = 300) => {
  let timer: NodeJS.Timeout;
  const debounced = (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, timeout);
  };
  return debounced;
};

export const serializeMarkdown = async (item: IArticle) => {
  const body = await serialize(item.attributes.Body as string);
  return {
    ...item,
    attributes: {
      ...item.attributes,
      Body: body,
    },
  };
};

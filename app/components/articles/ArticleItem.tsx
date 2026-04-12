import React from "react";
import Link from "next/link";
import { Article } from "../../utils/interfaces";

const ArticleItem = ({ article }: { article: Article }) => {
  return (
    <div className="border-2 border-gray-400 p-4 rounded-lg shadow-md hover:shadow-2xl hover:-translate-y-2 ease-in-out transition-all duration-300  ">
      <h2 className="font-bold text-2xl mb-5">{article.title}</h2>
      <p className="line-clamp-2 mb-5">{article.description}</p>
      <Link
        href={`/articles/${article.id}`}
        className="text-white bg-purple-900 px-4 py-1 rounded-md hover:bg-purple-800 ease-in-out transition-all duration-300 w-full block text-center"
      >
        Read More
      </Link>
    </div>
  );
};

export default ArticleItem;

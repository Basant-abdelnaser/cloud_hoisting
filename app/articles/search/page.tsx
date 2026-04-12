"use client";

import ArticleItem from "@/app/components/articles/ArticleItem";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchArticlesPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("q") || "";

  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/articles/search?q=${search}`, {
        cache: "no-store",
      });

      const json = await res.json();
      setData(json);
    };

    if (search) fetchData();
  }, [search]);

  return (
    <div className="mt-30 mx-auto ">
      <h1 className="text-4xl font-bold mb-15  ">
        Search results for <span className="text-purple-900">{search} </span>
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl  mb-5  md:mx-8 lg:mx-auto">
        {data.map((article) => (
          <div key={article.id} className="min-w-75">
            <ArticleItem article={article} />
          </div>
        ))}
      </div>
      {data.length === 0 && (
        <div className="flex justify-center items-center   ">
          <h1 className="text-4xl font-bold mb-15 text-purple-900 ">
            No results found
          </h1>
        </div>
      )}
    </div>
  );
}

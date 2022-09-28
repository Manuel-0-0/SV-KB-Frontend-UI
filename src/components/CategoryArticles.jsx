import React from "react";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import { useGetArticlesInCategoryQuery } from "../redux/article/articleApiSlice";
import Loading from "./Loading";

const CategoryArticles = ({ categoryId }) => {
  const { data, isLoading, isSuccess, isError, error } =
    useGetArticlesInCategoryQuery({ id: categoryId });

  if (isLoading) return <Loading />;
  else if (isError) return <span>{error}</span>;
  else if (isSuccess)
    return (
      <>
        {data.length > 0 && (
          <div className="lg:flex lg:items-center lg:justify-center mt-5 w-full">
            <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4 px-4 md:px-6 w-9/12 mx-auto">
              {data.map((article) => (
                <div key={article.id} className="shadow-lg max-w-sm rounded-t-md overflow-hidden">
                  <div className="">
                    <div className=" block px-5 py-3 text-lg font-bold bg-[#324299] text-white">
                      <div className="">{article.title}</div>
                    </div>

                    <div className="px-6 py-3">
                      <p className="text-sm text-left ">
                        {parse(`${article.content.substring(0, 250)}...`)}
                      </p>
                    </div>
                    <div className="py-4 px-6  text-left">
                      <Link
                        to={`/articles/${article.id}`}
                        className="text-[#324299]"
                      >
                        Learn more...
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        {data.length === 0 && (
          <p className="text-xl text-gray-600 mb-2">
            Sorry no Articles in this category {" "}
          </p>
        )}
      </>
    );
};

export default CategoryArticles;

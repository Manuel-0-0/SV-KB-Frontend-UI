import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectArticleById } from "../redux/article/articleApiSlice";
import parse from "html-react-parser";

const ArticleCard = ({ articleId }) => {
  const article = useSelector((state) => selectArticleById(state, articleId));
  return (
    <div className="shadow-lg max-w-sm rounded-t-md overflow-hidden">
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
          <Link to={`/articles/${articleId}`} className="text-[#324299]">
            Learn more...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleCard;

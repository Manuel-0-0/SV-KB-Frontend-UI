import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import DefaultLayout from "../layouts/DefaultLayout";
import { selectAllCategories } from "../redux/category/categoryApiSlice";
import { selectAllArticles } from "../redux/article/articleApiSlice";
import DropDown from "../components/DropDown";
import ArticleTable from "../components/ArticleTable";

const Articles = () => {
  const categories = useSelector(selectAllCategories);
  const articles = useSelector(selectAllArticles);
  const [category, setCategory] = useState();
  const [search, setSearch] = useState();
  const [filteredArticles, setFilteredArticles] = useState(articles);

  useEffect(() => {
    setFilteredArticles(articles);
  }, [articles]);

  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value) {
      setFilteredArticles(
        [...articles].filter((article) =>
          article.title.includes(e.target.value)
        )
      );
    } else {
      setFilteredArticles(articles);
    }
  };

  return (
    <DefaultLayout>
      <div className="w-9/12 mx-auto p-4">
        <label
          htmlFor="default-search"
          className="mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Search
        </label>
        <div className="relative">
          <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg
              aria-hidden="true"
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </div>
          <input
            type="search"
            id="default-search"
            value={search}
            onChange={(e) => handleChange(e)}
            className="block p-4 pl-10 w-full text-sm text-gray-900 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Search Articles..."
            required
          />
          <button
            type="submit"
            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
          >
            Search
          </button>
        </div>
        <div className="mt-4">
          <DropDown
            data={categories}
            identifier={"id"}
            name={"categoryName"}
            selected={category}
            setSelected={setCategory}
            defaultName={"Categories"}
          />
        </div>
        <div className="mt-4">
          <ArticleTable
            headers={[
              { name: "Article Name", id: "title" },
              { name: "Date", id: "dateCreated" },
            ]}
            articles={filteredArticles}
          />
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Articles;

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAllCategories } from "../redux/category/categoryApiSlice";
import {
  selectAllArticles,
  useSearchArticlesQuery,
} from "../redux/article/articleApiSlice";
import Table from "./Table";
import CreateArticle from "./CreateArticle";

// Hook
function useDebounce(value, delay) {
  // State and setters for debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(
    () => {
      // Update debounced value after delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
      // Cancel the timeout if value changes (also on delay change or unmount)
      // This is how we prevent debounced value from updating if value is changed ...
      // .. within the delay period. Timeout gets cleared and restarted.
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Only re-call effect if value or delay changes
  );
  return debouncedValue;
}

const AdminDashboardArticle = () => {
  const [showCreate, setShowCreate] = useState(true);
  const categories = useSelector(selectAllCategories);
  const articles = useSelector(selectAllArticles);
  const [category, setCategory] = useState();
  const [search, setSearch] = useState();
  const [filteredArticles, setFilteredArticles] = useState(articles);
  const debouncedSearchQuery = useDebounce(search, 500);
  const { data: searchResult, isSuccess } = useSearchArticlesQuery(
    debouncedSearchQuery,
    {
      skip: debouncedSearchQuery === "",
    }
  );

  useEffect(() => {
    setFilteredArticles(articles);
  }, [articles]);

  useEffect(() => {
    if (isSuccess && searchResult.length > 0) {
      setFilteredArticles(searchResult);
    }
  }, [searchResult, isSuccess]);

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
    <div className="w-11/12 mx-auto p-6 rounded bg-white border">
      {!showCreate && <></>}
      {showCreate && <CreateArticle setShowCreate={setShowCreate} />}
    </div>
  );
};

export default AdminDashboardArticle;

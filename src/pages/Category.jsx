import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { selectAllCategories } from "../redux/category/categoryApiSlice";
import DefaultLayout from "../layouts/DefaultLayout";
import CategoryArticles from "../components/CategoryArticles";

const Category = () => {
  const [category, setCategory] = useState();
  const [active, setActive] = useState();
  const location = useLocation();
  const categories = useSelector(selectAllCategories);

  useEffect(() => {
    if (location.state?.categoryId) {
      setCategory(
        categories.find((category) => category.id === location.state.categoryId)
      );
      setActive(
        categories.find((category) => category.id === location.state.categoryId)
          .id
      );
    } else {
      setCategory(categories[0]);
      setActive(categories[0].id);
    }
  }, [categories, location.state?.categoryId]);

  return (
    <DefaultLayout>
      <div className="text-sm px-4 md:px-16 font-medium text-center text-gray-600 border-b border-gray-600 mb-4">
        <ul className="flex flex-wrap -mb-px overflow-x-auto">
          {categories.length > 0 && category ? (
            categories
              .sort((a, b) => {
                if (a.id === active) return -1;
                else return 1;
              })
              .map((cat) => (
                <li key={cat.id} className="mr-2">
                  <button
                    onClick={() => setCategory(cat)}
                    className={`inline-block p-4 rounded-t-lg border-b-2 border-transparent ${
                      cat.id === category.id && "text-blue-500 border-blue-500"
                    } hover:text-blue-400 hover:border-blue-400`}
                  >
                    {cat.categoryName}
                  </button>
                </li>
              ))
          ) : (
            <p className="text-xl text-gray-600 mb-2">
              Sorry no Categories to show{" "}
            </p>
          )}
        </ul>
      </div>
      {category && <CategoryArticles categoryId={category.id} />}
    </DefaultLayout>
  );
};

export default Category;

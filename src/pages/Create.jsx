import React, { useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import CreateCategory from "../components/CreateCategory";
import CreateArticle from "../components/CreateArticle";

const Create = () => {
  const [tab, setTab] = useState("category");
  return (
    <DefaultLayout>
      <div className="lg:w-6/12 md:w-8/12 w-10/12 mx-auto flex justify-between p-4">
        <button
          onClick={() => setTab("category")}
          type="button"
          className={` text-blue-500 ${
            tab === "category" && "bg-blue-700 text-white "
          } hover:bg-blue-800 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none`}
        >
          Category
        </button>
        <button
          onClick={() => setTab("article")}
          type="button"
          className={`text-blue-500 ${
            tab === "article" && "bg-blue-700 text-white "
          } hover:bg-blue-800 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 focus:outline-none`}
        >
          Article
        </button>
      </div>
      <div className="mt-4 lg:w-6/12 md:w-8/12 w-10/12 mx-auto mb-4">
        {tab === "category" && <CreateCategory />}
        {tab === "article" && <CreateArticle />}
      </div>
    </DefaultLayout>
  );
};

export default Create;

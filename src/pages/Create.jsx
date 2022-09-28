import React, { useState } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import CreateCategory from "../components/CreateCategory";
import CreateArticle from "../components/CreateArticle";

const Create = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <DefaultLayout>
      <div className="lg:w-6/12 md:w-8/12 w-10/12 mx-auto flex justify-between p-4">
        <div class="flex justify-center">
          <label
            for="large-toggle"
            class="inline-flex relative items-center cursor-pointer"
          >
            <input
              type="checkbox"
              value={toggle}
              onChange={() => setToggle(!toggle)}
              id="large-toggle"
              class="sr-only peer"
            />
            <div class="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"></div>
            <span class="ml-3 text-sm font-medium text-gray-900">
              Togggle to Switch between category and article creation
            </span>
          </label>
        </div>
      </div>
      <div className="mt-4 lg:w-6/12 md:w-8/12 w-10/12 mx-auto mb-4">
        {!toggle && <CreateCategory />}
        {toggle && <CreateArticle />}
      </div>
    </DefaultLayout>
  );
};

export default Create;

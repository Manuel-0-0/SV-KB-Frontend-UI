import React, { useState } from "react";
import { useCreateCategoryMutation } from "../redux/category/categoryApiSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CreateCategory = () => {
  const navigate = useNavigate()
  const [createNewCategory, { isLoading }] = useCreateCategoryMutation();
  const [categoryName, setCategoryName] = useState("");
  const canSave = [categoryName].every(Boolean) && !isLoading;

  const createCategory = async () => {
    if (canSave) {
      try {
        await createNewCategory({ CategoryName: categoryName }).unwrap();
        setCategoryName("");
        toast.success("Category created");
        navigate('/')
      } catch (err) {
        toast.error(err.data)
      }
    }
  };
  return (
    <>
    <div>
      <h1 className="text-lg font-bold block ">
          Create a Category
       </h1>
    </div>
      <form>
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="text"
            name="category_name"
            id="category_name"
            onChange={(e) => setCategoryName(e.target.value)}
            value={categoryName}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="category_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            New category name
          </label>
        </div>
        <button
          disabled={!canSave}
          onClick={createCategory}
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default CreateCategory;

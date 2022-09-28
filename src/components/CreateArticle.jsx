import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { selectAllCategories } from "../redux/category/categoryApiSlice";
import { useCreateArticleMutation } from "../redux/article/articleApiSlice";
import DropDown from "./DropDown";
import { formats, modules } from "../utilities/Editor";

const CreateArticle = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState();
  const categories = useSelector(selectAllCategories);
  const [createNewArticle, { isLoading }] = useCreateArticleMutation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const canSave = [title, content, category?.id].every(Boolean) && !isLoading;

  const createArticle = async () => {
    if (canSave) {
      try {
        await createNewArticle({
          title,
          content,
          CategoryId: category.id,
        }).unwrap();
        setTitle("");
        setContent("");
        toast.success("Article created");
        navigate("/");
      } catch (err) {
        toast.error(err.data)
      }
    }
  };
  return (
    <>
      <div>
        <h1 className="text-lg font-bold block ">Create an Article</h1>
      </div>
      <form>
        <div className="relative z-0 mb-6 w-full group">
          <input
            type="text"
            name="article_name"
            id="article_name"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <label
            htmlFor="article_name"
            className="peer-focus:font-medium absolute text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Article Title
          </label>
        </div>
        <div className="relative z-10 mb-6 w-full group mt-4">
          <DropDown
            data={categories}
            identifier={"id"}
            name={"categoryName"}
            selected={category}
            setSelected={setCategory}
            defaultName={"Categories"}
          />
        </div>
        <div className="relative flex flex-1 flex-col z-0 mb-6 w-full h-full ">
          <label
            htmlFor="content"
            className="block mb-2 text-lg font-medium text-gray-900 "
          >
            Content
          </label>
          <ReactQuill
            theme="snow"
            placeholder="Write Something..."
            formats={formats}
            modules={modules}
            className="block p-2.5 w-full text-sm flex-1 overflow-y-auto"
            value={content}
            onChange={setContent}
          />
        </div>

        <div className="relative z-0 mb-6 w-full h-full">
          <button
            disabled={!canSave}
            onClick={createArticle}
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center my-4"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateArticle;

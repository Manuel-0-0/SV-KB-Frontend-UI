import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useSelector, useDispatch } from "react-redux";
import ReactQuill from "react-quill";

import { useUpdateArticleMutation } from "../redux/article/articleApiSlice";
import { selectAllCategories } from "../redux/category/categoryApiSlice";
import { formats, modules } from "../utilities/Editor";
import { addToast } from '../redux/toast/toastSlice'

const EditArticleModal = ({ modal, onModalClose, article, setArticle }) => {
  // const [fileValue, setFileValue] = useState();
  const dispatch = useDispatch();
  const [description, setDescription] = useState(article.content);
  const [updateArticle, { isLoading }] = useUpdateArticleMutation();
  const [open, setOpen] = useState(modal);
  const cancelButtonRef = useRef(null);
  const categories = useSelector(selectAllCategories);

  const handleUpdateArticle = async () => {
    try {
      await updateArticle({ ...article, content: description }).unwrap();
      setArticle((prevValue) => {
        return {
          ...prevValue,
          content: description,
        };
      });
      dispatch(
        addToast({
          message: "Article updated",
          messageType: "success",
        })
      );
      onModalClose()
    } catch (err) {
      const error = err.data?.error || err.data;
      dispatch(
        addToast({
          message: error,
          messageType: "error",
        })
      );
    }
  };

  useEffect(() => {
    setOpen(modal);
  }, [modal]);

  return (
    <Transition.Root show={open} as={Fragment}>
      {article && description ? (
        <Dialog
          as="div"
          className="fixed z-30 inset-0 overflow-y-auto"
          initialFocus={cancelButtonRef}
          onClose={onModalClose}
        >
          <div className="flex items-end justify-center min-h-screen pt-4 pb-20 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block align-top bg-white rounded-lg px-10 py-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-11/12">
                <div>
                  <h2 className="mt-6 text-center text-xl sm:text-3xl font-extrabold text-gray-900">
                    Edit Article
                  </h2>
                </div>

                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full px-3 mb-6 md:mb-4">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="name"
                    >
                      Article Title
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      className="relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 text-gray-900 rounded-lg focus:outline-none  focus:z-10 sm:text-sm shadow-sm"
                      value={article.title}
                      onChange={(e) =>
                        setArticle((prevValue) => {
                          return {
                            ...prevValue,
                            title: e.target.value,
                          };
                        })
                      }
                    />
                  </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-2">
                  <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      htmlFor="year"
                    >
                      Category
                    </label>
                    <div className="relative">
                      <select
                        className="block appearance-none w-full border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        name="category"
                        // value={articleDetails.title}
                        // onChange={(e) =>
                        //   setarticleDetails((prevValue) => {
                        //     return {
                        //       ...prevValue,
                        //       title: e.target.value,
                        //     };
                        //   })
                        // }
                      >
                        {categories.map((category) => (
                          <option
                            key={category.id}
                            value={category.categoryName}
                          >
                            {category.categoryName}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          className="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  <div className="w-full mb-6 md:mb-4" data-color-mode="light">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-3">
                      Description
                    </label>
                    <ReactQuill
                      theme="snow"
                      value={description}
                      onChange={setDescription}
                      formats={formats}
                      modules={modules}
                      className="block p-2.5 w-full text-sm"
                    />
                  </div>

                  {/* <div>
												<small className="text-gray-500">{carPost.imageUrl}</small>
												<input
													className="block w-full mb-4 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
													id="file"
													name="file"
													type="file"
													onChange={(event) => {
														setFileValue(event.target.files[0]);
													}}
												/>
											</div> */}

                  <button
                    type="submit"
                    onClick={handleUpdateArticle}
                    className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <svg
                        style={{ borderTopColor: "transparent" }}
                        className="animate-spin h-5 w-5 mr-3 rounded-full border-2 border-white border-solid"
                        viewBox="0 0 24 24"
                      >
                        {" "}
                      </svg>
                    ) : null}
                    {isLoading ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      ) : null}
    </Transition.Root>
  );
};

export default EditArticleModal;

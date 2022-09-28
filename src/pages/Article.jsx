import React, { useState, useEffect } from "react";
import DefaultLayout from "../layouts/DefaultLayout";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/20/solid";
import parse from "html-react-parser";
import { toast } from "react-toastify";
import {
  useGetArticleQuery,
  useDeleteArticleMutation,
} from "../redux/article/articleApiSlice";
import Loading from "../components/Loading";
import EditArticleModal from "../components/EditArticleModal";

const Articles = () => {
  const { articleId } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isSuccess, isError, error } = useGetArticleQuery({
    id: articleId,
  });

  const [article, setArticle] = useState();

  const [deleteArticle] = useDeleteArticleMutation();

  const [open, setOpen] = useState(false);

  const onModalClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setArticle(data);
  }, [data]);

  const handleDeleteArticlePost = async () => {
    try {
      await deleteArticle({ id: articleId }).unwrap();
      toast.success("Article deleted successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.data);
    }
  };

  if (isLoading) return <Loading />;
  else if (isError) return <p>{error} </p>;
  else if (isSuccess && article)
    return (
      <DefaultLayout>
        {/* <div className="h-96 flex max-w-4xl md:mt-20 mx-auto px-12 lg:px-24 justify-center items-center">
          {/* <img
            src="https://th.bing.com/th/id/R.f9ef5df23a52d7f600bb0213d5184a67?rik=eYxpO8N1BBMGhw&pid=ImgRaw&r=0"
            alt={article?.title}
            className="w-full object-cover"
          /> 
        </div> */}
        <div className="max-w-4xl mx-auto bg-white py-12 px-12 lg:px-24">
          <h2 className="mt-4 uppercase tracking-widest text-xs text-gray-600">
            {moment(article?.dateCreated).format("Do MMM, YYYY")}
          </h2>
          <h1 className="font-display text-2xl md:text-3xl text-gray-900 mt-4 flex">
            {article?.title}

            <button onClick={() => setOpen(true)}>
              <PencilSquareIcon className="ml-2 h-6 w-6 text-blue-500" />
            </button>

            <button onClick={() => handleDeleteArticlePost()}>
              <TrashIcon className="ml-2 h-6 w-6 text-red-500" />
            </button>
          </h1>
          <div className="prose prose-sm sm:prose lg:prose-lg mt-6">
            <p data-color-mode="light"> {parse(`${article?.content}`)}</p>
          </div>

          <div className="text-lg mt-10 font-bold">
            {/* <p className="text-gray-900 leading-none">
              Created By :
              {user && user._id === carPost.createdBy._id
                ? " You"
                : carPost.createdBy.firstName +
                  " " +
                  carPost.createdBy.lastName}
            </p>
            <p className="text-gray-900 leading-none mt-4">
              Contact : {carPost.createdBy.email}
            </p> */}
          </div>
        </div>
        <EditArticleModal
          modal={open}
          onModalClose={onModalClose}
          article={article}
          setArticle={setArticle}
        />
      </DefaultLayout>
    );
};

export default Articles;

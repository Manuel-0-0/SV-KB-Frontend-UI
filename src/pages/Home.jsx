import React from "react";
import { useGetCategoriesQuery } from "../redux/category/categoryApiSlice";
import Loading from "../components/Loading";

const Home = () => {
  const { isLoading, isSuccess, isError, error } = useGetCategoriesQuery;

  if (isLoading) return <Loading />;
  else if (isError) return <p>{error}</p>;
  else if (isSuccess)
    return (
      <>
        <div className="h-full flex mt-10 md:mt-0 flex-col md:flex-row items-center">
          <div className=" px-4 md:px-16 mb-10">
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4 md:mb-8">
              Automobiles{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
                Finder
              </span>
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Find automobiles easily from the comfort of your phone
            </p>
            <p className="mt-6"></p>
          </div>
          <div className="">
            {" "}
            <img src="/images/search.png" alt="header_image" />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center pt-10 md:pt-20">
          <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 md:mb-8">
            Featured Cars
          </h2>
          <div className="lg:flex lg:items-center lg:justify-center mb-14"></div>
        </div>
      </>
    );
};

export default Home;

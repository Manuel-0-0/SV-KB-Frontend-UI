import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import DashboardHome from "../components/DashboardHome";
import Icon from "../utilities/icons/SunValley";
import {
  HomeIcon,
  NewspaperIcon,
  Square3Stack3DIcon,
  Bars3Icon,
} from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { openSideBar, closeSideBar } from "../redux/sideBar/sideBarSlice";
import AdminDashboardArticle from "../components/AdminDashboardArticle";
import AdminDashboardCategory from "../components/AdminDashboardCategory";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navBars = [
    {
      name: "Home",
      component: <DashboardHome />,
      icon: <HomeIcon className="h-5 w-5" />,
    },
    {
      name: "Category",
      component: <AdminDashboardCategory />,
      icon: <Square3Stack3DIcon className="h-5 w-5" />,
    },
    {
      name: "Article",
      component: <AdminDashboardArticle />,
      icon: <NewspaperIcon className="h-5 w-5" />,
    },
  ];
  const [activeNav, setActiveNav] = useState(navBars[2]);

  const [screenSize, setScreenSize] = useState();
  const sideBarOpen = useSelector((state) => state.sideBar.open);

  const setDimension = (e) => {
    if (e.currentTarget.innerWidth >= 1024) {
      dispatch(openSideBar());
    } else {
      dispatch(closeSideBar());
    }
    setScreenSize(e.currentTarget.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", setDimension);

    return () => {
      window.removeEventListener("resize", setDimension);
    };
  }, []);

  return (
    <main className="bg-gray-100 min-h-screen max-height-screen overflow-hidden">
      <div className="flex items-start justify-between">
        <div
          className={`h-screen ${
            sideBarOpen || screenSize > 1024 ? "block" : "hidden"
          }  shadow-lg lg:block relative w-80`}
        >
          <div className="bg-[#324299] h-full ">
            <div className="flex items-center justify-start pt-6 ml-8">
              <Link to="/">
                <Icon mobile={screenSize < 1024 ? true : false} />
              </Link>
            </div>
            <nav className="mt-6">
              <div>
                {navBars.map((navBar) => (
                  <button
                    className={`w-full text-white flex items-center pl-6 p-2 my-2 transition-colors duration-200 justify-start ${
                      navBar.name === activeNav.name &&
                      "border-l-[4px] border-white"
                    }`}
                    onClick={() => {
                      if (screenSize < 1024) {
                        if (sideBarOpen) {
                          dispatch(closeSideBar());
                          setActiveNav(navBar);
                        } else dispatch(openSideBar());
                      } else setActiveNav(navBar);
                    }}
                  >
                    {navBar.icon}
                    <span className="mx-2 text-sm font-normal">
                      {navBar.name}
                    </span>
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>

        <div className="flex flex-col w-full md:space-y-4">
          <header className="w-full lg:hidden h-16 z-40 flex items-center justify-between">
            <div className="ml-6">
              <button
                onClick={() => {
                  dispatch(openSideBar());
                }}
                className="flex p-2 items-center rounded-full bg-white shadow text-gray-500 text-md"
              >
                <Bars3Icon className="h-6 w-6" />
              </button>
            </div>
          </header>

          <div className="w-full pb-10 bg-gray-100 px-5 py-10 min-h-[98vh] max-h-[98vh] overflow-y-auto">
            {activeNav.component}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;

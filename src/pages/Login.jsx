import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useDispatch } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Icon from "../utilities/icons/SunValley";
import { LoginSchema } from "../utilities/schemas";
import { addToast } from "../redux/toast/toastSlice";
import { useLoginMutation } from "../redux/user/userApiSlice";
import { setCredentials } from "../redux/user/userSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [login] = useLoginMutation();

  const handleLogin = async ({ email, password }, { setSubmitting }) => {
    try {
      console.log("hi");
      setSubmitting(true);
      const loggedInUser = await login({
        email,
        password,
      }).unwrap();

      dispatch(
        setCredentials({
          user: loggedInUser.user,
          token: loggedInUser.token,
        })
      );

      dispatch(
        addToast({
          message: "Login successfully",
          messageType: "success",
        })
      );
      setSubmitting(false);
      navigate("/");
    } catch (err) {
      const error = err.data?.error || err.data;
      dispatch(
        addToast({
          message: error,
          messageType: "error",
        })
      );
      setSubmitting(false);
    }
  };
  return (
    <>
      <Helmet>
        <title>Login | SunValley</title>
      </Helmet>
      <section className="bg-[#324299]">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-screen w-screen">
          <Link
            to="/"
            className="flex items-center mb-6 text-2xl font-semibold"
          >
            <Icon className="w-8 h-8 mr-2" />
          </Link>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-[#324299] md:text-2xl">
                Sign in to your account
              </h1>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={LoginSchema}
                onSubmit={handleLogin}
              >
                {({ isSubmitting, errors, touched, isValid, dirty }) => (
                  <Form className="space-y-4 md:space-y-6">
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Email Address
                      </label>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        className={`text-gray-900 sm:text-sm rounded-lg bg-gray-50 block w-full p-2.5 ${
                          errors.email && touched.email
                            ? "border-red-300 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                            : "focus:ring-[#324299] focus:border-[#324299]"
                        } `}
                        placeholder="example@example.com"
                      />
                      <ErrorMessage
                        className="text-red-500 ml-2 mt-2"
                        component="div"
                        name="email"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Password
                      </label>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        className={`text-gray-900 sm:text-sm rounded-lg bg-gray-50 block w-full p-2.5 ${
                          errors.password && touched.password
                            ? "border-red-300 placeholder-red-500 focus:ring-red-500 focus:border-red-500"
                            : "focus:ring-[#324299] focus:border-[#324299]"
                        } `}
                        placeholder="••••••••"
                      />
                      <ErrorMessage
                        className="text-red-500 ml-2 mt-2"
                        component="div"
                        name="password"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div></div>
                      <Link
                        to="/"
                        className="text-sm font-medium hover:underline text-[#324299]"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <button
                      disabled={!(isValid && dirty) || isSubmitting}
                      type="submit"
                      className={`w-full text-white ${
                        !(isValid && dirty) || isSubmitting
                          ? "bg-blue-300"
                          : "bg-[#324299] focus:ring-[#324299] hover:bg-blue-700 focus:ring-4 focus:outline-none"
                      } font-medium rounded-lg text-sm px-5 py-2.5 text-center`}
                    >
                      {isSubmitting ? (
                        <span className="animate-pulse">Logging in...</span>
                      ) : (
                        <span className="fadeIn">Log in</span>
                      )}
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

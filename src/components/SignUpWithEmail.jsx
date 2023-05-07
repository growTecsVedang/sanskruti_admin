import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpUserWithEmail } from "../Redux/slices/UserSlice";

export const SignUpWithEmail = () => {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      signUpUserWithEmail({
        username,
        email,
        password,
      })
    );
  }

  return (
    <section className="w-[90%] mx-auto   md:w-full h-[100vh] flex items-center justify-center">
      <div className="w-full sm:w-[400px] ">
        <h1 className="text-2xl sm:text-4xl text-center mb-5 font-bold">
          Sanskrutinx
        </h1>
        <h2 className="text-3xl font-bold leading-tight text-black ">
          Sign Up
        </h2>
        <p className="mt-2 text-base text-gray-600 ">
          Already have an account?
          <div className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700">
            <Link to="/">Sign In</Link>
          </div>
        </p>

        <form className="mt-4">
          <div className="space-y-5">
            <div>
              <label
                htmlFor="name"
                className="text-base font-medium text-gray-900 "
              >
                UserName
              </label>
              <div className="mt-2.5">
                <input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-offset-gray-900 "
                  type="text"
                  placeholder="Enter username"
                  id="name"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-base font-medium text-gray-900 "
              >
                Email address
              </label>
              <div className="mt-2.5">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-offset-gray-900"
                  type="email"
                  placeholder="Enter Your Email"
                  id="email"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-base font-medium text-gray-900"
              >
                Password
              </label>
              <div className="mt-2.5">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-offset-gray-900"
                  type="password"
                  placeholder="Enter Your Password"
                  id="password"
                />
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={(e) => handleSubmit(e)}
                className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
              >
                Sign Up With Email
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="ml-2 h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

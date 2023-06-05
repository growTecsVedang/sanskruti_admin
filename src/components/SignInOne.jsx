import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory, useLocation } from "react-router-dom";
import { MdOutlineEmail } from "react-icons/md";
import { AiOutlinePhone } from "react-icons/ai";
import { toast } from "react-toastify";
import {
  clearState,
  logInUserWithEmailOrNumber,
} from "../Redux/slices/UserSlice";

const SignInOne = () => {
  const [Mobile_No, setMobile_No] = useState(0);
  const [enable, setEnable] = useState(true);
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const location = useLocation();
  const { message, type, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    console.log(email, enable);

    if (enable) {
      if (phone.trim() !== "" && password.trim() !== "") {
        setEmail("");
        dispatch(
          logInUserWithEmailOrNumber({
            emailOrNumber: Mobile_No,
            password,
          })
        );
      }
    } else {
      if (email.trim() !== "" && password.trim() !== "") {
        setPhone("");
        dispatch(
          logInUserWithEmailOrNumber({
            emailOrNumber: email,
            password,
          })
        );
      }
    }
  }

  useEffect(() => {
    setMobile_No(Number(phone));
  }, [phone]);
  const redirect = location.search ? location.search.split("=")[1] : "/home";

  useEffect(() => {
    const notify = (arg) => toast(`${arg}`);
    if (isAuthenticated) {
      history.push(redirect);
    } else if (message && type) {
      if (type === "success") {
        notify(message);
        dispatch(clearState());
        history.push(redirect);
      } else {
        notify(message);
        dispatch(clearState());
      }
    }
  }, [dispatch, isAuthenticated, type, message, redirect, history]);
  return (
    <section className="  mx-auto bg-white  md:w-full h-[100vh] flex flex-col items-center justify-center">
      <div className=" flex-col flex sm:flex-row w-full sm:justify-center">
        {/* <div className="sm:w-[340px] hidden sm:block sm:h-[500px] ">
          <img
            src="https://res.cloudinary.com/dqyvomyqy/image/upload/v1685627565/pexels-evg-kowalievska-1148957_yvciqy.jpg"
            alt=""
            className="object-fill h-[500px] "
          />
        </div> */}
        <div className="sm:w-[460px]  min-h-full bg-gray-300 flex justify-center border-2 ">
          <div className="w-[95%] sm:w-[430px] h-full ">
            <div className="sm:text-3xl text-2xl  m-5 text-[#58248d]  font-bold flex justify-center">
              Sanskrutinx Admin Panel
            </div>
            <h2 className="text-3xl mb-2 text-center font-bold leading-tight text-black  sm:text-3xl">
              Sign in
            </h2>
            <div className="mt-1 flex gap-x-2  text-base text-gray-600 ">
              <p> Don&apos;t have an account?</p>
              <Link
                to="/register"
                className="cursor-pointer font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700"
              >
                Create a free account
              </Link>
            </div>

            <form className="mt-3">
              <div className="space-y-2">
                {enable ? (
                  <div>
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900 "
                    >
                      Phone No
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-[35px] w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  dark:focus:ring-offset-gray-900"
                        type="number"
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Enter Your Phone No"
                        value={phone}
                      ></input>
                    </div>
                  </div>
                ) : (
                  <div>
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900 "
                    >
                      Email
                    </label>
                    <div className="mt-2">
                      <input
                        className="flex h-[35px] w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700  dark:focus:ring-offset-gray-900"
                        type="text"
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Your email"
                        value={email}
                      ></input>
                    </div>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor=""
                      className="text-base font-medium text-gray-900 "
                    >
                      Password
                    </label>

                    <div className="text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:underline focus:text-indigo-700">
                      Forgot password?
                    </div>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-[35px] w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-offset-gray-900"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Your Password"
                    ></input>
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e)}
                    className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-[6px] text-base font-semibold leading-7 text-white hover:bg-indigo-500"
                  >
                    Sign In
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      className="ml-2 h-4 w-4"
                    >
                      <path d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
            <div className="my-2 space-y-2  ">
              {enable ? (
                <button
                  type="button"
                  onClick={() => setEnable(!enable)}
                  className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-500 bg-white px-4 py-2 text-base font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none "
                >
                  <div className="absolute inset-y-0 left-0 p-2">
                    <MdOutlineEmail size={28} />
                  </div>
                  Sign in with Email
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setEnable(!enable)}
                  className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-500 bg-white px-4 py-2 text-base font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none "
                >
                  <div className="absolute inset-y-0 left-0 p-2">
                    <AiOutlinePhone size={26} />
                  </div>
                  Sign in with Phone No
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInOne;

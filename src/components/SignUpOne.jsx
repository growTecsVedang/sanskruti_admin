import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineEmail } from "react-icons/md";
import { toast } from "react-toastify";
import { clearState, signUpUserWithNumber } from "../Redux/slices/UserSlice";

const SignUpOne = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { message, type } = useSelector((state) => state.user);
  const [username, setUsername] = useState("");
  const [Mobile_No, setMobile_No] = useState(0);
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState(" ");
  function handleSubmit(e) {
    e.preventDefault();
    if (
      username.trim() !== "" &&
      phone.trim() !== "" &&
      password.trim() !== ""
    ) {
      dispatch(
        signUpUserWithNumber({
          username,
          Mobile_No,
          password,
        })
      );
    }
  }

  useEffect(() => {
    setMobile_No(Number(phone));
  }, [phone]);

  useEffect(() => {
    const notify = (arg) => toast(`${arg}`);
    if (message && type) {
      if (type === "success") {
        notify(message);
        dispatch(clearState());
        history.push("/");
      } else {
        notify(message);
        dispatch(clearState());
        setPhone("");
      }
    }
  }, [dispatch, message, type, history]);

  return (
    <section className="w-[90%] mx-auto   md:w-full h-[100vh] flex items-center justify-center">
      <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
        <h1 className="text-2xl sm:text-4xl text-center mb-5 font-bold">
          Sanskrutinx
        </h1>
        <h2 className="text-3xl font-bold leading-tight text-black ">
          Sign Up
        </h2>
        <div className="mt-2 text-base text-gray-600 ">
          Already have an account?
          <div className="font-medium text-indigo-600 transition-all duration-200 hover:text-indigo-700 hover:underline focus:text-indigo-700">
            <Link to="/">Sign In</Link>
          </div>
        </div>

        <form action="#" method="POST" className="mt-4">
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
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-offset-gray-900 "
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  placeholder="Enter You Full Name"
                  id="name"
                ></input>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="text-base font-medium text-gray-900 "
              >
                Phone No
              </label>
              <div className="mt-2.5">
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-offset-gray-900"
                  onChange={(e) => setPhone(e.target.value)}
                  type="number"
                  value={phone}
                  placeholder="Enter Your Phone No"
                ></input>
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
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent py-2 px-3 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700 dark:focus:ring-offset-gray-900"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                  id="password"
                ></input>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={(e) => handleSubmit(e)}
                className="inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3.5 py-2.5 text-base font-semibold leading-7 text-white hover:bg-indigo-500"
              >
                Sign Up
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="ml-2 h-4 w-4"
                >
                  <path d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                </svg>
              </button>
            </div>
          </div>
        </form>
        <div className="mt-3 space-y-3">
          <Link to="/emailauth">
            <button
              type="button"
              className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-500 bg-white px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none "
            >
              <div className="absolute inset-y-0 left-0 p-4">
                <MdOutlineEmail size={28} />
              </div>
              Sign up with Email
            </button>
          </Link>

          <button
            type="button"
            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-500 bg-white px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none "
          >
            <div className="absolute inset-y-0 left-0 p-4">
              <svg
                className="h-6 w-6 text-rose-500"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.908 8.908 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625z"></path>
              </svg>
            </div>
            Sign up with Google
          </button>

          <button
            type="button"
            className="relative inline-flex w-full items-center justify-center rounded-md border border-gray-500 bg-white px-4 py-4 text-base font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-black focus:bg-gray-100 focus:text-black focus:outline-none "
          >
            <div className="absolute inset-y-0 left-0 p-4">
              <svg
                className="h-6 w-6 text-[#2563EB]"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path>
              </svg>
            </div>
            Sign up with Facebook
          </button>
        </div>
      </div>
    </section>
  );
};

export default SignUpOne;

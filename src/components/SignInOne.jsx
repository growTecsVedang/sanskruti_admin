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
import { ArrowRight } from "lucide-react";
import { loadUser } from "../Redux/slices/LoadUserSlice";

const SignInOne = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const history = useHistory();
  const location = useLocation();
  const { message, type, isAuthenticated, role } = useSelector(
    (state) => state.user
  );
  const { loaduser, loading, isAuthenticate } = useSelector(
    (state) => state.loaduser
  );
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    if (email !== "" && password !== "") {
      const uniqueIdentity = checkType();
      dispatch(
        logInUserWithEmailOrNumber({
          emailOrNumber: uniqueIdentity,
          password,
        })
      );
    }
  }
  function getCookie() {
    var name = "connect.sid".concat("=");
    var decodedCookie = document.cookie;
    var cookieArray = decodedCookie.split(";");

    for (var i = 0; i < cookieArray.length; i++) {
      var cookie = cookieArray[i].trim();
      if (cookie.startsWith(name)) {
        return cookie.substring(name.length, cookie.length);
      }
    }
    return null; // Cookie not found
  }

  const checkType = () => {
    if (Number.isNaN(Number(email))) {
      return email;
    } else {
      return Number(email);
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/home";

  useEffect(() => {
    const notify = (arg) => toast(`${arg}`);

    if (isAuthenticate && loading === false && loaduser.role !== "USER") {
      history.push(redirect);
    }

    if (isAuthenticated && role !== "USER") {
      dispatch(
        loadUser({
          cookie: getCookie(),
        })
      );
      history.push(redirect);
    } else {
      if (message && type) {
        if (role === "USER") {
          notify("USER is not allowed");
          dispatch(clearState());
        } else {
          notify(message);
          dispatch(clearState());
        }
      }
    }
  }, [dispatch, isAuthenticated, type, message, redirect, history]);
  return (
    <section>
      <div className="flex items-center justify-center w-full h-[100vh]  ">
        <div className="w-[400px] border-[1px] p-2 ">
          <div className="mb-2 flex gap-x-2 justify-center">
            <img
              src="https://res.cloudinary.com/dqyvomyqy/image/upload/v1686160747/authorization_tkpfnm.png"
              className="w-[60px] h-[50px] "
              alt="imgicon"
            />
            <p className="flex items-center  text-4xl font-bold ">
              Admin Panel
            </p>
          </div>
          <h2 className="text-center text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 ">
            Don&apos;t have an account?
            <p className=" cursor-pointer font-semibold text-black transition-all duration-200 hover:underline">
              Create a free account
            </p>
          </p>
          <form action="#" method="POST" className="mt-8">
            <div className="space-y-5">
              <div>
                <label
                  htmlFor=""
                  className="text-base font-medium text-gray-900"
                >
                  Email / Phone
                </label>
                <div className="mt-2">
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="email"
                    placeholder="Email or Phone"
                  ></input>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor=""
                    className="text-base font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <p className=" cursor-pointer text-sm font-semibold text-black hover:underline">
                    Forgot password?
                  </p>
                </div>
                <div className="mt-2">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                    type="password"
                    placeholder="Password"
                  ></input>
                </div>
              </div>
              <div>
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e)}
                  className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
                >
                  Sign In <ArrowRight className="ml-2" size={16} />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SignInOne;

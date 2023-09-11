import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearState,
  logInUserWithEmailOrNumber,
} from "../Redux/slices/UserSlice";
import { Input } from "./common/Input";

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
    if (message && type) {
      if (type === "success") {
        if (isAuthenticated && role !== "USER") {
          notify(message);
          history.push(redirect);
          dispatch(clearState());
        } else {
          notify("Role of USER is not allowed !");
        }
      } else {
        notify(message);
        dispatch(clearState());
      }
    }
  }, [dispatch, type, message, history, isAuthenticate]);
  return (
    <main className="flex relative items-center justify-center isolate w-full h-screen">
      <div className="w-[50vw] -z-10 h-[50vh] absolute bottom-0 right-0 bg-gradient-to-br from-white from-50% via-orange-50 to-orange-200"></div>
      <div className="w-[50vw] -z-10 h-[50vh] absolute top-0 left-0 bg-gradient-to-tl from-white from-50% via-orange-50 to-orange-200"></div>
      <div className="max-w-[400px] w-full flex flex-col gap-3 md:rounded-xl md:shadow-xl px-4 py-8">
        <div className="mb-2 flex gap-x-2 justify-center">
          <img
            src="/sanskruti-logo.svg"
            className="w-full h-[80px]"
            alt="Sanskruti Log"
          />
        </div>
        <form action="#" method="POST" className="mt-10 flex flex-col gap-3">
          <Input
            input_type="text"
            placeholder="Email / Phone"
            value={email}
            setValue={setEmail}
          />

          <Input
            input_type="password"
            placeholder="Password"
            value={password}
            setValue={setPassword}
          />
          <div>
            <button
              type="button"
              onClick={(e) => handleSubmit(e)}
              className="flex items-center justify-center rounded-md border-[1px] w-full py-2 hover:outline hover:outline-4 mt-5 h-10 border-gray-700 bg-gray-50 font-bold text-gray-700 hover:border-sky-700 hover:bg-sky-50 hover:text-sky-700 hover:outline-sky-100"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default SignInOne;

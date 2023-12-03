import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../Redux/slices/LoadUserSlice";
import SignInOne from "./SignInOne";
import Navbar from "./Home/Navbar";
import Sidebar from "./Home/Sidebar";
import { useHistory, useLocation } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isAuthenticate, loading, loaduser, isLoggedOut } = useSelector(
    (state) => state.loaduser
  );
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

  useEffect(() => {
    console.log("called");
    dispatch(
      loadUser({
        cookie: getCookie(),
      })
    );
  }, []);

  useEffect(() => {
    console.log("useeffec");
    if (loading === false && isAuthenticate === true) {
      if (isLoggedOut === true || loaduser.role === "USER") {
        history.push(`/`);
      }
      if (loaduser.username !== undefined) {
        var currentURL = window.location.href;
        var url = new URL(currentURL);
        var path = url.pathname;
        console.log(path);
        history.push(`${path}`);
      }
    }
  }, [loaduser, isLoggedOut]);

  return (
    <Fragment>
      <Navbar />
      <div className=" flex w-[full] bg-[#edf2f4] opacity-80  ">
        <Sidebar />
        <Route
          {...rest}
          render={(props) => {
            return <Component {...props} />;
          }}
        ></Route>
      </div>
    </Fragment>
  );
};

export default ProtectedRoute;

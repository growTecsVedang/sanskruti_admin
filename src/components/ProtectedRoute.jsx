import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../Redux/slices/LoadUserSlice";
import SignInOne from "./SignInOne";
import Navbar from "./Home/Navbar";
import Sidebar from "./Home/Sidebar";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const dispatch = useDispatch();
  const { isAuthenticate, loading, loaduser } = useSelector(
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
  return (
    <Fragment>
      <Navbar />
      <div className=" flex w-[full] bg-[#edf2f4] opacity-80  ">
        <Sidebar />
        {loading === false && isAuthenticate === true ? (
          <Route
            {...rest}
            render={(props) => {
              if (!isAuthenticate) {
                return <Redirect to="/" />;
              } else if (isAdmin === true && loaduser.role === "USER") {
                return <Redirect to="/" />;
              } else {
                return <Component {...props} />;
              }
            }}
          ></Route>
        ) : (
          <Route exact path="/" component={SignInOne} />
        )}
      </div>
    </Fragment>
  );
};

export default ProtectedRoute;

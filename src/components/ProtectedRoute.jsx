import React, { useEffect } from "react";
import { Redirect, Route } from "react-router-dom";
import { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../Redux/slices/LoadUserSlice";
import SignInOne from "./SignInOne";

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
    dispatch(
      loadUser({
        cookie: getCookie(),
      })
    );
  }, []);
  return (
    <Fragment>
      {loading === false &&
      (isAuthenticate === true || isAuthenticate === undefined) ? (
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
    </Fragment>
  );
};

export default ProtectedRoute;

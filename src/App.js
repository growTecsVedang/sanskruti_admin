import React, { useEffect } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import SignInOne from "./components/SignInOne";
// import SignUpOne from "./components/SignUpOne";
import Home from "./components/Home/Home";
import Products from "./components/Product/Products";
import Categories from "./components/Category/Categories";
import Attributes from "./components/Attributes/Attributes";
import AttributeForm from "./components/Attributes/AttributeForm";
import AddProduct from "./components/Product/AddProduct";
import CategoryForm from "./components/Category/CategoryForm";
import SubCategories from "./components/Subcategory/SubCategories";
import SubCategoryForm from "./components/Subcategory/SubCategoryForm";
import Banner from "./components/Banner/Banner";
import BannerForm from "./components/Banner/BannerForm";
import Orders from "./components/Orders/Orders";
import Permission from "./components/Permissions/Permission";
import EditPermission from "./components/Permissions/EditPermission";
import ViewUser from "./components/User/ViewUser";
import Users from "./components/User/Users";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import EditCategoryForm from "./components/Category/EditCategoryForm";
import EditSubCategoryForm from "./components/Subcategory/EditSubCategoryForm";
import EditAttributeForm from "./components/Attributes/EditAttributeForm";
import EditProduct from "./components/Product/EditProduct";
import MyProfile from "./components/profile/MyProfile";
import { useSelector, useDispatch } from "react-redux";
import { loadUser } from "./Redux/slices/LoadUserSlice";
import getRole from "./helper/getRole";
import ProtectedRoute from "./components/ProtectedRoute";
import EditBannerForm from "./components/Banner/EditBannerForm";
import SubEditBannerForm from "./components/SubBanner/SubEditBannerForm";
import SubBanner from "./components/SubBanner/SubBanner";
import SubBannerForm from "./components/SubBanner/SubBannerForm";
import EditOrders from "./components/Orders/EditOrders";
import Coupons from "./components/Coupons/Coupons";
import ReturnComponent from "./components/Settings/ReturnComponent";
import PolicyComponent from "./components/Settings/PolicyComponent";
import TermsAndCondition from "./components/Settings/TermsAndCondition";
import AnalyticsComponent from "./components/Settings/AnalyticsComponent";
import CouponForm from "./components/Coupons/CouponForm";
import Navbar from "./components/Home/Navbar";
import Sidebar from "./components/Home/Sidebar";
import EditCouponForm from "./components/Coupons/EditCouponForm";
import PaymentMethodsIndex from "./components/PaymentMethods";
import Socials from "./components/config/Socials";
import SocialForm from "./components/config/SocialForm";
import EditSocialForm from "./components/config/EditSocialForm";
import GoogleAnalytics from "./components/config/GoogleAnalytics";
import AuthKeys from "./components/config/AuthKeys";
import WhatsappNumber from "./components/config/WhatsappNumber";
import ReviewsPage from "./components/Reviews/Reviews";
import ContactsPage from "./components/Contacts/contact";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { loaduser, isAuthenticate, loading } = useSelector(
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

  // redirect
  const href = window.location.href;
  useEffect(() => {
    if (window.location.href.includes("sanskrutinx.in")) {
      window.location.href = window.location.href.replace(
        "sanskrutinx.in",
        "sanskrutinx.com"
      );
    }
  }, [href]);

  return (
    <React.Fragment>
      <ToastContainer autoClose={1500} />
      <Switch>
        <Route exact path="/" component={SignInOne} />
        <ProtectedRoute exact path="/home" isAdmin={true} component={Home} />
        <ProtectedRoute exact path="/profile" component={MyProfile} />
        <ProtectedRoute exact path="/products" component={Products} />
        <ProtectedRoute exact path="/editproduct/:id" component={EditProduct} />
        <ProtectedRoute exact path="/categories" component={Categories} />
        <ProtectedRoute exact path="/attributes" component={Attributes} />
        <ProtectedRoute exact path="/attributeform" component={AttributeForm} />
        <ProtectedRoute exact path="/socials" component={Socials} />
        <ProtectedRoute exact path="/socialform" component={SocialForm} />
        <ProtectedRoute
          exact
          path="/editattribute/:id"
          component={EditAttributeForm}
        />
        <ProtectedRoute exact path="/addproduct" component={AddProduct} />
        <ProtectedRoute exact path="/categoryform" component={CategoryForm} />
        <ProtectedRoute
          exact
          path="/editcategory/:id"
          component={EditCategoryForm}
        />
        <ProtectedRoute exact path="/subcategories" component={SubCategories} />
        <ProtectedRoute
          exact
          path="/subcategoryform"
          component={SubCategoryForm}
        />
        <ProtectedRoute
          exact
          path="/editsubcategory/:id"
          component={EditSubCategoryForm}
        />
        <ProtectedRoute
          exact
          path="/editbanner/:id"
          component={EditBannerForm}
        />
        <ProtectedRoute exact path="/banner" component={Banner} />
        <ProtectedRoute exact path="/bannerform" component={BannerForm} />
        <ProtectedRoute
          exact
          path="/subeditbanner/:id"
          component={SubEditBannerForm}
        />
        <ProtectedRoute exact path="/subbanner" component={SubBanner} />
        <ProtectedRoute exact path="/subbannerform" component={SubBannerForm} />
        <ProtectedRoute exact path="/users" component={Users} />
        <ProtectedRoute exact path="/permissions" component={Permission} />
        <ProtectedRoute
          exact
          path="/editpermission/:id"
          component={EditPermission}
        />
        <ProtectedRoute exact path="/viewuser/:id" component={ViewUser} />
        <ProtectedRoute exact path="/orders" component={Orders} />
        <ProtectedRoute exact path="/vieworder/:id" component={EditOrders} />
        <ProtectedRoute exact path="/coupons" component={Coupons} />

        <ProtectedRoute
          exact
          path="/paymentMethods"
          component={PaymentMethodsIndex}
        />
        <ProtectedRoute
          exact
          path="/paymentMethods/payZapp"
          component={PaymentMethodsIndex}
        />
        <ProtectedRoute
          exact
          path="/paymentMethods/cod"
          component={PaymentMethodsIndex}
        />
        {/* setting */}
        <ProtectedRoute exact path="/return" component={ReturnComponent} />
        <ProtectedRoute exact path="/t&c" component={TermsAndCondition} />
        <ProtectedRoute exact path="/policy" component={PolicyComponent} />
        <ProtectedRoute
          exact
          path="/analytics"
          component={AnalyticsComponent}
        />
        <ProtectedRoute exact path="/couponform" component={CouponForm} />
        <ProtectedRoute
          exact
          path="/editcoupon/:id"
          component={EditCouponForm}
        />
        <ProtectedRoute
          exact
          path="/viewsocial/:id"
          component={EditSocialForm}
        />
        <ProtectedRoute
          exact
          path="/googleanalytics"
          component={GoogleAnalytics}
        />
        <ProtectedRoute
          exact
          path="/whatsappNumber"
          component={WhatsappNumber}
        />
        <ProtectedRoute exact path="/productsReviews" component={ReviewsPage} />
        <ProtectedRoute exact path="/authkeys" component={AuthKeys} />
        <ProtectedRoute exact path="/contacts" component={ContactsPage} />
      </Switch>
    </React.Fragment>
  );
}

export default App;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import VerifyOtp from "./Pages/Auth/VerifyOtp";
import EditProfile from "./Pages/User/EditProfile";
import { useEffect } from "react";
import Home from "./Pages/User/Home";
import KitchenMenu from "./Pages/User/KitchenMenu";
import Kitchen from "./Pages/User/Kitchen";
import Cart from "./Pages/User/Cart";
import ConfirmOrder from "./Pages/User/ConfirmOrder";
import Orders from "./Pages/User/Orders";
import Inbox from "./Pages/User/Inbox";
import Faq from "./Pages/User/Faq";
import SavedItems from "./Pages/User/SavedItems";
import TopupWallet from "./Pages/User/TopupWallet";
import VerifyForgotPassword from "./Pages/Auth/VerifyForgotPassword";

const AppRoutes = () => {
  const UserToken = localStorage.getItem("token");
  const currentLocation = window.location.pathname;
  const datee = localStorage.getItem("expiryDate");

  useEffect(() => {
    if (!UserToken && currentLocation !== "/login") {
      window.location.href = "/login";
    } else if (UserToken && currentLocation === "/login") {
      window.location.href = "/";
    } else if (!UserToken && currentLocation === "/") {
      window.location.href = "/login";
    } else if (!UserToken && currentLocation === "/EditProfile") {
      window.location.href = "/EditProfile";
    }
  }, [UserToken, currentLocation]);

  console.log("now date", new Date());
  console.log("expiry date", localStorage.getItem("expiryDate"));
  console.log("expiry date new", new Date(datee));
  console.log(new Date() < new Date(datee));

  const checkTokenExpiry = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const expiryDate = localStorage.getItem("expiryDate");
      if (expiryDate) {
        const now = new Date();
        const expiryDateTime = new Date(expiryDate);
        if (now <= expiryDateTime) {
          // Changed the comparison operator
          localStorage.removeItem("token");
          localStorage.removeItem("expiryDate");
          window.location.href = "/login";
        }
      }
    }
  };

  setInterval(checkTokenExpiry, 60000);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
        <Route
          path="/verifyForgotPassword"
          element={<VerifyForgotPassword />}
        />
        <Route path="/EditProfile" element={<EditProfile />} />
        <Route path="/ChooseKitchen" element={<Kitchen />} />
        <Route path="/KitchenMenu/:id" element={<KitchenMenu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/confirmOrder" element={<ConfirmOrder />} />
        <Route path="/profile/orders" element={<Orders />} />
        <Route path="/profile/inbox" element={<Inbox />} />
        <Route path="/profile/savedItems" element={<SavedItems />} />
        <Route path="/profile/topup" element={<TopupWallet />} />
        <Route path="/faq" element={<Faq />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

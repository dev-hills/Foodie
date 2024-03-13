import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import VerifyOtp from "./Pages/Auth/VerifyOtp";
import EditProfile from "./Pages/User/EditProfile";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
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

const AppRoutes = () => {
  const { token } = useAuth();
  const currentLocation = window.location.pathname;
  useEffect(() => {
    if (token === null && currentLocation !== "/login") {
      window.location.href = "/login";
    } else if (token !== null && currentLocation === "/login") {
      window.location.href = "/";
    } else if (token === null && currentLocation === "/") {
      window.location.href = "/login";
    }
  });
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/verifyotp" element={<VerifyOtp />} />
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

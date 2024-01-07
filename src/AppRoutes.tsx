import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Pages/Auth/Login";
import Register from "./Pages/Auth/Register";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import VerifyOtp from "./Pages/Auth/VerifyOtp";
import EditProfile from "./Pages/User/EditProfile";
import { useEffect } from "react";
import { useAuth } from "./hooks/useAuth";
import Home from "./Pages/User/Home";
import Menu from "./Pages/User/Menu";

const AppRoutes = () => {
  const { token } = useAuth();
  const currentLocation = window.location.pathname;
  useEffect(() => {
    if (token === null && currentLocation !== "/login") {
      window.location.href = "/login";
    } else if (token !== null && currentLocation === "/login") {
      window.location.href = "/ ";
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
        <Route path="/ChooseMenu" element={<Menu />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

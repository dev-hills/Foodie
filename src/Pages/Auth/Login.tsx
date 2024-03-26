/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link, useNavigate } from "react-router-dom";
// import facebook from "/facebook.png";
// import google from "/google.png";
import eye from "/eye.png";
// import check from "/checkBox.png";
import { useState } from "react";
import { typeLogin, typeLoginDetails } from "../../utils/types";
import { useQueryClient } from "@tanstack/react-query";
import { useLogin } from "../../hooks/mutations/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import loader from "/loaderWhite.svg";

const Login = () => {
  // const { setToken, setUserId } = useAuth();
  const { mutate, isPending } = useLogin();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  // const [rememberToggle, setRememberToggle] = useState<boolean>(false);
  const [loginDetails, setLoginDetails] = useState<typeLoginDetails>({
    email: "",
    password: "",
  });

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  // const toggleRemember = () => {
  //   setRememberToggle(!rememberToggle);
  // };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLoginDetails({
      ...loginDetails,
      [e.target.name]: value,
    });
  };

  const isButtonEnabled = () => {
    return loginDetails.email.length > 0 && loginDetails.password.length > 0;
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = loginDetails.email;
    const password = loginDetails.password;

    const cred = window.btoa(`${username}:${password}`);

    // console.log(Credential);

    const dataToSend: typeLogin = {
      credentials: cred,
    };

    mutate(dataToSend, {
      onSuccess: (res) => {
        console.log(res);
        console.log(cred);
        localStorage.setItem("token", res.data?.responseToken?.token?.token);
        localStorage.setItem(
          "expiryDate",
          res.data?.responseToken?.token?.expiresIn
        );

        {
          res.data?.responseToken?.profile
            ? toast.success(`LOGIN SUCCESSFUL :)`, {
                position: toast.POSITION.TOP_LEFT,
              })
            : toast.success(`LOGIN SUCCESSFUL :), COMPLETE PROFILE`, {
                position: toast.POSITION.TOP_LEFT,
              });
        }

        {
          res.data?.responseToken?.profile
            ? navigate("/")
            : navigate("/EditProfile");
        }

        queryClient.invalidateQueries({
          queryKey: [`Login`],
        });
      },

      onError: (err: any) => {
        console.log(err);
        err?.response?.status === 401 &&
          toast.error("Invalid Username or Password", {
            position: toast.POSITION.TOP_LEFT,
          });

        err?.response?.status === 422 &&
          toast.error("Password must not be less than 8 characters ", {
            position: toast.POSITION.TOP_LEFT,
          });

        err?.request?.status === 0 &&
          toast.error("No Internet Connection", {
            position: toast.POSITION.TOP_LEFT,
          });

        err?.request?.status === 429 &&
          toast.error("Try again later", {
            position: toast.POSITION.TOP_LEFT,
          });
      },
    });

    setLoginDetails({
      email: "",
      password: "",
    });
  };

  return (
    <div className="my-[20px] sm:my-[5px] mx-[70px] sm:mx-[4px] sm:w-[100%] flex flex-col items-center gap-[75px]">
      <div className="flex flex-row items-center gap-[18px] sm:gap-[5px] justify-end w-[100%]">
        <p className="font-poppins">Do not have an Account</p>
        <Link
          to="/register"
          className="border-[1px] border-[#008000b3] px-[30px] sm:px-[15px] py-[10px] sm:py-[5px] rounded-[50px] font-inter text-[#808080] text-[20px] sm:text-[15px] font-normal leading-[30px]"
        >
          Sign Up
        </Link>
      </div>

      <div className="w-[600px] sm:w-[100%] flex flex-col items-center justify-center border-[1px] border-[#008000b3] py-[50px] sm:py-[20px] sm:px-[10px] rounded-[20px]">
        {/* LOGIN */}
        <p className="text-[#4E514E] font-poppins text-[25px] sm:text-[20px] font-normal leading-[40px] mb-[20px] sm:mb-[10px]">
          LOGIN
        </p>

        {/* LOGIN FORM */}
        <form action="" className="sm:w-[100%]" onSubmit={submit}>
          {/* Email */}
          <div className="w-[500px] sm:w-[100%] flex flex-col gap-[7px] mb-[15px]">
            <label className="font-poppins text-[#666] text-[16px]">
              Email
            </label>
            <div className="border-[2px] border-[rgba(0, 0, 0, 0.26)] rounded-[12px] px-[10px]">
              <input
                type="email"
                name="email"
                id="email"
                value={loginDetails.email}
                onChange={handleChange}
                className="border-none outline-none bg-transparent px-[10px] h-[50px] w-[480px] sm:w-[100%]"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="w-[500px] sm:w-[100%] flex flex-col gap-[7px]">
            <label className="font-poppins text-[#666] text-[16px]">
              Password
            </label>
            <div className="flex items-center border-[2px] border-[rgba(0, 0, 0, 0.26)] rounded-[12px] px-[10px]">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={loginDetails.password}
                onChange={handleChange}
                className="border-none outline-none bg-transparent px-[10px] h-[50px] w-[480px] sm:w-[100%]"
              />
              <div className="cursor-pointer" onClick={togglePassword}>
                <img src={eye} alt="" />
              </div>
            </div>
          </div>

          {/* FORGOT PASSWORD */}
          <div className="flex flex-row justify-between mt-[10px]">
            <div className="flex flex-row items-center gap-[5px] invisible">
              <p className="font-sansPro text-[15px] font-semibold leading-[15px]">
                Remember me
              </p>
            </div>

            <Link to="/forgotpassword">
              <p className="font-poppins text-[17px] font-normal leading-[25px] underline">
                Forgot Password?
              </p>
            </Link>
          </div>

          {/* REMEMBER ME */}
          {/* <div className="cursor-pointer flex flex-row gap-[8px] sm:gap-[5px] mt-[10px]">
            {rememberToggle ? (
              <div onClick={toggleRemember}>
                <img src={check} alt="" />
              </div>
            ) : (
              <div
                onClick={toggleRemember}
                className="w-[24px] h-[24px] border-[2px] border-gray-950 rounded-md"
              ></div>
            )}
            <p className="text-[#333] font-poppins text-[17px]">Remember me</p>
          </div> */}

          {/* LOGIN BTN */}
          <div className="mt-[15px] flex justify-center">
            <button
              disabled={!isButtonEnabled()}
              type="submit"
              className="bg-[#008000] rounded-[22px] py-[10px] px-[158px] sm:px-[120px] w-[400px] text-white flex items-center justify-center font-poppins font-medium text-[18px] leading-normal"
            >
              {isPending ? (
                <img src={loader} alt="" width={30} className="text-white" />
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>

        {/* OR */}
        {/* <div className="flex flex-row items-center gap-[3px] font-poppins text-[#666] text-[24px] font-black mt-[13px]">
          <div className="h-[2px] w-[220px] sm:w-[150px] bg-[#66666640]"></div>
          OR
          <div className="h-[2px] w-[220px] sm:w-[150px] bg-[#66666640]"></div>
        </div> */}

        {/* FACEBOOK */}
        {/* <Link to="#">
          <div className="flex flex-row items-center justify-center gap-[16px] text-[#333] font-poppins text-[20px] sm:text-[18px] font-medium leading-[25px] border-[1px] border-[#333] rounded-[40px] py-[15px] sm:px-[5px] w-[500px] sm:w-[300px] mt-[15px]">
            <img src={facebook} alt="" />
            Continue with Facebook
          </div>
        </Link> */}

        {/* GOOGLE */}
        {/* <Link to="#">
          <div className="flex flex-row items-center justify-center gap-[16px] text-[#333] font-poppins text-[20px] font-medium leading-[25px] border-[1px] border-[#333] rounded-[40px] py-[15px] sm:px-[5px] w-[500px] sm:w-[300px] mt-[20px]">
            <img src={google} alt="" />
            Continue with Google
          </div>
        </Link> */}
      </div>
    </div>
  );
};

export default Login;

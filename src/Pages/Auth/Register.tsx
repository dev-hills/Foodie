import { Link } from "react-router-dom";
import facebook from "/facebook.png";
import google from "/google.png";
import eye from "/eye.png";
import { useState } from "react";
import { typeLoginDetails, typeRegisterDetails } from "../../utils/types";
import { useRegister } from "../../hooks/mutations/auth";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate, isPending } = useRegister();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  const [registerDetails, setRegisterDetails] = useState<typeLoginDetails>({
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setRegisterDetails({
      ...registerDetails,
      [e.target.name]: value,
    });
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const isButtonEnabled = () => {
    return (
      registerDetails.email.length > 0 &&
      registerDetails.password.length > 0 &&
      confirmPassword.length > 0 &&
      registerDetails.password === confirmPassword
    );
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(registerDetails, confirmPassword);

    const dataToSend: typeRegisterDetails = {
      emailAddress: registerDetails.email,
      password: registerDetails.password,
      type: 1,
      ProfileSourceId: 1,
    };

    mutate(dataToSend, {
      onSuccess: (res) => {
        console.log(res);
        {
          toast.success(`REGISTRATION SUCCESSFUL :), CHECK MAIL FOR OTP`, {
            position: toast.POSITION.TOP_LEFT,
          });

          navigate("/verifyotp", {
            state: { email: registerDetails.email, userId: res.data.id },
          });
        }

        queryClient.invalidateQueries({
          queryKey: [`register`],
        });
      },

      onError: (err) => {
        {
          console.log(err);
          toast.error(`REGISTRATION FAILED :(, TRY AGAIN`, {
            position: toast.POSITION.TOP_LEFT,
          });
        }
      },
    });

    setRegisterDetails({
      email: "",
      password: "",
    });
    setConfirmPassword("");
  };

  return (
    <div className="my-[20px] sm:my-[5px] mx-[70px] sm:mx-[4px] flex flex-col items-center gap-[2px] sm:gap-[10px]">
      <div className="flex flex-row items-center gap-[18px] sm:gap-[5px] justify-end w-[100%]">
        <p className="font-poppins">Already have an Account?</p>
        <Link
          to="/login"
          className="border-[1px] border-[#008000b3] px-[30px] sm:px-[15px] py-[10px] sm:py-[5px] rounded-[50px] font-inter text-[#808080] text-[20px] sm:text-[15px] font-normal leading-[30px]"
        >
          Login
        </Link>
      </div>

      <div className="w-[600px] sm:w-[100%] flex flex-col items-center justify-center border-[1px] border-[#008000b3] py-[30px] sm:py-[20px] sm:px-[10px] rounded-[20px]">
        {/* Sign Up */}
        <p className="text-[#4E514E] font-poppins text-[25px] sm:text-[20px] font-normal leading-[40px] mb-[20px] sm:mb-[10px]">
          SIGN UP
        </p>

        {/* SIGN UP FORM */}
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
                value={registerDetails.email}
                onChange={handleChange}
                className="border-none outline-none bg-transparent px-[10px] h-[50px] w-[480px] sm:w-[100%]"
              />
            </div>
          </div>

          {/* PASSWORD */}
          <div className="w-[500px] sm:w-[100%] flex flex-col gap-[7px] mb-[15px]">
            <label className="font-poppins text-[#666] text-[16px]">
              Password
            </label>
            <div className="flex items-center border-[2px] border-[rgba(0, 0, 0, 0.26)] rounded-[12px] px-[10px]">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={registerDetails.password}
                onChange={handleChange}
                className="border-none outline-none bg-transparent px-[10px] h-[50px] w-[480px] sm:w-[100%]"
              />
              <div className="cursor-pointer" onClick={togglePassword}>
                <img src={eye} alt="" />
              </div>
            </div>
          </div>

          {/*CONFIRM PASSWORD */}
          <div className="w-[500px] sm:w-[100%] flex flex-col gap-[7px]">
            <label className="font-poppins text-[#666] text-[16px]">
              Confirm Password
            </label>
            <div className="flex items-center border-[2px] border-[rgba(0, 0, 0, 0.26)] rounded-[12px] px-[10px]">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="password"
                id="password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                className="border-none outline-none bg-transparent px-[10px] h-[50px] w-[480px] sm:w-[100%]"
              />
              <div className="cursor-pointer" onClick={toggleConfirmPassword}>
                <img src={eye} alt="" />
              </div>
            </div>
          </div>

          {/* SIGN UP BTN */}
          <div className="mt-[15px] flex justify-center">
            <button
              disabled={!isButtonEnabled()}
              type="submit"
              className="bg-[#008000] rounded-[22px] py-[10px] px-[158px] sm:px-[120px] w-[400px] text-white font-poppins font-medium text-[18px] leading-normal"
            >
              {isPending ? "Loading..." : "Sign up"}
            </button>
          </div>
        </form>

        {/* OR */}
        <div className="flex flex-row items-center gap-[3px] font-poppins text-[#666] text-[24px] font-black mt-[13px]">
          <div className="h-[2px] w-[220px] sm:w-[150px] bg-[#66666640]"></div>
          OR
          <div className="h-[2px] w-[220px] sm:w-[150px] bg-[#66666640]"></div>
        </div>

        {/* FACEBOOK */}
        <Link to="#">
          <div className="flex flex-row items-center justify-center gap-[16px] text-[#333] font-poppins text-[20px] sm:text-[18px] font-medium leading-[25px] border-[1px] border-[#333] rounded-[40px] py-[15px] sm:px-[5px] w-[500px] sm:w-[300px] mt-[8px]">
            <img src={facebook} alt="" />
            Continue with Facebook
          </div>
        </Link>

        {/* GOOGLE */}
        <Link to="#">
          <div className="flex flex-row items-center justify-center gap-[16px] text-[#333] font-poppins text-[20px] sm:text-[18px] font-medium leading-[25px] border-[1px] border-[#333] rounded-[40px] py-[15px] sm:px-[5px] w-[500px] sm:w-[300px] mt-[10px]">
            <img src={google} alt="" />
            Continue with Google
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Register;

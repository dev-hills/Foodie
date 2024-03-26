/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForgotPassword } from "../../hooks/mutations/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const { mutate } = useForgotPassword();

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const dataToSend: any = {
      email: email,
    };
    console.log(email);

    mutate(dataToSend, {
      onSuccess: (data) => {
        console.log(data);
        {
          toast.success(`CHECK MAIL FOR OTP`, {
            position: toast.POSITION.TOP_LEFT,
          });

          navigate("/verifyForgotPassword", {
            state: { email: email },
          });
        }
      },

      onError: (error) => {
        console.log(error);
      },
    });
  };
  return (
    <div>
      <div className="center sm:my-[5px] sm:mx-[4px] sm:w-[100%] flex flex-row items-center justify-center">
        <div className="w-[600px] sm:w-[100%] flex flex-col items-center justify-center border-[1px] border-[#008000b3] py-[50px] sm:py-[20px] sm:px-[10px] rounded-[20px]">
          <p className="text-[#4E514E] font-poppins text-[25px] sm:text-[20px] font-normal leading-[40px] mb-[20px] sm:mb-[10px]">
            FORGOT PASSWORD
          </p>

          {/* FORM */}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="border-none outline-none bg-transparent px-[10px] h-[50px] w-[480px] sm:w-[100%]"
                />
              </div>
            </div>

            {/* SUBMIT BTN */}
            <div className="mt-[15px] flex justify-center">
              <button
                type="submit"
                className="bg-[#008000] rounded-[22px] py-[10px] px-[158px] sm:px-[120px] w-[400px] text-white flex items-center justify-center font-poppins font-medium text-[18px] leading-normal"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

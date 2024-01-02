import React, { useState, createRef } from "react";
import { typeOtp } from "../utils/types";

const Otp = ({ email, onVerify, onResend, verifyLoading }: typeOtp) => {
  const [otp, setOtp] = useState(Array(5).fill(""));

  //creates an array of references to the input elements
  const inputsRef = Array(5)
    .fill(0)
    .map(() => createRef<HTMLInputElement>());

  // FUNCTION FOR INPUT BOXES
  const handleChange = (
    elementIndex: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value) {
      setOtp([
        ...otp.map((digit, index) =>
          index === elementIndex ? event.target.value : digit
        ),
      ]);
      if (elementIndex < 5) {
        inputsRef[elementIndex + 1].current?.focus();
      }
    } else {
      setOtp([
        ...otp.map((digit, index) => (index === elementIndex ? "" : digit)),
      ]);
      if (elementIndex > 0) {
        inputsRef[elementIndex - 1].current?.focus();
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center p-8 bg-white rounded-[22px] shadow-2xl px-[80px] pb-[86px] pt-[20px] sm:w-[100%]">
        <h2 className="text-[25px] font-normal text-center tracking-[7px] text-[#000]">
          OTP
        </h2>

        <div className="text-[#000] font-normal text-[28px] sm:text-[23px] text-center mt-[60px] mb-[30px]">
          Enter the OTP sent to <strong className="">{email}</strong>
        </div>

        <div className="flex justify-between gap-[20px] sm:gap-[10px]">
          {otp.map((digit, index) => (
            <input
              key={index}
              className="w-[80px] sm:w-[50px] h-[80px] sm:h-[50px] border rounded-[10px] text-center text-[20px] font-semibold bg-[#eee]"
              maxLength={1}
              value={digit}
              type="number"
              onChange={(e) => handleChange(index, e)}
              ref={inputsRef[index]}
            />
          ))}
        </div>

        <button
          disabled={otp.join("").length !== 5}
          onClick={() => onVerify(otp.join(""))}
          className="mt-[42px] py-[12px] px-[130px] rounded-[22px] bg-[#008000b3] text-white"
        >
          {verifyLoading ? "Loading..." : "Verify"}
        </button>

        <a
          onClick={onResend}
          className="block text-center mt-[15px] text-[15px] text-[#000] cursor-pointer"
        >
          Didn't get an OTP? <span className="text-[#008000]">Resend OTP</span>
        </a>
      </div>
    </div>
  );
};

export default Otp;

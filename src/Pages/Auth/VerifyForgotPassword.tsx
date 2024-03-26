import { useLocation, useNavigate } from "react-router-dom";
import Otp from "../../Components/Otp";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useResendOtp } from "../../hooks/mutations/auth";
import { useState } from "react";

const VerifyForgotPassword = () => {
  const [otp, setOtp] = useState<string>("");
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state;

  const { mutate: resendOtp } = useResendOtp();

  const handleVerify = (otpValue: string) => {
    setOtp(otpValue);

    navigate("/verifyForgotPassword", {
      state: { email: email, otp: otp },
    });
  };

  const handleResend = () => {
    resendOtp(
      { emailAddress: email },
      {
        onSuccess: () => {
          toast.success("OTP RESENT SUCCESSFULLY :), CHECK MAIL", {
            position: toast.POSITION.TOP_LEFT,
          });
        },
        onError: (err) => {
          console.log(err);

          toast.error("ERROR TI WA :(", {
            position: toast.POSITION.TOP_LEFT,
          });
        },
      }
    );
  };

  return (
    <div>
      <Otp
        email={email}
        onVerify={handleVerify}
        onResend={handleResend}
        // verifyLoading={isVerifyPending}
      />
    </div>
  );
};

export default VerifyForgotPassword;

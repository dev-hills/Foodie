import { useLocation, useNavigate } from "react-router-dom";
import Otp from "../../Components/Otp";
import { useResendOtp, useVerifyAccount } from "../../hooks/mutations/auth";
import { toast } from "react-toastify";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { email, userId } = location.state;

  const { mutate: verifyAccount, isPending: isVerifyPending } =
    useVerifyAccount();
  const { mutate: resendOtp } = useResendOtp();

  const handleVerify = (otpValue: string) => {
    const dataToSend = { otp: Number(otpValue), userId };
    verifyAccount(dataToSend, {
      onSuccess: (res) => {
        if (res.status === 200) {
          toast.success("ACCOUNT ACTIVATED SUCCESSFULLY :)", {
            position: toast.POSITION.TOP_LEFT,
          });
          navigate("/login");
        }
      },
      onError: (err) => {
        console.log(err);
        toast.error("ERROR TI WA :(", { position: toast.POSITION.TOP_LEFT });
      },
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
        verifyLoading={isVerifyPending}
      />
    </div>
  );
};

export default VerifyOtp;

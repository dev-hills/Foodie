/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Modal from "react-modal";
import { useCompleteWalletTransaction } from "../hooks/mutations/wallet";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

// import { useState } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    paddingLeft: "200px",
    paddingRight: "200px",
    filter: "drop-shadow(6px 4px 25px #000000)",
  },
};

const WalletOtpModal = ({
  modalIsOpen,
  setIsOpen,
  transactionId,
  amount,
  destinationId,
}: any) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { mutate } = useCompleteWalletTransaction(token);
  const [otp, setOtp] = useState<string>("");
  function closeModal() {
    setIsOpen(false);
  }

  const isButtonEnabled = () => {
    return otp.length === 5;
  };

  const submit = (e) => {
    e.preventDefault();
    const dataToSend: any = {
      transactionId: transactionId,
      otp: Number(otp),
      amount: Number(amount),
      destinationId: destinationId,
    };

    mutate(dataToSend, {
      onSuccess: (res) => {
        console.log(res);
        setIsOpen(false);

        {
          toast.success(`Transaction Completed, Order Processing`, {
            position: toast.POSITION.TOP_RIGHT,
          });
          navigate("/profile/orders");
        }
      },
      onError: (err: any) => {
        console.log(err);
        if (err?.response?.status === 401) {
          toast.error(`Expired/Invalid Credentials`, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      },
    });
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex flex-col items-center gap-[10px]">
          <h1 className="font-sansPro text-center text-[23px] mb-[30px] font-semibold">
            CHECK MAIL FOR OTP
          </h1>
          <div className="border-[2px] border-[rgba(0, 0, 0, 0.26)] rounded-[12px] px-[10px]">
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="text-center text-[20px] tracking-widest border-none outline-none bg-transparent px-[10px] h-[50px] w-[480px] sm:w-[100%]"
            />
          </div>
          <button
            disabled={!isButtonEnabled()}
            onClick={submit}
            className="bg-[#008000] rounded-[22px] py-[10px] px-[158px] sm:px-[120px] mt-[20px] w-[400px] text-white flex items-center justify-center font-poppins font-medium text-[18px] leading-normal"
          >
            Verify
          </button>

          <p>Resend OTP</p>
        </div>
      </Modal>
    </div>
  );
};

export default WalletOtpModal;

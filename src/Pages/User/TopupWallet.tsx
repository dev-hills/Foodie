/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import Navbar from "../../Components/Navbar";
import ProfileCard from "../../Components/ProfileCard";
import { useInitiateWalletTopup } from "../../hooks/mutations/wallet";
import { useGetOrders } from "../../hooks/queries/cart";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
// import loader from "/loader.svg";

const TopupWallet = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(null);
  const { token } = useAuth();
  const { data } = useGetOrders(token);
  console.log(data);

  const { mutate: walletTopup } = useInitiateWalletTopup(token);

  const handleOpenPopup = (url) => {
    const width = 500;
    const height = 600;
    const left = (window.innerWidth - width) / 2;
    const top = (window.innerHeight - height) / 2;
    const popupWindow = window.open(
      url,
      "_blank",
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
    );
    if (popupWindow) {
      popupWindow.focus();
    }
  };

  const handleWalletTopup = () => {
    const dataToSend: any = {
      amount: Number(amount),
    };

    walletTopup(dataToSend, {
      onSuccess: (res) => {
        res.status === 200 ? handleOpenPopup(res?.data?.paymentUrl) : null;
        navigate("/profile/orders");
        console.log(res);
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };

  return (
    <div>
      <Navbar />

      <div className="pt-[130px] px-[85px] sm:px-[5px] lg:px-[30px] flex flex-row sm:flex-col items-start gap-[24px] sm:gap-[5px] w-[100%]">
        <ProfileCard />

        <div className="w-[80%] sm:w-[100%] bg-white rounded-[10px]">
          <div className="px-[30px] sm:px-[10px] py-[7px] flex flex-row items-center gap-[15px] font-poppins font-medium text-[20px] border-[1px] border-[#AAAAAA] border-x-0 border-t-0">
            Top up Wallet
          </div>

          <div className="px-[30px] sm:px-[10px] mt-[15px] pb-[25px] flex flex-col gap-[20px]">
            <p>Enter Amount you wish to top up</p>

            <input
              type="text"
              name=""
              id=""
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border-[1px] border-[#AAAAAA] sm:w-[100%] w-[40%] outline-none py-[10px] px-[10px]"
            />

            <div
              onClick={handleWalletTopup}
              className="font-poppins text-[16px] sm:w-[100%] sm:text-center font-bold px-[20px] py-[10px] bg-[#008000] text-white rounded-md w-[20%]"
            >
              Top up
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopupWallet;

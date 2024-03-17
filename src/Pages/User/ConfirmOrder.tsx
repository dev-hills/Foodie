/* eslint-disable @typescript-eslint/no-explicit-any */
import Navbar from "../../Components/Navbar";
import tickInactive from "/tickInactive.png";
import edit from "/edit.png";
import plus from "/plusGreen.png";
import eye from "/eye.png";
import { useGetUser, useGetUserAddresses } from "../../hooks/queries/user";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useSetAddressDefault } from "../../hooks/mutations/user";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  useInitiateCardTransaction,
  useInitiateWalletTransaction,
} from "../../hooks/mutations/wallet";
import { useGetUserCart } from "../../hooks/queries/cart";
import WalletOtpModal from "../../Components/WalletOtpModal";
import AddAddressModal from "../../Components/AddAddressModal";
import loader from "/loader.svg";

const ConfirmOrder = () => {
  const { token } = useAuth();
  const { data } = useGetUserAddresses(token);
  const { data: userData } = useGetUser(token);
  const { mutate } = useSetAddressDefault(token);
  const { mutate: cardMutate } = useInitiateCardTransaction(token);
  const { mutate: walletMutate } = useInitiateWalletTransaction(token);
  const { data: userCart } = useGetUserCart(token);
  const [selectedOption, setSelectedOption] = useState<number>(null);
  const [selectedMethod, setSelectedMethod] = useState<string>(null);
  const [displayPaymentMethod, setDisplayPaymentMethod] =
    useState<boolean>(false);

  console.log(userCart);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [openAddressModal, setOpenAddressModal] = useState(false);
  const [amount, setAmount] = useState<string>("");
  const [transactionId, setTransactionId] = useState<number>(null);
  const [destinationId, setDestinationId] = useState<number>(null);

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
  };

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

  console.log(data);

  const handleConfirmPayment = () => {
    if (selectedMethod) {
      if (selectedMethod === "card") {
        const dataToSend: any = {
          amount: userCart?.data?.products?.totalAmount,
          orderId: userCart?.data?.products?.order?.id,
        };

        cardMutate(dataToSend, {
          onSuccess: (res) => {
            res.status === 200 ? handleOpenPopup(res?.data?.paymentUrl) : null;
            console.log(res);
          },
          onError: (err) => {
            console.log(err);
          },
        });
      } else if (selectedMethod === "wallet") {
        const dataToSend: any = {
          destinationId: 1,
          amount: userCart?.data?.products?.totalAmount,
          orderId: userCart?.data?.products?.order?.id,
        };

        console.log(dataToSend);

        walletMutate(dataToSend, {
          onSuccess: (res) => {
            res.status === 200 ? setIsOpen(true) : null;
            console.log(res);
            setAmount(res?.data?.amount);
            setTransactionId(res?.data?.transactionId);
            setDestinationId(res?.data?.destinationId);
          },
          onError: (err: any) => {
            err?.response?.status === 400 &&
              toast.error("Insufficient funds", {
                position: toast.POSITION.TOP_LEFT,
              });
            console.log(err);
          },
        });
      }
    } else {
      console.log("Please select a payment method");
    }
  };

  useEffect(() => {
    if (data?.data?.addresses?.rows.length > 0) {
      const defaultAddress = data.data.addresses.rows.find(
        (address) => address.is_default
      );
      if (defaultAddress) {
        setSelectedOption(defaultAddress.id);
      }
    }
  }, [data]);

  const handleRadioClick = (id: number) => {
    setSelectedOption(id);
  };

  const handleSelectAddress = async () => {
    const dataToSend: any = {
      addressId: selectedOption,
    };

    mutate(dataToSend, {
      onSuccess: (res) => {
        console.log(res);
        toast.success(`Address Selected :)`, {
          position: toast.POSITION.TOP_LEFT,
        });

        res?.status === 200
          ? setDisplayPaymentMethod(true)
          : setDisplayPaymentMethod(false);
      },

      onError: (err) => {
        console.log(err);
      },
    });
  };

  const cartAmount = (price, quantity) => {
    return price * quantity;
  };

  return (
    <div>
      <Navbar />

      <div className="pt-[120px] pb-[100px]">
        <div className="px-[85px] py-[10px] sm:px-[10px]">
          <div className="flex flex-row sm:flex-col items-start justify-between gap-[155px] w-[100%] mt-[26px]">
            <div className="w-[65%] sm:w-[100%] flex flex-col gap-[20px]">
              <div className="pt-[6px] bg-white rounded-[10px]">
                <div className="px-[13px] border-[1px] border-[#AAAAAA] border-x-0 border-t-0 pb-[5px] flex flex-row items-center gap-[10px]">
                  <img src={tickInactive} alt="" />
                  <p className="font-poppins font-semibold">1. ADDRESS</p>
                </div>

                {data?.status === 200 ? (
                  <>
                    <p className="px-[13px] pt-[14px] font-poppins font-semibold text-[16px]">
                      {`ADDRESS BOOK (${data?.data?.addresses?.rows.length})`}
                      {/* ADDRESS BOOK (3) */}
                    </p>

                    <div>
                      {data?.data?.addresses?.rows.length === 0 ? (
                        <div>
                          You have no address <br /> Add address
                        </div>
                      ) : (
                        data?.data?.addresses?.rows.map((address, idx) => (
                          <div
                            key={idx}
                            className="flex flex-row items-center justify-between mx-[13px] mt-[14px] border-[2px] border-[#AAAAAA] py-[24px] px-[15px] w-[auto] rounded-[5px]"
                          >
                            <div className="flex flex-row items-center gap-[15px]">
                              <div
                                onClick={() => {
                                  handleRadioClick(address?.id);
                                }}
                                className="flex flex-row items-center gap-[15px]"
                              >
                                <div
                                  className={
                                    selectedOption === address?.id
                                      ? "w-[22px] h-[22px] border-[3px] border-[#AAAAAA] bg-[#008000] rounded-full"
                                      : "w-[22px] h-[22px] border-[3px] border-[#AAAAAA] rounded-full"
                                  }
                                ></div>

                                <div>
                                  <h1 className="font-poppins font-semibold text-[15px]">
                                    {userData?.data?.firstName.concat(
                                      " ",
                                      userData?.data?.lastName
                                    )}
                                  </h1>
                                  <h1 className="font-poppins font-medium text-[13px]">
                                    {address?.description}
                                  </h1>
                                  <h1 className="font-poppins font-medium text-[13px]">
                                    {userData?.data?.User?.emailAddress}
                                  </h1>
                                </div>
                              </div>
                            </div>

                            <div className="flex flex-row items-center gap-[10px]">
                              <p className="font-poppins font-medium text-[13px] text-[#008000]">
                                Edit
                              </p>
                              <img src={edit} alt="" />
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </>
                ) : (
                  <div className="flex flex-row items-center justify-center py-[200px]">
                    <img src={loader} alt="" width={50} height={200} />
                  </div>
                )}

                <div className="border-[1px] border-[#AAAAAA] border-x-0 border-t-0 px-[13px] pt-[20px] pb-[15px] flex flex-row items-center gap-[13px]">
                  <img src={plus} alt="" />
                  <p
                    onClick={() => setOpenAddressModal(true)}
                    className="cursor-pointer font-poppins font-medium text-[15px] text-[#008000]"
                  >
                    ADD ADDRESS
                  </p>
                </div>

                <div
                  onClick={handleSelectAddress}
                  className="bg-[#008000] py-[17px] cursor-pointer px-[10px] text-white font-poppins font-semibold float-right mx-[13px] my-[15px]"
                >
                  SELECT ADDRESS
                </div>
              </div>

              <div className="pt-[6px] mt-[20px] bg-white rounded-[10px]">
                <div
                  className={
                    displayPaymentMethod
                      ? "px-[13px] border-[1px] border-[#AAAAAA] border-x-0 border-t-0 pb-[5px] flex flex-row items-center gap-[10px]"
                      : "px-[13px] pb-[5px] flex flex-row items-center gap-[10px]"
                  }
                >
                  <img src={tickInactive} alt="" />
                  <p
                    className={
                      displayPaymentMethod
                        ? "font-poppins font-semibold"
                        : "font-poppins font-semibold text-[#AAAAAA]"
                    }
                  >
                    2. PAYMENT METHOD
                  </p>
                </div>

                {displayPaymentMethod ? (
                  <div className="border-[1px] border-[#AAAAAA] border-x-0 border-t-0 pb-[40px]">
                    <div
                      onClick={() => handleSelectMethod("card")}
                      className="cursor flex flex-row items-center justify-between mx-[13px] mt-[14px] border-[2px] border-[#AAAAAA] py-[24px] px-[15px] w-[auto] rounded-[5px]"
                    >
                      <div className="flex flex-row items-center gap-[15px]">
                        <div
                          className={
                            selectedMethod === "card"
                              ? "w-[22px] h-[22px] border-[3px] border-[#AAAAAA] bg-[#008000] rounded-full"
                              : "w-[22px] h-[22px] border-[3px] border-[#AAAAAA] rounded-full"
                          }
                        ></div>

                        <div>
                          <h1 className="font-poppins font-semibold text-[15px]">
                            Pay with Card
                          </h1>
                          <h1 className="font-poppins font-medium text-[13px]">
                            Powered by ....
                          </h1>
                        </div>
                      </div>
                    </div>

                    <div
                      onClick={() => handleSelectMethod("wallet")}
                      className="cursor flex flex-row items-center justify-between mx-[13px] mt-[14px] border-[2px] border-[#AAAAAA] py-[24px] px-[15px] w-[auto] rounded-[5px]"
                    >
                      <div className="flex flex-row items-center gap-[15px]">
                        <div
                          className={
                            selectedMethod === "wallet"
                              ? "w-[22px] h-[22px] border-[3px] border-[#AAAAAA] bg-[#008000] rounded-full"
                              : "w-[22px] h-[22px] border-[3px] border-[#AAAAAA] rounded-full"
                          }
                        ></div>

                        <div>
                          <h1 className="font-poppins font-semibold text-[15px]">
                            Wallet
                          </h1>
                        </div>
                      </div>

                      <div className="font-poppins text-[15px] text-black flex flex-row items-center gap-[8px]">
                        <img src={eye} alt="" width={20} />

                        {`\u20A6 ${"50000".toLocaleString()}`}
                      </div>
                    </div>
                  </div>
                ) : null}

                {displayPaymentMethod ? (
                  <button
                    onClick={handleConfirmPayment}
                    className="bg-[#008000] py-[17px] px-[10px] rounded-[5px] text-white font-poppins font-semibold float-right mx-[13px] my-[15px]"
                  >
                    CONFIRM PAYMENT METHOD
                  </button>
                ) : null}
              </div>
            </div>

            <div className="w-[35%] sm:w-[100%]">
              <div className="bg-white py-[13px] px-[30px] rounded-[10px]">
                <p className="font-poppins font-bold text-[20px]">Checkout</p>

                <div className="flex flex-row items-center justify-between border-[1px] border-black pb-[5px] border-x-0 border-t-0 mt-[10px]">
                  <p className="font-poppins font-bold text-[18px]">Products</p>
                  <p className="font-poppins font-bold text-[18px]">Total</p>
                </div>

                <div className="flex flex-col gap-[20px] mt-[20px]">
                  {userCart?.data?.products?.rows.map((data, idx) => (
                    <div
                      key={idx}
                      className="flex flex-row items-center justify-between"
                    >
                      <p className="font-poppins font-bold text-[17px]">
                        {data?.Product?.name}
                      </p>

                      <p className="font-poppins font-bold text-[17px]">{`\u20A6 ${cartAmount(
                        parseFloat(data?.Product?.amount),
                        data?.quantity
                      )}`}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-row items-center justify-between border-[1px] border-black pt-[5px] border-x-0 border-b-0 mt-[70px]">
                  <p className="font-poppins font-bold text-[18px]">Total</p>
                  <p className="font-poppins font-bold text-[18px]">{`\u20A6 ${userCart?.data?.products?.totalAmount}`}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WalletOtpModal
        modalIsOpen={modalIsOpen}
        setIsOpen={setIsOpen}
        amount={amount}
        transactionId={transactionId}
        destinationId={destinationId}
      />

      <AddAddressModal
        openAddressModal={openAddressModal}
        setOpenAddressModal={setOpenAddressModal}
      />
    </div>
  );
};

export default ConfirmOrder;

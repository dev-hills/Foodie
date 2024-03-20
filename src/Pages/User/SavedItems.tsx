/* eslint-disable @typescript-eslint/no-explicit-any */

import Navbar from "../../Components/Navbar";
import ProfileCard from "../../Components/ProfileCard";
import { useGetSavedItem } from "../../hooks/queries/cart";
import "react-toastify/dist/ReactToastify.css";
import loader from "/loader.svg";

import { useAddToCart } from "../../hooks/mutations/cart";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const SavedItems = () => {
  const token = localStorage.getItem("token");
  const { data } = useGetSavedItem(token);
  const { mutate } = useAddToCart(token);

  console.log(data);

  const formatDate = (date) => {
    const newDate = new Date(date);

    return newDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const addItemToCart = (id) => {
    const dataToSend: any = {
      productId: id,
    };

    mutate(dataToSend, {
      onSuccess: (res) => {
        console.log(res);
        toast.success(`LOGIN SUCCESSFUL :)`, {
          position: toast.POSITION.TOP_LEFT,
        });
      },
      onError: (err) => {
        console.log(err);
      },
    });
  };
  return (
    <div>
      <Navbar />

      <div className="pt-[130px] px-[85px] sm:px-[5px] lg:px-[30px] flex flex-row items-start gap-[24px] w-[100%] sm:flex-col sm:gap-[5px]">
        <ProfileCard />

        {data?.status === 200 ? (
          data?.data?.savedItems?.rows.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-[20px] mt-[100px]">
              <p className="font-poppins text-[22px] font-bold">
                Your have no saved items
              </p>
              <button className="font-poppins text-[16px] font-bold px-[20px] py-[10px] bg-[#008000] text-white rounded-md">
                <Link to="/chooseKitchen">Shop Now</Link>
              </button>
            </div>
          ) : (
            <div className="w-[80%] sm:w-[100%] bg-white rounded-[10px]">
              <div className="px-[30px] sm:px-[10px] py-[7px] flex flex-row items-center gap-[15px] font-poppins font-medium text-[20px] border-[1px] border-[#AAAAAA] border-x-0 border-t-0">
                Saved Items
              </div>

              <div className="px-[30px] sm:px-[10px] mt-[15px] pb-[25px] flex flex-col gap-[40px]">
                {data?.data?.savedItems?.rows.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-row items-center justify-between sm:border-[1px] sm:border-[#AAAAAA] sm:border-x-0 sm:border-t-0"
                  >
                    <div className="flex flex-row sm:flex-col sm:items-start items-center gap-[20px]">
                      <img
                        src={item?.Product?.Pictures[0]?.url}
                        alt=""
                        width={100}
                      />

                      <div className="flex flex-col gap-[3px]">
                        <h1 className="font-poppins font-semibold text-[20px]">
                          {item?.Product?.name}
                        </h1>

                        <p className="font-poppins font-medium text-[15px]">
                          {formatDate(item?.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div
                      onClick={() => addItemToCart(item?.Product?.id)}
                      className="font-poppins cursor-pointer text-[16px] sm:text-center font-bold px-[20px] py-[10px] bg-[#008000] text-white rounded-md"
                    >
                      Add to cart
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ) : (
          <div className="flex flex-row w-[100%] items-center justify-center">
            <img src={loader} alt="" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedItems;

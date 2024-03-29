/* eslint-disable @typescript-eslint/no-explicit-any */
import location from "/location.png";
import saveIcon from "/save.png";
import { typeFoodCard } from "../utils/types";
import { useAddToCart, useSaveItem } from "../hooks/mutations/cart";

import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useQueryClient } from "@tanstack/react-query";
const FoodCard = ({
  imageUrl,
  foodName,
  cafLocation,
  category,
  price,
  productId,
}: typeFoodCard) => {
  const token = localStorage.getItem("token");
  const { mutate, isPending } = useAddToCart(token);
  const { mutate: save } = useSaveItem(token);
  const [addToCartSuccess, setAddToCartSuccess] = useState<number>(null);
  const queryClient = useQueryClient();

  const addToCart = () => {
    const dataToSend: any = {
      productId: productId,
    };

    mutate(dataToSend, {
      onSuccess: (res) => {
        console.log(res);
        setAddToCartSuccess(res?.status);
        queryClient.invalidateQueries({
          queryKey: [`getUserCart`],
        });
      },

      onError: (err) => {
        console.log(err);
      },
    });
  };

  const handleSaveItem = (id) => {
    const dataToSend: any = {
      productId: id,
    };

    save(dataToSend, {
      onSuccess: (res) => {
        console.log(res);
        toast.success(`Item has been saved :)`, {
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
      <div className="w-[370px] h-[430px] mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5">
        <div>
          {/* <div className="absolute py-[8px] px-[20px] rounded-[8px] mt-[12px] ml-[250px] flex flex-row items-center gap-[15px] bg-[#aaaaaa33] backdrop-blur-[10px] text-white">
            <div className="w-[11px] h-[11px] bg-[#94C763] rounded-full"></div>
            Available
          </div> */}

          <img className="w-[400px] h-[200px] object-cover" src={imageUrl} />
        </div>

        <div className="px-[12px] py-[15px]">
          <div className="flex flex-row items-center gap-[8px]">
            <h1 className="text-[#424242] font-poppins text-[17px]">
              {category}
            </h1>
          </div>

          <div>
            <h1 className="text-[#212121] font-poppins text-[20px] font-bold mt-[13px]">
              {foodName}
            </h1>

            <div className="flex flex-row items-center gap-[3px] font-poppins text-[17px] text-[#34BC5B]">
              <img src={location} alt="" /> {cafLocation}
            </div>

            <h1 className="text-[#212121] font-poppins text-[21px] font-bold mt-[10px]">
              {price}
            </h1>
          </div>

          <div className="flex flex-row items-center w-[100%] gap-[10px] mt-[15px]">
            <div
              onClick={() => handleSaveItem(productId)}
              className="w-[50%] cursor-pointer flex flex-row items-center justify-center gap-[5px] h-[35px] rounded-[12px] py-[22px] px-[10px] bg-[#FFF2E8] text-[#34BC5B] text-center font-poppins text-[18px] font-bold"
            >
              <img src={saveIcon} alt="" /> Save for later
            </div>

            <button
              onClick={() => addToCart()}
              className="w-[50%] flex flex-row items-center justify-center gap-[5px] h-[35px] rounded-[12px] py-[22px] px-[10px] bg-[#34BC5B] leading-4 text-white text-center font-poppins text-[18px] font-bold"
            >
              {addToCartSuccess === 200
                ? "Added"
                : isPending
                ? "Adding..."
                : "Add To cart"}
              {/* <img src={cart} alt="" /> Add to cart */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;

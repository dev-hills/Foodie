/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import trash from "/trashRed.png";
import minus from "/minus.png";
import plus from "/plus.png";
import { useAuth } from "../hooks/useAuth";
import { useGetUserCart } from "../hooks/queries/cart";
import { useEffect } from "react";
import {
  useDecreaseItemInCart,
  useIncreaseItemInCart,
  useRemoveItemFromCart,
} from "../hooks/mutations/cart";
import { useQueryClient } from "@tanstack/react-query";
const CartCard = () => {
  const { token } = useAuth();
  const { data } = useGetUserCart(token);
  const queryClient = useQueryClient();

  const { mutate } = useRemoveItemFromCart(token);
  const { mutate: increase } = useIncreaseItemInCart(token);
  const { mutate: decrease } = useDecreaseItemInCart(token);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const removeItem = (id) => {
    mutate(id, {
      onSuccess: (res) => {
        console.log(res);

        queryClient.invalidateQueries({
          queryKey: [`RemoveItemFromCart`],
        });
      },

      onError: (e) => {
        console.log(e);
      },
    });
  };

  const increaseItem = (id) => {
    increase(id, {
      onSuccess: (res) => {
        console.log(res);

        queryClient.invalidateQueries({
          queryKey: [`increaseItemInCart`],
        });
      },

      onError: (e) => {
        console.log(e);
      },
    });
  };

  const decreaseItem = (id) => {
    decrease(id, {
      onSuccess: (res) => {
        console.log(res);

        queryClient.invalidateQueries({
          queryKey: [`decreaseItemInCart`],
        });
      },

      onError: (e) => {
        console.log(e);
      },
    });
  };

  return (
    <div className="flex flex-col gap-[20px]">
      {data?.data?.products?.rows.map((data, idx) => (
        <div key={idx} className="p-[20px] w-[100%] bg-white rounded-[10px]">
          <div className="flex flex-row items-center gap-[12px]">
            <img
              src={data?.Product?.Pictures[0]?.url}
              alt=""
              className="rounded-full object-cover w-[100px] h-[100px]"
            />

            <div>
              <h3 className="font-poppins font-semibold text-[20px]">
                {data?.Product?.name}
              </h3>
              <h3 className="font-poppins font-semibold text-[20px]">
                {`Cafetaria: ${data?.Product?.Business?.businessName}`}
              </h3>
            </div>
          </div>

          <div className="flex flex-row items-end justify-between">
            <div
              onClick={() => removeItem(data?.Product?.id)}
              className="flex flex-row items-center gap-[5px]"
            >
              <img src={trash} alt="" width={20} />

              <div className="font-poppins font-semibold text-[17px] text-[#FF0000]">
                Remove
              </div>
            </div>

            <div className="flex flex-row items-end gap-[10px]">
              <button onClick={() => decreaseItem(data?.Product?.id)}>
                <img src={minus} alt="" width={27} />
              </button>

              <div className="flex flex-col items-center gap-[5px]">
                <p className="text-[16px] font-medium">QTY</p>

                <div className="bg-[#D9D9D9] w-[100px] rounded-[30px] h-[30px] flex items-center justify-center font-poppins font-medium text-[16px]">
                  {data?.quantity}
                </div>
              </div>

              <button onClick={() => increaseItem(data?.Product?.id)}>
                <img src={plus} alt="" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CartCard;

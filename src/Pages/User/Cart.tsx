import CartCard from "../../Components/CartCard";
import CheckoutCard from "../../Components/CheckoutCard";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import { useGetUserCart } from "../../hooks/queries/cart";

import { useQueryClient } from "@tanstack/react-query";
import {
  useDecreaseItemInCart,
  useIncreaseItemInCart,
  useRemoveItemFromCart,
} from "../../hooks/mutations/cart";
import loader from "/loader.svg";
import { Link } from "react-router-dom";

const Cart = () => {
  const token = localStorage.getItem("token");
  const { data } = useGetUserCart(token);
  // console.log(data);

  const queryClient = useQueryClient();

  const { mutate } = useRemoveItemFromCart(token);
  const { mutate: increase } = useIncreaseItemInCart(token);
  const { mutate: decrease } = useDecreaseItemInCart(token);

  // console.log(data);

  const removeItem = (id) => {
    mutate(id, {
      onSuccess: (res) => {
        console.log(res);

        queryClient.invalidateQueries({
          queryKey: [`getUserCart`],
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
          queryKey: [`getUserCart`],
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
          queryKey: [`getUserCart`],
        });
      },

      onError: (e) => {
        console.log(e);
      },
    });
  };

  return (
    <div>
      <Navbar />
      {data?.status !== 200 ? (
        <div className="flex flex-row items-center justify-center py-[200px]">
          <img src={loader} alt="" width={200} height={200} />
        </div>
      ) : (
        <div className="pt-[120px] pb-[246px]">
          <div className="px-[85px] sm:px-[10px] lg:px-[10px] py-[10px]">
            {data?.error === "Empty Cart" ||
            data?.data?.products?.rows.length === 0 ? null : (
              <>
                <p className="font-poppins text-[22px] font-bold">{`Cart (${data?.data?.products?.rows.length})`}</p>
              </>
            )}

            {data?.error === "Empty Cart" ||
            data?.data?.products?.rows.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-[20px] mt-[100px]">
                <p className="font-poppins text-[22px] font-bold">
                  Your cart is empty
                </p>
                <button className="font-poppins text-[16px] font-bold px-[20px] py-[10px] bg-[#008000] text-white rounded-md">
                  <Link to="/chooseKitchen">Shop Now</Link>
                </button>
              </div>
            ) : (
              <div className="flex flex-row sm:flex-col items-start justify-between gap-[140px] sm:gap-[50px] md:gap-[40px] w-[100%] mt-[26px]">
                <div className="w-[65%] sm:w-[100%] flex flex-col gap-[20px]">
                  {data?.data?.products?.rows.map((data, idx) => (
                    <CartCard
                      key={idx}
                      imageURL={data?.Product?.Pictures[0]?.url}
                      productName={data?.Product?.name}
                      cafName={data?.Product?.Business?.businessName}
                      decreaseItem={decreaseItem}
                      itemID={data?.Product?.id}
                      increaseItem={increaseItem}
                      removeItem={removeItem}
                      quantity={data?.quantity}
                    />
                  ))}
                </div>

                <div className="w-[35%] sm:w-[100%]">
                  <CheckoutCard />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Cart;

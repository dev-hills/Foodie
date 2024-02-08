import CartCard from "../../Components/CartCard";
import CheckoutCard from "../../Components/CheckoutCard";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import { useGetUserCart } from "../../hooks/queries/cart";
import { useAuth } from "../../hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";
import {
  useDecreaseItemInCart,
  useIncreaseItemInCart,
  useRemoveItemFromCart,
} from "../../hooks/mutations/cart";
import loader from "/loader.svg";

const Cart = () => {
  const { token } = useAuth();
  const { data } = useGetUserCart(token);

  const queryClient = useQueryClient();

  const { mutate } = useRemoveItemFromCart(token);
  const { mutate: increase } = useIncreaseItemInCart(token);
  const { mutate: decrease } = useDecreaseItemInCart(token);

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
        <div className="pt-[120px] pb-[100px]">
          <div className="px-[85px] py-[10px]">
            <p className="font-poppins text-[22px] font-bold">{`Cart (${data?.data?.products?.rows.length})`}</p>

            <div className="flex flex-row items-start justify-between gap-[155px] w-[100%] mt-[26px]">
              <div className="w-[65%] flex flex-col gap-[20px]">
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

              <div className="w-[35%]">
                <CheckoutCard />
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Cart;

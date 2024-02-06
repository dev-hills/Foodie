import CartCard from "../../Components/CartCard";
import CheckoutCard from "../../Components/CheckoutCard";
import Footer from "../../Components/Footer";
import Navbar from "../../Components/Navbar";
import { useGetUserCart } from "../../hooks/queries/cart";
import { useAuth } from "../../hooks/useAuth";

const Cart = () => {
  const { token } = useAuth();
  const { data } = useGetUserCart(token);

  return (
    <div>
      <Navbar />

      <div className="pt-[120px] pb-[100px]">
        <div className="px-[85px] py-[10px]">
          <p className="font-poppins text-[22px] font-bold">{`Cart (${data?.data?.products?.rows.length})`}</p>

          <div className="flex flex-row items-start justify-between gap-[155px] w-[100%] mt-[26px]">
            <div className="w-[65%]">
              <CartCard />
            </div>

            <div className="w-[35%]">
              <CheckoutCard />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Cart;

import { Link } from "react-router-dom";
import { useGetUserCart } from "../hooks/queries/cart";
import { useAuth } from "../hooks/useAuth";

const CheckoutCard = () => {
  const { token } = useAuth();
  const { data } = useGetUserCart(token);

  const amount = (price, quantity) => {
    return price * quantity;
  };
  return (
    <div className="bg-white py-[13px] px-[30px] rounded-[10px]">
      <p className="font-poppins font-bold text-[20px]">Checkout</p>

      <div className="flex flex-row items-center justify-between border-[1px] border-black pb-[5px] border-x-0 border-t-0 mt-[10px]">
        <p className="font-poppins font-bold text-[18px]">Products</p>
        <p className="font-poppins font-bold text-[18px]">Total</p>
      </div>

      <div className="flex flex-col gap-[20px] mt-[20px]">
        {data?.data?.products?.rows.map((data, idx) => (
          <div key={idx} className="flex flex-row items-center justify-between">
            <p className="font-poppins font-bold text-[17px]">
              {data?.Product?.name}
            </p>

            <p className="font-poppins font-bold text-[17px]">{`\u20A6 ${amount(
              parseFloat(data?.Product?.amount),
              data?.quantity
            )}`}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-row items-center justify-between border-[1px] border-black pt-[5px] border-x-0 border-b-0 mt-[70px]">
        <p className="font-poppins font-bold text-[18px]">Total</p>
        <p className="font-poppins font-bold text-[18px]">{`\u20A6 ${data?.data?.products?.totalAmount}`}</p>
      </div>

      <Link to="/confirmOrder">
        <button className="mx-auto w-[100%] py-[12px] font-poppins rounded-[50px] mt-[40px] font-bold text-white bg-[#008000]">
          PROCEED TO CHECKOUT
        </button>
      </Link>
    </div>
  );
};

export default CheckoutCard;

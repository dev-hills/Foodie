import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import ProfileCard from "../../Components/ProfileCard";
import { useGetOrders } from "../../hooks/queries/cart";

import loader from "/loader.svg";

const Orders = () => {
  const token = localStorage.getItem("token");
  const { data } = useGetOrders(token);
  console.log(data);

  const formatDate = (date) => {
    const newDate = new Date(date);

    return newDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <Navbar />

      <div className="pt-[130px] px-[85px] sm:px-[5px] lg:px-[30px] flex flex-row sm:flex-col items-start gap-[24px] sm:gap-[5px] w-[100%]">
        <ProfileCard />

        {data?.status === 200 ? (
          data?.data?.orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-[20px] mt-[100px]">
              <p className="font-poppins text-[22px] font-bold">
                Your have no orders
              </p>
              <button className="font-poppins text-[16px] font-bold px-[20px] py-[10px] bg-[#008000] text-white rounded-md">
                <Link to="/chooseKitchen">Shop Now</Link>
              </button>
            </div>
          ) : (
            <div className="w-[80%] sm:w-[100%] bg-white rounded-[10px]">
              <div className="px-[30px] sm:px-[10px] py-[7px] flex flex-row items-center gap-[15px] font-poppins font-medium text-[20px] border-[1px] border-[#AAAAAA] border-x-0 border-t-0">
                Orders
              </div>

              <div className="px-[30px] sm:px-[10px] mt-[15px] pb-[25px] flex flex-col gap-[40px]">
                {data?.data?.orders?.map((order, idx) => (
                  <div
                    className="flex flex-row items-center gap-[20px] sm:gap-[10px]"
                    key={idx}
                  >
                    <img src={order?.image} alt="" width={100} />

                    <div className="flex flex-col gap-[3px]">
                      <h1 className="font-poppins font-semibold text-[20px]">
                        {order?.name}
                      </h1>

                      <p className="font-poppins font-medium text-[15px]">
                        Order ref: {order?.ref}
                      </p>

                      <div>
                        {order?.delivery_status === 0 ? (
                          <div className="bg-[#cccccc] w-[90px] py-[3px] px-[3px] text-white text-center rounded-[5px]">
                            awaiting confirmation
                          </div>
                        ) : order?.delivery_status === 1 ? (
                          <div className="bg-[#2ecc71] w-[90px] py-[3px] px-[3px] text-white text-center rounded-[5px]">
                            confirmed
                          </div>
                        ) : order?.delivery_status === 2 ? (
                          <div className="bg-[#facc15] w-[90px] py-[3px] px-[3px] text-white text-center rounded-[5px]">
                            processing
                          </div>
                        ) : order?.delivery_status === 3 ? (
                          <div className="bg-[#3498db] w-[90px] py-[3px] px-[3px] text-white text-center rounded-[5px]">
                            out for delivery
                          </div>
                        ) : order?.delivery_status === 4 ? (
                          <div className="bg-[#2ecc71] w-[90px] py-[3px] px-[3px] text-white text-center rounded-[5px]">
                            Delivered
                          </div>
                        ) : null}
                      </div>

                      {/* <div className="bg-[#0EBC0E] w-[90px] py-[3px] px-[3px] text-white text-center rounded-[5px]">
                        Delivered
                      </div> */}
                      <p className="font-poppins font-medium text-[15px]">
                        {formatDate(order?.createdAt)}
                      </p>
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

export default Orders;

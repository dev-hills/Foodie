import FoodCard from "../../Components/FoodCard";
import Navbar from "../../Components/Navbar";
import { useGetKitchenMenu } from "../../hooks/queries/menu";
import { useParams } from "react-router-dom";
import loader from "/loader.svg";

const KitchenMenu = () => {
  const { id } = useParams();
  const { data: apiData } = useGetKitchenMenu(id);

  return (
    <div>
      <Navbar />

      <div className="pt-[120px]">
        <div className="px-[85px] py-[30px]">
          <h1 className="uppercase font-inter text-[40px] font-normal text-center">
            nabiss cafeteria
          </h1>
          <h2 className="text-[35px] w-[800px] font-medium font-inter mx-auto border-[15px] border-[#008000] border-r-0 border-y-0 px-[16px] rounded-[10px]">
            Welcome to nabiss cafeteria what will you like to have today?
          </h2>
          <div className="mt-[50px]">
            <div className="mb-[55px] flex flex-row gap-[25px] flex-wrap justify-center">
              {apiData?.status !== 200 ? (
                <img src={loader} alt="" />
              ) : (
                apiData?.data?.menus.map((data, idx) => (
                  <div>
                    <FoodCard
                      key={idx}
                      imageUrl={data?.Pictures[0]?.url} //
                      foodName={data?.name}
                      category={data?.Category?.name}
                      cafLocation={data?.Business?.businessName}
                      price={`\u20A6${parseFloat(
                        data?.amount.replace(/\.?0+$/, "")
                      ).toLocaleString()} `}
                      productId={data?.id}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KitchenMenu;

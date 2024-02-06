import Navbar from "../../Components/Navbar";
import burgerElement from "/burgerElement.png";
import doughnutElement from "/doughnutElement.png";
import { Link } from "react-router-dom";
import { useGetKitchen } from "../../hooks/queries/menu";
import loader from "/loader.svg";

const Kitchen = () => {
  const { data: apiData } = useGetKitchen();

  return (
    <div>
      <Navbar />
      <div className="pt-[120px]">
        {/* ELEMENTS */}
        <div>
          <img src={burgerElement} className="absolute px-[85px]" />
          <img src={doughnutElement} className="absolute px-[85px] right-0" />
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="font-inter text-[37px] text-[#008000] mt-[80px]">
            PICK CAFETARIA
          </div>

          <div className="flex flex-row items-center gap-[400px] mt-[50px]">
            {apiData?.status !== 200 ? (
              <img src={loader} alt="" />
            ) : (
              apiData?.data?.rows.map((data, idx) => (
                <Link to={`/KitchenMenu/${data?.id}`} key={idx}>
                  <div className="flex flex-col items-center gap-[19px]">
                    <img
                      src={data?.Picture?.url}
                      alt=""
                      width={250}
                      className="w-[250px] h-[250px] object-cover rounded-full"
                    />
                    <p className="font-inter text-[30px] ">
                      {data?.businessName}
                    </p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="pb-[150px]">
          <img src={burgerElement} className="absolute px-[85px]" />
          <img src={doughnutElement} className="absolute px-[85px] right-0" />
        </div>
      </div>
    </div>
  );
};

export default Kitchen;

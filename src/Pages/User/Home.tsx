import Navbar from "../../Components/Navbar";
import linkedin from "/linkedin.png";
import facebook from "/facebook.png";
import instagram from "/instagram.png";
import cart from "/cartWhite.png";
import burgerElement from "/burgerElement.png";
import doughnutElement from "/doughnutElement.png";
import CategoryCard from "../../Components/CategoryCard";
import FoodCard from "../../Components/FoodCard";
import Footer from "../../Components/Footer";
import { useGetDashboardData } from "../../hooks/queries/user";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import loader from "/loader.svg";
import { Link } from "react-router-dom";

const Home = () => {
  const { token } = useAuth();
  const { data } = useGetDashboardData(token);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const categoryData = [
    {
      imageUrl: "/testImg1.png",
      categoryName: "Drink",
      categoryDesc:
        "Plant-based delights for ethical and compassionate dining.",
    },
    {
      imageUrl: "/testImg2.png",
      categoryName: "Snacks",
      categoryDesc: "Wholesome and flavorful vegetarian options for all.",
    },
    {
      imageUrl: "/testImg3.png",
      categoryName: "Swallow",
      categoryDesc:
        "Savor the finest non-vegetarian selections, crafted to perfection.",
    },
  ];

  return (
    <div>
      <Navbar />

      <div className="pt-[150px] sm:pt-[20px] lg:pt-[20px]">
        {/* ELEMENTS */}
        <div className="sm:hidden lg:hidden">
          <img src={burgerElement} className="absolute px-[85px]" />
          <img src={doughnutElement} className="absolute px-[85px] right-0" />
        </div>

        {/* HOME IMAGE AND TEXT */}
        <div className="sm:px-[10px] px-[85px] pt-[150px] flex flex-row sm:flex-col lg:flex-col sm:gap-[50px] lg:gap-[50px] items-center justify-between">
          {/* LEFT */}
          <div>
            {/* MAIN TEXT */}
            <h1 className="w-[500px] sm:w-[100%] font-abeezee text-[50px] leading-[62px] text-black font-medium">
              Hungry? No worries! Getting food made easier{" "}
              <span className="text-[#34BC5B]">Whenever</span>
            </h1>
            {/* ORDER BTN */}
            <div className="flex flex-row gap-[20px] mt-[20px] sm:mt-[10px]">
              {/* ORDER NOW BTN */}
              <Link to="/ChooseKitchen">
                <button className="bg-[#008000] px-[15px] py-[6px] sm:py-[15px] rounded-[20px] text-white font-poppins text-[18px] mt-[30px] flex flex-row items-center gap-[10px]">
                  <img src={cart} alt="" />
                  Order Now
                </button>
              </Link>
            </div>
            {/* QUICK MENU */}
          </div>

          {/* RIGHT */}
          <div className="flex flex-row sm:flex-col lg:flex-col items-center gap-[30px]">
            <img
              src={data?.data?.floatingItem?.Pictures[1]?.url}
              alt=""
              width={350}
              className="rounded-full object-cover"
            />
            {/* SOCIAL LINKS */}
            <div className="flex flex-col sm:flex-row lg:flex-row items-center gap-[30px]">
              <img src={linkedin} alt="" width={30} />
              <img src={instagram} alt="" width={30} />
              <img src={facebook} alt="" width={30} />
            </div>
          </div>
        </div>

        {/* ELEMENTS */}
        <div className="pb-[150px] sm:hidden lg:hidden">
          <img src={burgerElement} className="absolute px-[85px]" />
          <img src={doughnutElement} className="absolute px-[85px] right-0" />
        </div>

        {/* WHAT WILL YOU LIKE TO HAVE TODAY */}
        <div>
          <h1 className="text-center text-[#34BC5B] font-poppins text-[30px] font-bold mt-[70px] sm:mt-[150px] lg:mt-[150px] mb-[30px]">
            What would you like to have today?
          </h1>

          <div className="flex flex-row sm:flex-col sm:mx-[10px] lg:mx-[10px] lg:gap-[10px] items-center">
            {categoryData.map((data, idx) => (
              <CategoryCard
                key={idx}
                imageUrl={data.imageUrl}
                categoryName={data.categoryName}
                categoryDesc={data.categoryDesc}
              />
            ))}
          </div>
        </div>

        {/* FEATURED ITEMS */}
        <div className="px-[85px]">
          <p className="text-[#212121] text-center font-poppins text-[28px] font-bold mt-[120px] mb-[30px]">
            Featured Items
          </p>

          <div className="mb-[55px] flex flex-row gap-[35px] flex-wrap justify-center">
            {data?.status !== 200 ? (
              <img src={loader} alt="" />
            ) : (
              data?.data?.featureItems?.map((data, idx) => (
                <div>
                  <FoodCard
                    key={idx}
                    imageUrl={data?.Pictures[0]?.url}
                    category={data?.Category.name}
                    foodName={data?.name}
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

        <Footer />
      </div>
    </div>
  );
};

export default Home;

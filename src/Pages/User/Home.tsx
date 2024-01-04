import Navbar from "../../Components/Navbar";
import homeImg from "/homeImg.png";
import linkedin from "/linkedin.png";
import facebook from "/facebook.png";
import instagram from "/instagram.png";
import cart from "/cartWhite.png";
import burgerElement from "/burgerElement.png";
import doughnutElement from "/doughnutElement.png";
import CategoryCard from "../../Components/CategoryCard";
import FoodCard from "../../Components/FoodCard";

const Home = () => {
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

      <div>
        <img src={burgerElement} className="absolute px-[85px]" />
        <img src={doughnutElement} className="absolute px-[85px] right-0" />
      </div>

      <div className="px-[85px] pt-[150px] flex flex-row items-center justify-between">
        {/* LEFT */}
        <div>
          {/* MAIN TEXT */}
          <h1 className="w-[500px] font-abeezee text-[50px] leading-[62px] text-black font-medium">
            Hungry? No worries! Getting food made easier{" "}
            <span className="text-[#34BC5B]">Whenever</span>
          </h1>

          {/* ORDER BTN */}
          <div className="flex flex-row gap-[20px] mt-[20px]">
            {/* ORDER NOW BTN */}
            <button className="bg-[#008000] px-[15px] py-[6px] rounded-[20px] text-white font-poppins text-[18px] mt-[30px] flex flex-row items-center gap-[10px]">
              <img src={cart} alt="" />
              Order Now
            </button>
          </div>

          {/* QUICK MENU */}
        </div>

        {/* RIGHT */}
        <div className="flex flex-row items-center gap-[30px]">
          <img src={homeImg} alt="" width={350} />

          {/* SOCIAL LINKS */}
          <div className="flex flex-col items-center gap-[30px]">
            <img src={linkedin} alt="" width={30} />
            <img src={instagram} alt="" width={30} />
            <img src={facebook} alt="" width={30} />
          </div>
        </div>
      </div>

      <div className="pb-[150px]">
        <img src={burgerElement} className="absolute px-[85px]" />
        <img src={doughnutElement} className="absolute px-[85px] right-0" />
      </div>

      <h1 className="text-center text-[#34BC5B] font-poppins text-[30px] font-bold mt-[70px] mb-[30px]">
        What would you like to have today?
      </h1>

      <div className="flex flex-row items-center">
        {categoryData.map((data, idx) => (
          <CategoryCard
            key={idx}
            imageUrl={data.imageUrl}
            categoryName={data.categoryName}
            categoryDesc={data.categoryDesc}
          />
        ))}
      </div>

      <div className="px-[85px]">
        <p className="text-[#212121] font-poppins text-[28px] font-bold mt-[120px] mb-[30px]">
          Featured Items
        </p>
        <FoodCard />
      </div>
    </div>
  );
};

export default Home;

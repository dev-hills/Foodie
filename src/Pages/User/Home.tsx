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
import Footer from "../../Components/Footer";

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

  const foodData = [
    {
      imageUrl: "/1.png",
      foodName: "Chicken Salad",
      cafLocation: "Cafetaria 1",
      deliveryTime: "40 mins",
      price: "1,000",
      foodRating: "4.4",
    },
    {
      imageUrl: "/2.png",
      foodName: "Margherita Pizza",
      cafLocation: "Cafetaria 2",
      deliveryTime: "40 mins",
      price: "1,000",
      foodRating: "4.0",
    },
    {
      imageUrl: "/3.png",
      foodName: "Chicken Alfredo Pasta",
      cafLocation: "Cafetaria 3",
      deliveryTime: "40 mins",
      price: "1,000",
      foodRating: "4.2",
    },
    {
      imageUrl: "/4.png",
      foodName: "Classic Cheeseburger",
      cafLocation: "Cafetaria 4",
      deliveryTime: "40 mins",
      price: "1,000",
      foodRating: "4.1",
    },
    {
      imageUrl: "/5.png",
      foodName: "Veggie Fajitas",
      cafLocation: "Cafetaria 1",
      deliveryTime: "40 mins",
      price: "1,000",
      foodRating: "3.9",
    },
    {
      imageUrl: "/6.png",
      foodName: "Spaghetti Carbonara",
      cafLocation: "Cafetaria 3",
      deliveryTime: "40 mins",
      price: "1,000",
      foodRating: "4.2",
    },
    {
      imageUrl: "/7.png",
      foodName: "Gourmet Salad",
      cafLocation: "Cafetaria 3",
      deliveryTime: "40 mins",
      price: "1,000",
      foodRating: "3.8",
    },
    {
      imageUrl: "/8.png",
      foodName: "Shrimp Tacos",
      cafLocation: "Cafetaria 5",
      deliveryTime: "40 mins",
      price: "1,000",
      foodRating: "3.2",
    },
  ];

  return (
    <div>
      <Navbar />

      {/* ELEMENTS */}
      <div>
        <img src={burgerElement} className="absolute px-[85px]" />
        <img src={doughnutElement} className="absolute px-[85px] right-0" />
      </div>

      {/* HOME IMAGE AND TEXT */}
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

      {/* ELEMENTS */}
      <div className="pb-[150px]">
        <img src={burgerElement} className="absolute px-[85px]" />
        <img src={doughnutElement} className="absolute px-[85px] right-0" />
      </div>

      {/* WHAT WILL YOU LIKE TO HAVE TODAY */}
      <div>
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
      </div>

      {/* FEATURED ITEMS */}
      <div className="px-[85px]">
        <p className="text-[#212121] font-poppins text-[28px] font-bold mt-[120px] mb-[30px]">
          Featured Items
        </p>

        <div className="mb-[55px] flex flex-row gap-[25px] flex-wrap justify-center">
          {foodData.map((data, idx) => (
            <div>
              <FoodCard
                key={idx}
                imageUrl={data.imageUrl}
                foodName={data.foodName}
                cafLocation={data.cafLocation}
                deliveryTime={data.deliveryTime}
                price={data.price}
                foodRating={data.foodRating}
              />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Home;

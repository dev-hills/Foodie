import Navbar from "../../Components/Navbar";
import homeImg from "/homeImg.png";
import linkedin from "/linkedin.png";
import facebook from "/facebook.png";
import instagram from "/instagram.png";
import cart from "/cartWhite.png";
import burgerElement from "/burgerElement.png";
import doughnutElement from "/doughnutElement.png";

const Home = () => {
  return (
    <div>
      <Navbar />

      <div>
        <img src={burgerElement} className="absolute px-[85px]" />
        <img src={doughnutElement} className="absolute px-[85px] right-0" />
      </div>

      <div className="px-[85px] pt-[150px] flex flex-row items-center justify-between">
        {/* RIGHT */}
        <div>
          {/* MAIN TEXT */}
          <h1 className="w-[500px] font-abeezee text-[50px] leading-[62px] text-black font-medium">
            Hungry? No worries! Getting food made easier{" "}
            <span className="text-[#34BC5B]">Whenever</span>
          </h1>

          {/* ORDER BTN */}
          <div className="flex flex-row gap-[20px] mt-[40px]">
            {/* ORDER COUNTER BTN */}
            <button className="w-[150px] border-[1px] border-[#34BC5B] px-[15px] py-[6px] rounded-[20px] text-black font-poppins text-[18px] mt-[30px] items-center gap-[10px]">
              1
            </button>

            {/* ORDER NOW BTN */}
            <button className="bg-[#008000] px-[15px] py-[6px] rounded-[20px] text-white font-poppins text-[18px] mt-[30px] flex flex-row items-center gap-[10px]">
              <img src={cart} alt="" />
              Order Now
            </button>
          </div>

          {/* QUICK MENU */}
        </div>

        {/* LEFT */}
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

      <h1 className="text-center text-[#34BC5B] font-poppins text-[30px] font-bold my-[70px]">
        What would you like to have today?
      </h1>
    </div>
  );
};

export default Home;

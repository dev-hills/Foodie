import Navbar from "../../Components/Navbar";
import menu1 from "/menu1.png";
import menu2 from "/menu2.png";
import burgerElement from "/burgerElement.png";
import doughnutElement from "/doughnutElement.png";

const Menu = () => {
  return (
    <div>
      <Navbar />

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
          <div className="flex flex-col items-center gap-[19px]">
            <img src={menu1} alt="" width={250} />
            <p className="font-inter text-[30px] ">NABISS</p>
          </div>

          <div className="flex flex-col items-center gap-[19px]">
            <img src={menu2} alt="" width={250} />
            <p className="font-inter text-[30px] ">JB DAVTA</p>
          </div>
        </div>
      </div>

      <div className="pb-[150px]">
        <img src={burgerElement} className="absolute px-[85px]" />
        <img src={doughnutElement} className="absolute px-[85px] right-0" />
      </div>
    </div>
  );
};

export default Menu;

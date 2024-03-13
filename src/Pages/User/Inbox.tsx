import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import ProfileCard from "../../Components/ProfileCard";
import construction from "/construction.png";

const Inbox = () => {
  return (
    <div>
      <Navbar />

      <div className="pt-[130px] px-[85px] sm:px-[5px] flex flex-row items-start gap-[24px] w-[100%] sm:flex-col sm:gap-[5px]">
        <ProfileCard />

        <div className="flex flex-col items-center justify-center w-[80%] sm:w-[100%]">
          <img src={construction} alt="" width={400} />
          <div className="font-poppins text-[25px] font-bold">
            Under Construction
          </div>
          <div className="font-poppins text-[25px] font-semibold sm:text-center">
            In the meantime order some food
          </div>
          <button className="font-poppins text-[16px] font-bold px-[20px] py-[10px] bg-[#008000] text-white rounded-md">
            <Link to="/chooseKitchen">Order Now</Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inbox;

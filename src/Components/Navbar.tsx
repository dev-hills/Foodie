import logo from "/logo.png";
import search from "/search.png";
import cart from "/cart.png";
import eye from "/eye.png";
import person from "/person.png";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useGetDashboardData } from "../hooks/queries/user";
import loader from "/loader.svg";
const Navbar = () => {
  const { token } = useAuth();
  const { data } = useGetDashboardData(token);
  return (
    <div className="px-[85px] py-[20px] shadow-lg fixed w-[100%] z-[100] bg-[#eeeeee] flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-[50px]">
        {/* LOGO */}
        <Link to="/">
          <img src={logo} alt="" width={85} />
        </Link>

        {/* SEARCH BAR */}
        <div className="bg-white w-[320px] px-[15px] rounded-[10px] gap-0 flex flex-row items-center">
          <img src={search} alt="" />
          <input
            type="text"
            name=""
            id=""
            placeholder="Search for anything"
            className="px-[7px] py-[10px] bg-white placeholder:text-black text-black text-[18px] rounded-[10px] outline-none w-[100%]"
          />
        </div>
      </div>

      <div className="flex flex-row items-center gap-[100px]">
        {/* LINKS */}
        <div className="flex flex-row gap-[40px]">
          <Link to="/ChooseKitchen">
            <div className="font-inter text-[15px] text-black">Menu</div>
          </Link>
          <div className="font-inter text-[15px] text-black">Saved Items</div>
          <div className="font-inter text-[15px] text-black">Help</div>
          <Link to="/cart">
            <div className="font-poppins text-[15px] text-black flex flex-row items-center gap-[10px]">
              <img src={cart} alt="" width={25} />
              Cart
            </div>
          </Link>
          <div className="font-poppins text-[15px] text-black flex flex-row items-center gap-[8px]">
            <img src={eye} alt="" width={20} />
            {data?.status !== 200 ? (
              <img src={loader} width={20} />
            ) : (
              `\u20A6 ${data?.data?.walletBalance.toLocaleString()}`
            )}
            {/* {`\u20A6 ${data?.data?.walletBalance.toLocaleString()}`} */}
          </div>
        </div>

        {/* PROFILE */}
        <img src={person} alt="" />
      </div>
    </div>
  );
};

export default Navbar;

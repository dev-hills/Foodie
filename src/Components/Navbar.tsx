import logo from "/logo.png";
// import search from "/search.png";
import cart from "/cart.png";
import eye from "/eye.png";
import person from "/person.png";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useGetDashboardData } from "../hooks/queries/user";
import loader from "/loader.svg";
import hamburger from "/hamburger.png";
const Navbar = () => {
  const { token } = useAuth();
  const { data } = useGetDashboardData(token);
  return (
    <div className="sm:px-[10px] px-[85px] py-[20px] shadow-lg fixed w-[100%] z-[100] bg-[#eeeeee] flex flex-row items-center justify-between">
      {/* <div className="sm:w-[100%] h-[100vh] bg-red-500">hilary</div> */}
      <div className="flex flex-row items-start gap-[10px]">
        {/* LOGO */}
        <Link to="/">
          <img src={logo} alt="" width={85} />
        </Link>
        <div className=" bg-green-600 text-white px-[10px] rounded-[5px] text-[10px]">
          1.0
        </div>

        {/* SEARCH BAR */}
        {/* <div className="bg-white w-[320px] px-[15px] rounded-[10px] gap-0 flex flex-row items-center">
          <img src={search} alt="" />
          <input
            type="text"
            name=""
            id=""
            placeholder="Search for anything"
            className="px-[7px] py-[10px] bg-white placeholder:text-black text-black text-[18px] rounded-[10px] outline-none w-[100%]"
          />
        </div> */}
      </div>

      <div className="sm:hidden lg:hidden flex flex-row items-center gap-[100px]">
        {/* LINKS */}
        <div className="flex flex-row gap-[40px]">
          <Link to="/ChooseKitchen">
            <div className="font-inter text-[15px] text-black">Menu</div>
          </Link>
          <Link to="/faq">
            <div className="font-inter text-[15px] text-black">FAQ</div>
          </Link>
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
              `\u20A6 ${data?.data?.walletBalance?.toLocaleString()}`
            )}
            {/* {`\u20A6 ${data?.data?.walletBalance.toLocaleString()}`} */}
          </div>
        </div>

        {/* PROFILE */}
        <Link to="/profile/orders">
          <img src={person} alt="" />
        </Link>
      </div>

      <div className="hidden sm:block lg:block">
        <img src={hamburger} alt="" />
      </div>
    </div>
  );
};

export default Navbar;

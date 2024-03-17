import logo from "/logo.png";
import cart from "/cart.png";
import eye from "/eye.png";
import person from "/person.png";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useGetDashboardData } from "../hooks/queries/user";
import loader from "/loader.svg";
import hamburger from "/hamburger.png";
import { useState } from "react";
import { useGetUserCart } from "../hooks/queries/cart";
const Navbar = () => {
  const { token } = useAuth();
  const { data } = useGetDashboardData(token);
  const [displayHamburger, setDisplayHamburger] = useState(false);
  const [displayBalance, setDisplayBalance] = useState(false);
  const { data: cartData } = useGetUserCart(token);

  const toggleHamburger = () => {
    setDisplayHamburger(!displayHamburger);
  };

  const toggleWalletBalance = () => {
    setDisplayBalance(!displayBalance);
  };
  return (
    <>
      {/* HAMBURGER DISPLAY */}
      <div
        className={
          displayHamburger
            ? "hidden sm:w-[100%] sm:h-[65vh] sm:bg-white sm:fixed sm:z-[100000] sm:drop-shadow-xl sm:p-10 sm:flex sm:flex-col sm:items-center sm:rounded-t-none sm:rounded-b-[10px]"
            : "hidden"
        }
      >
        <div
          onClick={toggleHamburger}
          className="absolute right-0 px-10 font-poppins font-medium text-[30px]"
        >
          X
        </div>
        <div className="flex flex-row items-start gap-[10px] mb-[40px] mt-[50px]">
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

        {/* LINKS */}
        <div className="flex flex-col items-center gap-[40px]">
          <Link to="/ChooseKitchen">
            <div className="font-inter text-[20px] text-black">Menu</div>
          </Link>
          <Link to="/faq">
            <div className="font-inter text-[20px] text-black">FAQ</div>
          </Link>
          <div className="font-inter text-[20px] text-black">Help</div>
          <Link to="/cart">
            <div className="font-poppins text-[15px] text-black flex flex-row items-start gap-[5px]">
              <div className="flex flex-row items-center gap-[5px]">
                <img src={cart} alt="" width={25} />
                Cart
              </div>
              <div className="bg-[#008000] rounded-full w-[20px] h-[20px] text-center text-[15px] text-white">
                {cartData?.data?.products?.rows.length}
              </div>
            </div>
          </Link>
          <div className="font-poppins text-[20px] text-black flex flex-row items-center gap-[8px]">
            <div onClick={toggleWalletBalance}>
              <img src={eye} alt="" width={20} />
            </div>

            <div>
              {data?.status !== 200 ? (
                <img src={loader} width={20} />
              ) : (
                <input
                  disabled
                  className="bg-transparent outline-none w-[90px]"
                  type={displayBalance ? "password" : "text"}
                  value={`\u20A6 ${data?.data?.walletBalance?.toLocaleString()}`}
                />
              )}
            </div>
            {/* {`\u20A6 ${data?.data?.walletBalance.toLocaleString()}`} */}
          </div>
        </div>
      </div>

      <div className=" sm:px-[10px] px-[85px] py-[20px] shadow-lg fixed w-[100%] z-[100] bg-[#eeeeee] flex flex-row items-center justify-between">
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
              <div className="font-poppins text-[15px] text-black flex flex-row items-start gap-[5px]">
                <div className="flex flex-row items-center gap-[5px]">
                  <img src={cart} alt="" width={25} />
                  Cart
                </div>
                <div className="bg-[#008000] rounded-full w-[20px] h-[20px] text-center text-[15px] text-white">
                  {cartData?.data?.products?.rows.length}
                </div>
              </div>
            </Link>
            <div className="font-poppins text-[15px] text-black flex flex-row items-center gap-[8px]">
              <div onClick={toggleWalletBalance}>
                <img src={eye} alt="" width={20} />
              </div>

              <div>
                {data?.status !== 200 ? (
                  <img src={loader} width={20} />
                ) : (
                  <input
                    disabled
                    className="bg-transparent outline-none"
                    type={displayBalance ? "password" : "text"}
                    value={`\u20A6 ${data?.data?.walletBalance?.toLocaleString()}`}
                  />
                )}
              </div>

              {/* <div>
                {data?.status !== 200 ? (
                  <img src={loader} width={20} />
                ) : (
                  `\u20A6 ${data?.data?.walletBalance?.toLocaleString()}`
                )}
              </div> */}
              {/* {`\u20A6 ${data?.data?.walletBalance.toLocaleString()}`} */}
            </div>
          </div>

          {/* PROFILE */}
          <Link to="/profile/orders">
            <img src={person} alt="" />
          </Link>
        </div>

        <div onClick={toggleHamburger} className="hidden sm:block lg:block">
          <img src={hamburger} alt="" />
        </div>
      </div>
    </>
  );
};

export default Navbar;

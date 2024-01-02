import logo from "/logo.png";
import search from "/search.png";
import cart from "/cart.png";
import eye from "/eye.png";
import person from "/person.png";
const Navbar = () => {
  return (
    <div className="px-[85px] py-[25px] flex flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-[50px]">
        {/* LOGO */}
        <img src={logo} alt="" width={85} />

        {/* SEARCH BAR */}
        <div className="bg-[#a09898] w-[320px] px-[15px] rounded-[10px] gap-0 flex flex-row items-center">
          <img src={search} alt="" />
          <input
            type="text"
            name=""
            id=""
            placeholder="Search for anything"
            className="px-[7px] py-[10px] bg-[#a09898] placeholder:text-white text-white text-[18px] rounded-[10px] outline-none w-[100%]"
          />
        </div>
      </div>

      <div className="flex flex-row items-center gap-[100px]">
        {/* LINKS */}
        <div className="flex flex-row gap-[40px]">
          <div className="font-inter text-[15px] text-black">Menu</div>
          <div className="font-inter text-[15px] text-black">Saved Items</div>
          <div className="font-inter text-[15px] text-black">Help</div>
          <div className="font-poppins text-[15px] text-black flex flex-row items-center gap-[10px]">
            <img src={cart} alt="" width={25} />
            Cart
          </div>
          <div className="font-poppins text-[15px] text-black flex flex-row items-center gap-[10px]">
            <img src={eye} alt="" width={25} /># 1,000,000
          </div>
        </div>

        <img src={person} alt="" />
      </div>
    </div>
  );
};

export default Navbar;

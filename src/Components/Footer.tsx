import logo from "/logo.png";
import location from "/locationwhite.png";
import phone from "/phone.png";
import fax from "/fax.png";
import facebook from "/facebookWhite.png";
import twitter from "/twitter.png";
import linkedin from "/linkedinWhite.png";
import youtube from "/youtube.png";
import instagram from "/instagramWhite.png";
// import google from "/google.png";
// import pinterest from "/pinterest.png";
// import rss from "/rss.png";

const Footer = () => {
  return (
    <div className="bg-[#028643] py-[100px] sm:py-[50px] lg:py-[50px] px-[150px] sm:px-[10px] lg:px-[10px]">
      <div className="border-[1px] border-white border-l-0 border-r-0 px-[50px] sm:px-[5px] py-[70px] sm:py-[20px] flex flex-row sm:flex-col items-center justify-between sm:gap-[50px]">
        <div>
          <img src={logo} width={120} />
        </div>

        <div>
          <div className="flex flex-row items-center gap-[15px] font-poppins text-white text-[14px]">
            <img src={location} alt="" />
            345 Faulconer Drive, Suite 4 • Charlottesville, CA, 12345
          </div>

          <div className="flex flex-row sm:flex-col sm:gap-[30px] justify-between mt-[15px]">
            <div className="flex flex-row items-center gap-[15px] font-poppins text-white text-[14px]">
              <img src={phone} alt="" />
              (123) 456-7890
            </div>

            <div className="flex flex-row items-center gap-[15px] font-poppins text-white text-[14px]">
              <img src={fax} alt="" />
              (123) 456-7890
            </div>
          </div>

          <div className="mt-[40px] flex flex-row items-center gap-[32px]">
            <p className="text-white text-[15px] font-normal">Social Media</p>

            <div className="flex flex-row gap-[20px]">
              <img src={facebook} alt="" />
              <img src={twitter} alt="" />
              <img src={linkedin} alt="" />
              <img src={youtube} alt="" />
              <img src={instagram} alt="" />
              {/* <img src={google} alt="" />
              <img src={pinterest} alt="" />
              <img src={rss} alt="" /> */}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row sm:flex-col items-center sm:gap-[10px] justify-between mt-[20px]">
        <div className="flex flex-row sm:gap-[10px] gap-[60px]">
          <p className="text-white font-poppins">ABOUT US</p>
          <p className="text-white font-poppins">CONTACT US</p>
          <p className="text-white font-poppins">HELP</p>
          <p className="text-white font-poppins">MENU</p>
          <p className="text-white font-poppins">DISCLAIMER</p>
        </div>

        <div className="flex flex-row items-center gap-[5px]">
          <p className="text-white font-poppins">Copyright © 2024</p>
          <div className="w-[7px] h-[7px] rounded-full bg-white"></div>
          <p className="text-white font-poppins">Foodie</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

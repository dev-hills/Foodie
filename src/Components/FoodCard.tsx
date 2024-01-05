import star from "/star.png";
import location from "/location.png";
import save from "/save.png";
import cart from "/cartWhite.png";
import { typeFoodCard } from "../utils/types";
const FoodCard = ({
  imageUrl,
  foodName,
  cafLocation,
  deliveryTime,
  price,
  foodRating,
}: typeFoodCard) => {
  return (
    <div>
      <div className="w-[400px] h-[470px] mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5">
        <div>
          {/* <div className="absolute py-[8px] px-[20px] rounded-[8px] mt-[12px] ml-[250px] flex flex-row items-center gap-[15px] bg-[#aaaaaa33] backdrop-blur-[10px] text-white">
            <div className="w-[11px] h-[11px] bg-[#94C763] rounded-full"></div>
            Available
          </div> */}

          <img className="w-[400px] h-[200px] object-cover" src={imageUrl} />
        </div>

        <div className="px-[12px] py-[15px]">
          <div className="flex flex-row items-center gap-[8px]">
            <div className="flex flex-row items-center text-center gap-[3px] rounded-[8px] text-white bg-[#6EA837] p-[5px] font-poppins text-[17px] font-bold">
              <img src={star} alt="" /> {foodRating}
            </div>
            <h1 className="text-[#424242] font-poppins text-[17px]">
              Dining & Delivery
            </h1>
          </div>

          <div>
            <h1 className="text-[#212121] font-poppins text-[20px] font-bold mt-[13px]">
              {foodName}
            </h1>

            <div className="flex flex-row items-center gap-[3px] font-poppins text-[17px] text-[#34BC5B]">
              <img src={location} alt="" /> {cafLocation}
            </div>

            <h2 className="text-black font-poppins text-[17px] mt-[5px]">
              Est. Delivery Time: {deliveryTime}
            </h2>

            <h1 className="text-[#212121] font-poppins text-[21px] font-bold mt-[10px]">
              {price}
            </h1>
          </div>

          <div className="flex flex-row items-center gap-[10px] mt-[15px]">
            <button className="flex flex-row items-center gap-[5px] h-[35px] rounded-[12px] p-[22px] bg-[#FFF2E8] text-[#34BC5B] text-center font-poppins text-[18px] font-bold">
              <img src={save} alt="" /> Save for later
            </button>

            <button className="flex flex-row items-center gap-[5px] h-[35px] rounded-[12px] p-[22px] bg-[#34BC5B] text-white text-center font-poppins text-[18px] font-bold">
              <img src={cart} alt="" /> Add to cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;

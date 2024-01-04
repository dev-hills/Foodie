import { typeCategoryCard } from "../utils/types";

const CategoryCard = ({
  imageUrl,
  categoryName,
  categoryDesc,
}: typeCategoryCard) => {
  return (
    <div className="w-[350px] sm:w-[100%] h-[276px] mx-auto rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5">
      <div>
        <img
          className="w-[350px] sm:w-[100%] h-[276px] object-cover"
          src={imageUrl}
        />
      </div>

      <div className="px-[28px] py-[20px] mt-[-100px] absolute bg-[#88888866] backdrop-blur-[9px] w-[350px] sm:w-[100%] rounded-xl rounded-t-none">
        <h1 className="text-white font-poppins text-[20px] font-bold">
          {categoryName}
        </h1>
        <p className="text-white font-poppins text-[15px] font-normal leading-[15px]">
          {categoryDesc}
        </p>
      </div>
    </div>
  );
};

export default CategoryCard;

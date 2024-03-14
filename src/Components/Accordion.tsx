/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import arrow from "/arrowDown.png";

const Accordion = ({ title, description }: any) => {
  const [descVisible, setDescVisible] = useState(false);

  const toggleDescription = () => {
    setDescVisible(!descVisible);
  };

  return (
    <div className="w-[1000px] sm:w-[100%] sm:px-[20px] bg-white px-[70px] py-[20px] flex flex-row items-start justify-between rounded-[10px]">
      <div className="w-[80%]">
        <h1 className="font-poppins font-bold text-[20px] leading-[39px]">
          {title}
        </h1>

        {descVisible && (
          <p className="font-poppins font-medium text-[20px] leading-[39px]">
            {description}
          </p>
        )}
      </div>

      <div className="cursor-pointer" onClick={toggleDescription}>
        <img src={arrow} alt="" className="w-[30px]" />
      </div>
    </div>
  );
};

export default Accordion;

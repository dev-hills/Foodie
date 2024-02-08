/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import trash from "/trashRed.png";
import minus from "/minus.png";
import plus from "/plus.png";
const CartCard = ({
  imageURL,
  productName,
  cafName,
  decreaseItem,
  itemID,
  increaseItem,
  removeItem,
  quantity,
}) => {
  const handleRemove = () => {
    removeItem(itemID);
  };

  const handleIncrease = () => {
    increaseItem(itemID);
  };
  const handleDecrease = () => {
    decreaseItem(itemID);
  };
  return (
    <div className="">
      <div className="p-[20px] w-[100%] bg-white shadow-lg rounded-[10px]">
        <div className="flex flex-row items-center gap-[12px]">
          <img
            src={imageURL}
            alt=""
            className="rounded-full object-cover w-[100px] h-[100px]"
          />

          <div>
            <h3 className="font-poppins font-semibold text-[20px]">
              {productName}
            </h3>
            <h3 className="font-poppins font-semibold text-[20px]">
              {`Cafetaria: ${cafName}`}
            </h3>
          </div>
        </div>

        <div className="flex flex-row items-end justify-between">
          <div
            onClick={handleRemove}
            className="flex cursor-pointer flex-row items-center gap-[5px]"
          >
            <img src={trash} alt="" width={20} />

            <div className="font-poppins font-semibold text-[17px] text-[#FF0000]">
              Remove
            </div>
          </div>

          <div className="flex flex-row items-end gap-[10px]">
            <button onClick={handleDecrease}>
              <img src={minus} alt="" width={27} />
            </button>

            <div className="flex flex-col items-center gap-[5px]">
              <p className="text-[16px] font-medium">QTY</p>

              <div className="bg-[#D9D9D9] w-[100px] rounded-[30px] h-[30px] flex items-center justify-center font-poppins font-medium text-[16px]">
                {quantity}
              </div>
            </div>

            <button onClick={handleIncrease}>
              <img src={plus} alt="" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartCard;

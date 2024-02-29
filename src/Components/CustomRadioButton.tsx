const CustomRadioButton = ({ id, value, checked, onChange }) => {
  return (
    <div
      id={id}
      className={`cursor-pointer flex items-center justify-center w-6 h-6 rounded-full border border-gray-400 mr-2 ${
        checked ? "bg-blue-500 border-blue-500" : ""
      }`}
      onClick={() => onChange(value)}
    >
      {checked && <div className="w-3 h-3 rounded-full bg-white"></div>}
    </div>
  );
};

export default CustomRadioButton;

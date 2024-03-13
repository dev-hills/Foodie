import { Link } from "react-router-dom";
import person from "/person.png";

const ProfileCard = () => {
  const profileItems = [
    {
      icon: "/order.png",
      name: "Orders",
      link: "/profile/orders",
    },
    {
      icon: "/inbox.png",
      name: "Inbox",
      link: "/profile/inbox",
    },
    {
      icon: "/like.png",
      name: "Saved Items",
      link: "/profile/savedItems",
    },
    {
      icon: "/topup.png",
      name: "Top Up Wallet",
      link: "/profile/topup",
    },
    {
      icon: "/withdraw.png",
      name: "Withdraw",
      link: "/",
    },
  ];
  return (
    <div className="w-[25%] sm:w-[100%] bg-white rounded-[10px] drop-shadow-lg sm:flex sm:flex-row sm:justify-between sm:items-center">
      <div className="px-[8px] py-[7px] flex flex-row items-center gap-[15px] border-[1px] border-[#AAAAAA] border-x-0 border-t-0 sm:border-y-0 sm:border-r-2">
        <img src={person} alt="" />
        <p className="sm:hidden font-poppins font-medium text-[16px]">
          My Foodie Account
        </p>
      </div>

      <div className="mt-[10px] pb-[25px] border-[1px] border-[#AAAAAA] border-x-0 border-t-0 sm:flex sm:flex-row sm:items-center sm:gap-[10px] sm:border-none">
        {profileItems.map((items, idx) => (
          <Link key={idx} to={items.link}>
            <div className="mt-[10px] px-[8px] py-[7px] flex flex-row items-center gap-[15px]">
              <img src={items.icon} alt="" className="w-[30px] sm:w-[50px]" />
              <p className="sm:hidden font-poppins font-medium text-[16px]">
                {items.name}
              </p>
            </div>
          </Link>
        ))}
      </div>

      <div className="py-[25px] sm:px-[8px] text-center font-poppins font-bold text-[16px] text-[#008000]">
        Logout
      </div>
    </div>
  );
};

export default ProfileCard;

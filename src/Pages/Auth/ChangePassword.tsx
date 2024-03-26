import { useLocation } from "react-router-dom";

const ChangePassword = () => {
  const location = useLocation();
  const { email, otp } = location.state;
  console.log(email, otp);

  return <div>ChangePassword</div>;
};

export default ChangePassword;

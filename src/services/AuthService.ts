import axios from "axios";
import {
  typeLogin,
  typeRegisterDetails,
  typeResendOtp,
  typeVerifyAccount,
} from "../utils/types";

const base_url = "https://fd-beta.bakare.tech/api/v1/user";

export const register = async (data: typeRegisterDetails) => {
  const response = await axios.post(`${base_url}/create`, data);
  return response.data;
};

export const verifyAccount = async (data: typeVerifyAccount) => {
  const response = await axios.post(`${base_url}/activate`, data);
  return response.data;
};

export const login = async (credentials: typeLogin) => {
  const headers = {
    Authorization: `Basic ${credentials.credentials}`,
  };

  const response = await axios.post(`${base_url}/sign-in`, {}, { headers });
  return response.data;
};

export const ResendOTP = async (data: typeResendOtp) => {
  const response = await axios.post(`${base_url}/otp`, data);
  return response.data;
};

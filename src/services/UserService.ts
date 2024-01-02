import axios from "axios";
import { typeCreateProfile } from "../utils/types";

const base_url = "https://fd-test.bakare.tech/api/v1/user";

export const uploadImage = async (data) => {
  const response = await axios.post(
    `https://fd-test.bakare.tech/api/v1/media`,
    data
  );
  return response.data;
};

export const createProfile = async (data: typeCreateProfile) => {
  const response = await axios.post(`${base_url}/profile`, data);
  return response.data;
};

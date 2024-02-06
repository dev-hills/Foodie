/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { typeCreateProfile } from "../utils/types";

const base_url = "https://fd-beta.bakare.tech/api/v1/user";

export const uploadImage = async (data) => {
  const response = await axios.post(
    `https://fd-beta.bakare.tech/api/v1/media`,
    data
  );
  return response.data;
};

export const createProfile = async (data: typeCreateProfile, token: string) => {
  const response = await axios.post(`${base_url}/profile`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const GetDashboardData = async (token) => {
  const response = await axios.get(`${base_url}/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

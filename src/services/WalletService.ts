/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const base_url = "https://fd-beta.bakare.tech/api/v1/wallet";

export const initiateCardTransaction = async (data: any, token: string) => {
  const response = await axios.post(`${base_url}/initiate-payment`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const initiateWalletTransaction = async (data: any, token: string) => {
  const response = await axios.post(
    `${base_url}/initiate-wallet-transfer`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const completeWalletTransaction = async (data: any, token: string) => {
  const response = await axios.post(
    `${base_url}/complete-wallet-transfer`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

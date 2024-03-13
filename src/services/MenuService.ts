import axios from "axios";

const base_url = "https://fd-beta.bakare.tech/api/v1/menu";

export const GetKitchen = async () => {
  const response = await axios.get(`${base_url}/kitchens`);
  return response.data;
};

export const GetKitchenMenu = async (id, token) => {
  const response = await axios.get(
    `${base_url}/kitchen?kitchenId=${id}&page=0&size=50`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

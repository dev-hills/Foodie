import axios from "axios";

const base_url = "https://fd-beta.bakare.tech/api/v1/order";

export const addToCart = async (data, token) => {
  const response = await axios.post(`${base_url}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getUserCart = async (token) => {
  console.log(token);

  const response = await axios.get(`${base_url}/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  // console.log(token);

  return response.data;
};

export const removeItemFromCart = async (id, token) => {
  const response = await axios.delete(`${base_url}?productId=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const increaseItemInCart = async (id, token) => {
  const response = await axios.put(
    `${base_url}/increase?productId=${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const decreaseItemInCart = async (id, token) => {
  const response = await axios.put(
    `${base_url}/decrease?productId=${id}`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response.data;
};

export const getOrders = async (token) => {
  const response = await axios.get(`${base_url}/user/all`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const saveItem = async (token, data) => {
  const response = await axios.post(`${base_url}/saved`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getSavedItem = async (token) => {
  const response = await axios.get(`${base_url}/saved?page=0&size=50`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const removeSavedItem = async (token, id) => {
  const response = await axios.delete(`${base_url}/saved?productId=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

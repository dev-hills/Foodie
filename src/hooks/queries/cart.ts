import { useQuery } from "@tanstack/react-query";
import {
  getOrders,
  getSavedItem,
  getUserCart,
} from "../../services/CartService";

export const useGetUserCart = (token) => {
  return useQuery({
    queryKey: ["getUserCart"],
    queryFn: () => getUserCart(token),
  });
};

export const useGetOrders = (token) => {
  return useQuery({
    queryKey: ["getUserOrders"],
    queryFn: () => getOrders(token),
  });
};

export const useGetSavedItem = (token) => {
  return useQuery({
    queryKey: ["getSavedItem"],
    queryFn: () => getSavedItem(token),
  });
};

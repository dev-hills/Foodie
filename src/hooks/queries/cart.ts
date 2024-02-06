import { useQuery } from "@tanstack/react-query";
import { getUserCart } from "../../services/CartService";

export const useGetUserCart = (token) => {
  return useQuery({
    queryKey: ["getUserCart"],
    queryFn: () => getUserCart(token),
  });
};

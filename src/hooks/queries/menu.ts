import { useQuery } from "@tanstack/react-query";
import { GetKitchen, GetKitchenMenu } from "../../services/MenuService";

export const useGetKitchen = () => {
  return useQuery({
    queryKey: ["getKitchen"],
    queryFn: () => GetKitchen(),
  });
};

export const useGetKitchenMenu = (id) => {
  return useQuery({
    queryKey: [`getKitchenMenu-${id}`],
    queryFn: () => GetKitchenMenu(id),
  });
};

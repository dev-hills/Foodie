import { useQuery } from "@tanstack/react-query";
import {
  GetDashboardData,
  GetUser,
  GetUserAddresses,
} from "../../services/UserService";

export const useGetDashboardData = (token) => {
  return useQuery({
    queryKey: ["getDashboardData"],
    queryFn: () => GetDashboardData(token),
  });
};

export const useGetUserAddresses = (token) => {
  return useQuery({
    queryKey: ["getUserAddresses"],
    queryFn: () => GetUserAddresses(token),
  });
};

export const useGetUser = (token) => {
  return useQuery({
    queryKey: ["getUser"],
    queryFn: () => GetUser(token),
  });
};

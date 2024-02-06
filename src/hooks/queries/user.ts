import { useQuery } from "@tanstack/react-query";
import { GetDashboardData } from "../../services/UserService";

export const useGetDashboardData = (token) => {
  return useQuery({
    queryKey: ["getDashboardData"],
    queryFn: () => GetDashboardData(token),
  });
};

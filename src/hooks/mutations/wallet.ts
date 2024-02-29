import { useMutation } from "@tanstack/react-query";
import {
  completeWalletTransaction,
  initiateCardTransaction,
  initiateWalletTransaction,
} from "../../services/WalletService";

export const useInitiateCardTransaction = (token) => {
  return useMutation({
    mutationKey: ["initiateCardTransaction"],
    mutationFn: (data) => initiateCardTransaction(data, token),
  });
};

export const useInitiateWalletTransaction = (token) => {
  return useMutation({
    mutationKey: ["initiateWalletTransaction"],
    mutationFn: (data) => initiateWalletTransaction(data, token),
  });
};

export const useCompleteWalletTransaction = (token) => {
  return useMutation({
    mutationKey: ["completeWalletTransaction"],
    mutationFn: (data) => completeWalletTransaction(data, token),
  });
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";

import {
  ResendOTP,
  login,
  register,
  verifyAccount,
} from "../../services/AuthService";
import {
  typeLogin,
  typeRegisterDetails,
  typeResendOtp,
  typeVerifyAccount,
} from "../../utils/types";

export const useRegister = () => {
  return useMutation({
    mutationKey: ["register"],
    mutationFn: (data: typeRegisterDetails) => register(data),
  });
};

export const useVerifyAccount = () => {
  return useMutation({
    mutationKey: ["verifyAccount"],
    mutationFn: (data: typeVerifyAccount) => verifyAccount(data),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationKey: ["Login"],
    mutationFn: (data: typeLogin) => login(data),
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationKey: ["resendOTP"],
    mutationFn: (data: typeResendOtp) => ResendOTP(data),
  });
};

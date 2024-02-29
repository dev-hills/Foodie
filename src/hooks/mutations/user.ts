/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from "@tanstack/react-query";
import {
  createProfile,
  setAddressDefault,
  uploadImage,
} from "../../services/UserService";
import { typeCreateProfile } from "../../utils/types";

export const useUploadMedia = () => {
  return useMutation({
    mutationKey: ["upload"],
    mutationFn: (data) => uploadImage(data),
  });
};

export const useCreateProfile = () => {
  return useMutation({
    mutationKey: ["createProfile"],
    mutationFn: ({ data, token }: { data: typeCreateProfile; token: string }) =>
      createProfile(data, token),
  });
};

export const useSetAddressDefault = (token) => {
  return useMutation({
    mutationKey: ["setAddressDefault"],
    mutationFn: (data) => setAddressDefault(token, data),
  });
};

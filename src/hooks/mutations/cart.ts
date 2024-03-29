import { useMutation } from "@tanstack/react-query";
import {
  addToCart,
  decreaseItemInCart,
  increaseItemInCart,
  removeItemFromCart,
  removeSavedItem,
  saveItem,
} from "../../services/CartService";

export const useAddToCart = (token) => {
  return useMutation({
    mutationKey: ["Add to cart"],
    mutationFn: (data) => addToCart(data, token),
  });
};

export const useRemoveItemFromCart = (token) => {
  return useMutation({
    mutationKey: [`RemoveItemFromCart}`],
    mutationFn: (id) => removeItemFromCart(id, token),
  });
};

export const useIncreaseItemInCart = (token) => {
  return useMutation({
    mutationKey: [`increaseItemInCart}`],
    mutationFn: (id) => increaseItemInCart(id, token),
  });
};

export const useDecreaseItemInCart = (token) => {
  return useMutation({
    mutationKey: [`decreaseItemInCart}`],
    mutationFn: (id) => decreaseItemInCart(id, token),
  });
};

export const useSaveItem = (token) => {
  return useMutation({
    mutationKey: ["saveItem"],
    mutationFn: (data) => saveItem(token, data),
  });
};

export const useRemoveSavedItem = (token) => {
  return useMutation({
    mutationKey: ["saveItem"],
    mutationFn: (id) => removeSavedItem(token, id),
  });
};

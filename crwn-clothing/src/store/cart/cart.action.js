import { CART_ACTION_TYPES } from './cart.types';

const addCartItem = (cartItems, productToAdd) => {
  const newCartItems = [...cartItems];
  const existingItem = newCartItems.find((item) => item.id === productToAdd.id);

  if (!existingItem) {
    newCartItems.push({ ...productToAdd, quantity: 1 });
    return newCartItems;
  }

  existingItem.quantity = existingItem.quantity + 1;

  return newCartItems;
};

const removeCartItem = (cartItems, productIdToRemove) => {
  const newCartItems = [...cartItems];
  const existingItem = newCartItems.find(
    (item) => item.id === productIdToRemove
  );

  if (existingItem.quantity === 1) {
    return newCartItems.filter((item) => item.id !== productIdToRemove);
  }

  existingItem.quantity = existingItem.quantity - 1;

  return newCartItems;
};

const clearCartItem = (cartItem, productIdToClear) => {
  return cartItem.filter((item) => item.id !== productIdToClear);
};

export const setIsCartOpen = (cartOpen) => {
  return {
    type: CART_ACTION_TYPES.SET_IS_CART_OPEN,
    payload: cartOpen,
  };
};

export const addItemToCart = (cartItems, productToAdd) => {
  const newCartItems = addCartItem(cartItems, productToAdd);

  return {
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: newCartItems,
  };
};

export const removeItemFromCart = (cartItems, productIdToRemove) => {
  const newCartItems = removeCartItem(cartItems, productIdToRemove);

  return {
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: newCartItems,
  };
};

export const clearItemFromCart = (cartItems, productIdToClear) => {
  const newCartItems = clearCartItem(cartItems, productIdToClear);

  return {
    type: CART_ACTION_TYPES.SET_CART_ITEMS,
    payload: newCartItems,
  };
};

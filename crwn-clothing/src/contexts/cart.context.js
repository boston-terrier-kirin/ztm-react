import { createContext, useEffect, useState } from 'react';

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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
});

export const CartProvider = (props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const totalPrice = cartItems.reduce((totalPrice, item) => {
      return totalPrice + item.quantity * item.price;
    }, 0);

    setTotal(totalPrice);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    const items = addCartItem(cartItems, productToAdd);
    setCartItems(items);
  };

  const removeItemFromCart = (productIdToRemove) => {
    const items = removeCartItem(cartItems, productIdToRemove);
    setCartItems(items);
  };

  const clearItemFromCart = (productIdToClear) => {
    const items = clearCartItem(cartItems, productIdToClear);
    setCartItems(items);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    total,
  };

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};

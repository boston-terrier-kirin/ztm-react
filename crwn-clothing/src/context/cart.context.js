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

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0,
});

export const CartProvider = (props) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    setCartCount(newCartCount);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    const items = addCartItem(cartItems, productToAdd);
    setCartItems(items);
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
  };

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};

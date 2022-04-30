import { createContext, useReducer } from 'react';

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

export const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN',
};

const initialState = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  total: 0,
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`unhandled type ${type}`);
  }
};

export const CartProvider = (props) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);
  const { isCartOpen, cartItems, cartCount, cartTotal } = state;

  const updateCartItemReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce((total, item) => {
      return total + item.quantity;
    }, 0);

    const newCartTotal = newCartItems.reduce((totalPrice, item) => {
      return totalPrice + item.quantity * item.price;
    }, 0);

    dispatch({
      type: 'SET_CART_ITEMS',
      payload: {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      },
    });
  };

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    updateCartItemReducer(newCartItems);
  };

  const removeItemFromCart = (productIdToRemove) => {
    const newCartItems = removeCartItem(cartItems, productIdToRemove);
    updateCartItemReducer(newCartItems);
  };

  const clearItemFromCart = (productIdToClear) => {
    const newCartItems = clearCartItem(cartItems, productIdToClear);
    updateCartItemReducer(newCartItems);
  };

  const setIsCartOpen = (cartOpen) => {
    dispatch({ type: CART_ACTION_TYPES.SET_IS_CART_OPEN, payload: cartOpen });
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartCount,
    cartTotal,
  };

  return (
    <CartContext.Provider value={value}>{props.children}</CartContext.Provider>
  );
};

// const cartReducer = (state, action) => {
//   const { type, payload } = action;
//   const { cartItems } = state;

//   // これはダメだった
//   if (type === CART_ACTION_TYPES.ADD_CART_ITEM) {
//     const newCartItems = [...cartItems];

//     const existingItem = newCartItems.find((item) => item.id === payload.id);
//     if (!existingItem) {
//       return {
//         cartItems: [...cartItems, { ...payload, quantity: 1 }],
//       };
//     }

//     existingItem.quantity = existingItem.quantity + 1;
//     console.log(newCartItems);

//     return { cartItems: newCartItems };
//   }

//   // MAX流が正しい。
//   if (type === CART_ACTION_TYPES.ADD_CART_ITEM) {
//     const existingItemIndex = cartItems.findIndex(
//       (item) => item.id === payload.id
//     );

//     if (existingItemIndex === -1) {
//       return {
//         cartItems: [...cartItems, { ...payload, quantity: 1 }],
//       };
//     }

//     const existingItem = cartItems[existingItemIndex];
//     const updatedItem = {
//       ...existingItem,
//       quantity: existingItem.quantity + 1,
//     };

//     const updatedItems = [...cartItems];
//     updatedItems[existingItemIndex] = updatedItem;

//     console.log('before', cartItems);
//     console.log('after', updatedItems);

//     return {
//       cartItems: updatedItems,
//     };
//   }

//   if (type === CART_ACTION_TYPES.REMOVE_CART_ITEM) {
//     console.log('REMOVE_CART_ITEM');
//     const newCartItems = [...cartItems];
//     const existingItem = newCartItems.find((item) => item.id === payload);

//     if (existingItem.quantity === 1) {
//       return newCartItems.filter((item) => item.id !== payload);
//     }

//     existingItem.quantity = existingItem.quantity - 1;

//     return { cartItems: newCartItems };
//   }

//   if (CART_ACTION_TYPES.CLEAR_CART_ITEM) {
//     console.log('CLEAR_CART_ITEM');
//     const newCartItems = cartItems.filter((item) => item.id !== payload);
//     return { cartItems: newCartItems };
//   }

//   console.log('default');
//   return state;
// };

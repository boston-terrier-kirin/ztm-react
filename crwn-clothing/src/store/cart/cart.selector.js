import { createSelector } from 'reselect';

const selectCartReducer = (state) => {
  return state.cart;
};

export const selectCartItems = createSelector(
  [selectCartReducer],
  (cart) => cart.cartItems
);

export const selectIsCartOpen = createSelector(
  [selectCartReducer],
  (cart) => cart.isCartOpen
);

export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((total, item) => {
    return total + item.quantity;
  }, 0)
);

export const selectCartTotal = createSelector([selectCartItems], (items) =>
  items.reduce((totalPrice, item) => {
    return totalPrice + item.quantity * item.price;
  }, 0)
);

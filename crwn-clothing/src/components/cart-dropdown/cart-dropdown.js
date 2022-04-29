import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import Button from '../button/botton';
import CartItem from '../cart-item/cart-item';
import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  const cartContext = useContext(CartContext);
  const cartItemsToRender = cartContext.cartItems.map((item) => (
    <CartItem key={item.id} cartItem={item} />
  ));

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">{cartItemsToRender}</div>
      <Button>CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;

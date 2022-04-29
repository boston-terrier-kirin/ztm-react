import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../contexts/cart.context';
import Button from '../button/botton';
import CartItem from '../cart-item/cart-item';
import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  const navigate = useNavigate();
  const cartContext = useContext(CartContext);
  const cartItemsToRender = cartContext.cartItems.map((item) => (
    <CartItem key={item.id} cartItem={item} />
  ));

  const gotoCheckoutHandler = () => {
    navigate('/checkout');
    cartContext.setIsCartOpen(false);
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">{cartItemsToRender}</div>
      <Button onClick={gotoCheckoutHandler}>CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;

import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from '../button/botton';
import CartItem from '../cart-item/cart-item';
import { selectCartItems } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';
import './cart-dropdown.styles.scss';

const CartDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const cartItemsToRender = cartItems.map((item) => (
    <CartItem key={item.id} cartItem={item} />
  ));

  const gotoCheckoutHandler = () => {
    navigate('/checkout');
    dispatch(setIsCartOpen(false));
  };

  return (
    <div className="cart-dropdown-container">
      <div className="cart-items">{cartItemsToRender}</div>
      <Button onClick={gotoCheckoutHandler}>CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;

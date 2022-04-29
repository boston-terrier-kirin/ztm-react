import { useContext } from 'react';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { CartContext } from '../../context/cart.context';
import './cart-icon.styles.scss';

const CartIcon = (props) => {
  const cartContext = useContext(CartContext);

  const toggleIsCartOpen = () => {
    cartContext.setIsCartOpen((current) => !current);
  };

  return (
    <div onClick={toggleIsCartOpen} className="cart-icon-container">
      <ShoppingIcon className="shopping-icon" />
      <span className="item-count">{cartContext.cartCount}</span>
    </div>
  );
};

export default CartIcon;
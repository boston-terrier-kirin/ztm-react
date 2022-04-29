import Button from '../button/botton';
import './cart-dropdown.styles.scss';

const CartDropdown = (props) => {
  return (
    <div className="cart-dropdown-container">
      <div className="cart-items"></div>
      <Button>GO TO CHECKOUT</Button>
    </div>
  );
};

export default CartDropdown;

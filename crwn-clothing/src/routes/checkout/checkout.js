import { useContext } from 'react';
import CheckoutItem from '../../components/checkout-item/checkout-item';
import { CartContext } from '../../context/cart.context';
import './checkout.styles.scss';

const Checkout = () => {
  const cartContext = useContext(CartContext);

  const cartItemsToRender = cartContext.cartItems.map((item) => (
    <CheckoutItem key={item.id} cartItem={item} />
  ));

  return (
    <div className="checkout-container">
      <div className="checkout-header">
        <div className="header-block">
          <span>Product</span>
        </div>
        <div className="header-block">
          <span>Description</span>
        </div>
        <div className="header-block">
          <span>Quantity</span>
        </div>
        <div className="header-block">
          <span>Price</span>
        </div>
        <div className="header-block">
          <span>Remove</span>
        </div>
      </div>
      {cartItemsToRender}
      <span className="total">Total: ${cartContext.total}</span>
    </div>
  );
};

export default Checkout;
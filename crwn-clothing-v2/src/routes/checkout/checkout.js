import { useSelector } from 'react-redux';
import CheckoutItem from '../../components/checkout-item/checkout-item';
import PaymentForm from '../../components/payment-form/payment-form';
import {
  selectCartItems,
  selectCartTotal,
} from '../../store/cart/cart.selector';
import './checkout.styles.scss';

const Checkout = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const cartItemsToRender = cartItems.map((item) => (
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
      <span className="total">Total: ${cartTotal}</span>
      <PaymentForm />
      <p>(4242 4242 4242 4242) (04/24) (424) (24242)</p>
    </div>
  );
};

export default Checkout;

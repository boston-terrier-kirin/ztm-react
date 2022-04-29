import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import './checkout-item.styles.scss';

const CheckoutItem = (props) => {
  const cartContext = useContext(CartContext);
  const { id, name, imageUrl, price, quantity } = props.cartItem;

  return (
    <div className="checkout-item-container">
      <div className="image-container">
        <img src={imageUrl} alt={name} />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div
          onClick={() => cartContext.removeItemFromCart(id)}
          className="arrow"
        >
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div
          onClick={() => cartContext.addItemToCart(props.cartItem)}
          className="arrow"
        >
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <span
        className="remove-button"
        onClick={() => cartContext.clearItemFromCart(id)}
      >
        &#10005;
      </span>
    </div>
  );
};

export default CheckoutItem;

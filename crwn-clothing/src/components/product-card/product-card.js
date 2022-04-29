import './product-card.styles.scss';
import Button from '../button/botton';
import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';

const ProductCard = (props) => {
  const { name, price, imageUrl } = props.product;
  const cartContext = useContext(CartContext);

  const addProductToCart = () => {
    cartContext.addItemToCart(props.product);
  };

  return (
    <div className="product-card-container">
      <img src={imageUrl} alt={name} />

      <div className="footer">
        <span className="name">{name}</span>
        <span className="price">{price}</span>
      </div>
      <Button onClick={addProductToCart} buttonType="inverted">
        Add to cart
      </Button>
    </div>
  );
};

export default ProductCard;

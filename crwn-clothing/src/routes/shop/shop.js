import { useContext } from 'react';
import { ProductsContext } from '../../context/products.context';
import ProductCard from '../../components/product-card/product-card';
import './shop.styles.scss';

const Shop = () => {
  const productsContext = useContext(ProductsContext);

  const shop = productsContext.products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));

  return <div className="products-container">{shop}</div>;
};

export default Shop;

import { Link } from 'react-router-dom';
import ProductCard from '../product-card/product-card';
import './category-preview.styles.scss';

const CategoryPreview = (props) => {
  const { title, products } = props;

  const categoryProducts = products
    .filter((_, index) => index < 4)
    .map((product) => <ProductCard key={product.id} product={product} />);

  return (
    <div className="category-preview-container">
      <h2>
        <Link to={title} className="title">
          {title.toUpperCase()}
        </Link>
      </h2>
      <div className="preview">{categoryProducts}</div>
    </div>
  );
};

export default CategoryPreview;

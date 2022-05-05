import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card';
import { selectCatetoriesMap } from '../../store/categories/category.selector';
import './category.styles.scss';

const Category = () => {
  const { category } = useParams();
  const categoriesMap = useSelector(selectCatetoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  const productsToRender =
    products &&
    products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));

  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      <div className="category-conteiner">{productsToRender}</div>
    </>
  );
};

export default Category;

import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../../components/product-card/product-card';
import { CategoriesContext } from '../../context/categories.context';
import './category.styles.scss';

const Category = () => {
  const { category } = useParams();
  const categoriesContext = useContext(CategoriesContext);

  const { categoriesMap } = categoriesContext;
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

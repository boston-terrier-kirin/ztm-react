import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  selectCatetoriesIsLoading,
  selectCatetoriesMap,
} from '../../store/categories/category.selector';
import ProductCard from '../../components/product-card/product-card';
import Spinner from '../../components/spinner/spinner';
import './category.styles.scss';

const Category = () => {
  const isLoading = useSelector(selectCatetoriesIsLoading);

  const { category } = useParams();
  const categoriesMap = useSelector(selectCatetoriesMap);
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  let contentsToRender;
  // 初回にhttp://localhost:3000/から各カテゴリからアクセスした場合に、productsがnullになっているようなので、!productsを追加。
  // isLoadingが終わって⇒レンダリング⇒productsがnull⇒useSelector(selectCatetoriesMap)でproductsに値が入る、の順になっているためと推測。
  if (isLoading || !products) {
    contentsToRender = <Spinner />;
  } else {
    const productsToRender = products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
    contentsToRender = (
      <div className="category-conteiner">{productsToRender}</div>
    );
  }

  return (
    <>
      <h2 className="category-title">{category.toUpperCase()}</h2>
      {contentsToRender}
    </>
  );
};

export default Category;

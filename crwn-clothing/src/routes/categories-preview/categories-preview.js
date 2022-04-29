import { useContext } from 'react';
import CategoryPreview from '../../components/category-preview/category-preview';
import { CategoriesContext } from '../../context/categories.context';

const CategoriesPreview = () => {
  const categoriesContext = useContext(CategoriesContext);
  const { categoriesMap } = categoriesContext;

  const shopToRender = Object.keys(categoriesMap).map((title) => (
    <CategoryPreview
      key={title}
      title={title}
      products={categoriesMap[title]}
    />
  ));

  return <>{shopToRender}</>;
};

export default CategoriesPreview;

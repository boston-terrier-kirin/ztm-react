import { useSelector } from 'react-redux';
import CategoryPreview from '../../components/category-preview/category-preview';
import { selectCatetoriesMap } from '../../store/categories/category.selector';

const CategoriesPreview = () => {
  const categoriesMap = useSelector(selectCatetoriesMap);

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

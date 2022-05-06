import { useSelector } from 'react-redux';
import CategoryPreview from '../../components/category-preview/category-preview';
import Spinner from '../../components/spinner/spinner';
import {
  selectCatetoriesIsLoading,
  selectCatetoriesMap,
} from '../../store/categories/category.selector';

const CategoriesPreview = () => {
  const isLoading = useSelector(selectCatetoriesIsLoading);
  const categoriesMap = useSelector(selectCatetoriesMap);

  if (isLoading) {
    return <Spinner />;
  }

  const contentsToRender = Object.keys(categoriesMap).map((title) => (
    <CategoryPreview
      key={title}
      title={title}
      products={categoriesMap[title]}
    />
  ));

  return <>{contentsToRender}</>;
};

export default CategoriesPreview;

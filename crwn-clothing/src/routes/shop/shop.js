import { Route, Routes } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview';
import Category from '../category/category';

import './shop.styles.scss';

const Shop = () => {
  return (
    <Routes>
      <Route index elements={<CategoriesPreview />} />
      <Route path=":category" elements={<Category />} />
    </Routes>
  );
};

export default Shop;

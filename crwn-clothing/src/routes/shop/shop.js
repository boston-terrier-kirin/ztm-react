import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { setCategories } from '../../store/categories/category.action';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import CategoriesPreview from '../categories-preview/categories-preview';
import Category from '../category/category';

import './shop.styles.scss';

const Shop = () => {
  console.log('💨', 'Shop/render');

  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      console.log('💨', 'Shop/useEffect');

      const categories = await getCategoriesAndDocuments();
      dispatch(setCategories(categories));
    };

    getCategories();
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;

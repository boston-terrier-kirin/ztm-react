import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { fetchCategoriesAsync } from '../../store/categories/category.action';
import CategoriesPreview from '../categories-preview/categories-preview';
import Category from '../category/category';

import './shop.styles.scss';

const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // redux-thunk適用前は、ここでfetchしていた。
    // const getCategories = async () => {
    //   const categories = await getCategoriesAndDocuments();
    //   dispatch(setCategories(categories));
    // };
    // getCategories();

    // redux-thunk適用後
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;

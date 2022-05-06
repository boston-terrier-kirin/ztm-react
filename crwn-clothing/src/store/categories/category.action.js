import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { CATEGORIES_ACTION_TYPES } from './category.types';

export const setCategories = (categories) => {
  return {
    type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
    payload: categories,
  };
};

export const fetchCategoriesStart = () => {
  return {
    type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START,
  };
};

export const fetchCategoriesSuccess = (categories) => {
  return {
    type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
    payload: categories,
  };
};

export const fetchCategoriesFailed = (error) => {
  return {
    type: CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
    payload: error,
  };
};

export const fetchCategoriesAsync = () => async (dispatch) => {
  dispatch(fetchCategoriesStart());

  try {
    const categories = await getCategoriesAndDocuments();
    dispatch(fetchCategoriesSuccess(categories));
  } catch (err) {
    dispatch(fetchCategoriesFailed(err));
  }
};

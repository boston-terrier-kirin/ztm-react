import { CATEGORIES_ACTION_TYPES } from './category.types';

export const setCategories = (categories) => {
  return {
    type: CATEGORIES_ACTION_TYPES.SET_CATEGORIES,
    payload: categories,
  };
};

// redux-saga適用後
// ShopでfetchCategoriesStartを呼び出す。
// 　↓
//     ★categoriesReducerのFETCH_CATEGORIES_STARTでisLoadingがtrueになる。
//     ★Category/CategoriesPreviewでuseSelectしているのでSpinnerを描画する。
// 　↓
// category.saga.onFetchCategoriesが呼ばれる。
// 　↓
// category.saga.fetchCategoriesAsyncが呼ばれる。
// 　↓
// fetchCategoriesSuccessが呼び戻される。
//   ↓
// categoriesReducerのFETCH_CATEGORIES_SUCCESSでcategoriesがセットされる。
//   ↓
// Category/CategoriesPreviewでuseSelectしているので、categoriesがセットされたことが検知できて、
// カテゴリーが描画される。

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

// redux-sagaに変更⇒category.saga.jsへ。
// export const fetchCategoriesAsync = () => async (dispatch) => {
//   dispatch(fetchCategoriesStart());
//   try {
//     const categories = await getCategoriesAndDocuments();
//     dispatch(fetchCategoriesSuccess(categories));
//   } catch (err) {
//     dispatch(fetchCategoriesFailed(err));
//   }
// };

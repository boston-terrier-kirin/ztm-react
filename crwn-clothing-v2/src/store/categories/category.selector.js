import { createSelector } from 'reselect';

/**
 * メモ化していれば、SING OUTのタイミングで呼ばれるのはここだけ。
 */
const selectCategoryReducer = (state) => {
  return state.categories;
};

const selectCatetories = createSelector(
  [selectCategoryReducer],
  (categorySlice) => {
    return categorySlice.categories;
  }
);

export const selectCatetoriesMap = createSelector(
  [selectCatetories],
  (categories) => {
    const categoriesMap = categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});

    return categoriesMap;
  }
);

export const selectCatetoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categorySlice) => {
    return categorySlice.isLoading;
  }
);

/**
 * メモ化しないと、SING OUTしただけでも、Categoryがre-renderingされてしまう。
 */
// export const selectCatetoriesMap = (state) => {
//   const categoriesMap = state.categories.categories.reduce((acc, category) => {
//     const { title, items } = category;
//     acc[title.toLowerCase()] = items;
//     return acc;
//   }, {});
//   return categoriesMap;
// };

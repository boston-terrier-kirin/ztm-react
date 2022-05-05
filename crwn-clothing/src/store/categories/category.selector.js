import { createSelector } from 'reselect';

/**
 * メモ化していれば、SING OUTのタイミングで呼ばれるのはここだけ。
 */
const selectCategoryReducer = (state) => {
  console.log('💤', 'selectCategoryReducer');
  return state.categories;
};

const selectCatetories = createSelector(
  [selectCategoryReducer],
  (categorySlice) => {
    console.log('💤', 'selectCatetories');
    return categorySlice.categories;
  }
);

export const selectCatetoriesMap = createSelector(
  [selectCatetories],
  (categories) => {
    console.log('💨', 'selectCatetoriesMap');

    const categoriesMap = categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});

    return categoriesMap;
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

export const selectCatetoriesMap = (state) => {
  const categoriesMap = state.categories.categories.reduce((acc, category) => {
    const { title, items } = category;
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoriesMap;
};

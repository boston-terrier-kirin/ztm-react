import './categories.styles.scss';

const App = () => {
  const categories = [
    {
      id: 1,
      title: 'Hats',
    },
    {
      id: 2,
      title: 'Jackets',
    },
    {
      id: 3,
      title: 'Sneakers',
    },
    {
      id: 4,
      title: 'Women',
    },
    {
      id: 5,
      title: 'Men',
    },
  ];

  const renderCategory = categories.map((category) => {
    return (
      <div key={category.id} className="category-container">
        <div className="background-image"></div>
        <div className="category-body-container">
          <h2>{category.title}</h2>
          <p>Shop Now</p>
        </div>
      </div>
    );
  });

  return <div className="categories-container">{renderCategory}</div>;
};

export default App;

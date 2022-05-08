import { useNavigate } from 'react-router-dom';
import './directory-item.styles.scss';

const DirectoryItem = (props) => {
  const { category } = props;
  const navigate = useNavigate();

  const onNavigateHandler = () => {
    navigate(category.route);
  };

  return (
    <div onClick={onNavigateHandler} className="directory-item-container">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${category.imageUrl})` }}
      />
      <div className="directory-item-body">
        <h2>{category.title}</h2>
        <p>Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;

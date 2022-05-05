import './card.styles.css';

const Card = (props) => {
  const { imageUrl, title, description } = props;
  return (
    <div className="card-container">
      <img src={imageUrl} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Card;

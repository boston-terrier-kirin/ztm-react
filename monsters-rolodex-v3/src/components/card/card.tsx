import './card.styles.css';

interface ICardProps {
  title: string;
  description: string;
  imageUrl: string;
}

const Card = (props: ICardProps) => {
  const { title, description, imageUrl } = props;
  return (
    <div className="card-container">
      <img src={imageUrl} alt={title} />
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
};

export default Card;

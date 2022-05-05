import React from 'react';
import './card.styles.css';

class Card extends React.Component {
  render() {
    const { imageUrl, title, description } = this.props;
    return (
      <div className="card-container">
        <img src={imageUrl} alt={title} />
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
    );
  }
}

export default Card;

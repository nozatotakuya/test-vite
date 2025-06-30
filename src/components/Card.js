import React from 'react';
import './Card.css';

const Card = ({ title, content, image, onClick, variant = 'default' }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`card card--${variant}`}
      onClick={handleClick}
      data-testid="card"
    >
      {image && (
        <div className="card__image">
          <img src={image} alt={title} />
        </div>
      )}
      <div className="card__content">
        {title && <h3 className="card__title">{title}</h3>}
        {content && <p className="card__text">{content}</p>}
      </div>
    </div>
  );
};

export default Card;

import React from 'react';
import './Button.css';

const Button = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  size = 'medium',
}) => {
  const handleClick = (e) => {
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <button
      className={`button button--${variant} button--${size}`}
      onClick={handleClick}
      disabled={disabled}
      data-testid="button"
    >
      {children}
    </button>
  );
};

export default Button;

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Card from '../Card';

describe('Card Component', () => {
  test('renders card with title and content', () => {
    render(<Card title="Test Title" content="Test content for the card" />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test content for the card')).toBeInTheDocument();
  });

  test('renders card without title and content', () => {
    render(<Card />);
    const card = screen.getByTestId('card');
    expect(card).toBeInTheDocument();
    expect(card).toHaveClass('card--default');
  });

  test('calls onClick when card is clicked', () => {
    const handleClick = jest.fn();
    render(<Card title="Clickable Card" onClick={handleClick} />);

    const card = screen.getByTestId('card');
    fireEvent.click(card);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('renders image when image prop is provided', () => {
    const testImage = 'https://example.com/test-image.jpg';
    render(<Card title="Card with Image" image={testImage} />);

    const image = screen.getByAltText('Card with Image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', testImage);
  });

  test('applies correct variant class', () => {
    render(<Card title="Highlighted Card" variant="highlighted" />);

    const card = screen.getByTestId('card');
    expect(card).toHaveClass('card--highlighted');
  });

  test('does not render image when image prop is not provided', () => {
    render(<Card title="Card without Image" />);

    const card = screen.getByTestId('card');
    const images = card.querySelectorAll('img');
    expect(images).toHaveLength(0);
  });
});

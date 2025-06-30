import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../Button';

describe('Button Component', () => {
  test('renders button with correct text', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByTestId('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Click me');
  });

  test('calls onClick when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    const button = screen.getByTestId('button');
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('does not call onClick when disabled', () => {
    const handleClick = jest.fn();
    render(
      <Button onClick={handleClick} disabled>
        Click me
      </Button>
    );

    const button = screen.getByTestId('button');
    fireEvent.click(button);

    expect(handleClick).not.toHaveBeenCalled();
    expect(button).toBeDisabled();
  });

  test('applies correct variant class', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('button--secondary');
  });

  test('applies correct size class', () => {
    render(<Button size="large">Large Button</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('button--large');
  });

  test('has default variant and size when not specified', () => {
    render(<Button>Default Button</Button>);
    const button = screen.getByTestId('button');
    expect(button).toHaveClass('button--primary');
    expect(button).toHaveClass('button--medium');
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from '../Input';

describe('Input Component', () => {
  test('renders input with placeholder', () => {
    render(<Input placeholder="Enter your name" />);
    const input = screen.getByTestId('input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'Enter your name');
  });

  test('renders input with label', () => {
    render(<Input label="Name" />);
    expect(screen.getByText('Name')).toBeInTheDocument();
  });

  test('shows required asterisk when required prop is true', () => {
    render(<Input label="Email" required />);
    const requiredAsterisk = screen.getByText('*');
    expect(requiredAsterisk).toBeInTheDocument();
    expect(requiredAsterisk).toHaveClass('input__required');
  });

  test('calls onChange when value changes', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} />);

    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'test value' } });

    expect(handleChange).toHaveBeenCalledWith('test value');
  });

  test('does not call onChange when disabled', () => {
    const handleChange = jest.fn();
    render(<Input onChange={handleChange} disabled />);

    const input = screen.getByTestId('input');
    fireEvent.change(input, { target: { value: 'test value' } });

    expect(handleChange).not.toHaveBeenCalled();
    expect(input).toBeDisabled();
  });

  test('displays error message when error prop is provided', () => {
    const errorMessage = 'This field is required';
    render(<Input error={errorMessage} />);

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    expect(screen.getByText(errorMessage)).toHaveClass('input__error-message');
  });

  test('applies error class when error prop is provided', () => {
    render(<Input error="Error message" />);
    const input = screen.getByTestId('input');
    expect(input).toHaveClass('input--error');
  });

  test('applies focused class when input is focused', () => {
    render(<Input />);
    const input = screen.getByTestId('input');

    fireEvent.focus(input);
    expect(input).toHaveClass('input--focused');

    fireEvent.blur(input);
    expect(input).not.toHaveClass('input--focused');
  });

  test('has correct default type', () => {
    render(<Input />);
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('type', 'text');
  });

  test('applies custom type when provided', () => {
    render(<Input type="email" />);
    const input = screen.getByTestId('input');
    expect(input).toHaveAttribute('type', 'email');
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Form from './Form';

describe('Form', () => {
  it('renders inputs and calls onAdd', () => {
    const onAdd = vi.fn();
    render(<Form onAdd={onAdd} />);
    fireEvent.change(screen.getByTestId(/name/i), { target: { value: 'Test' } });
    fireEvent.change(screen.getByTestId(/regex/i), { target: { value: '\\d+' } });
    fireEvent.click(screen.getByRole('button'));
    expect(onAdd).toHaveBeenCalled();
  });
});
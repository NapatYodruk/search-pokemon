// __tests__/Home.test.tsx
import '@testing-library/jest-dom';
import React from 'react'; // Add this line
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '../page';

jest.mock('../components/PokemonListQuery', () => ({
  __esModule: true,
  default: jest.fn(() => <div>Mocked PokemonListQuery</div>),
}));

describe('HomePage', () => {
  it('renders the HomePage component', () => {
    render(<HomePage />);
    expect(screen.getByText(/Search Pokemon/i)).toBeInTheDocument();
  });

  it('opens and closes the PokemonPopup', async () => {
    render(<HomePage />);
    
    // Mocking the fetchNames function
    const mockFetchNames = jest.fn();
    jest.spyOn(React, 'useState').mockReturnValueOnce([[], mockFetchNames]);

    // Trigger the opening of the PokemonPopup
    fireEvent.click(screen.getByText(/Mocked PokemonListQuery/i));

    // Check if the PokemonPopup is rendered
    expect(screen.getByText(/Search Pokemon/i)).toBeInTheDocument();

    // Trigger the closing of the PokemonPopup
    fireEvent.click(screen.getByText(/Close Popup/i));

    // Check if the PokemonPopup is closed
    await waitFor(() => {
      expect(screen.queryByText(/Search Pokemon/i)).not.toBeInTheDocument();
    });
  });

  // Add more test cases based on your component's behavior
});

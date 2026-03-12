import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../context/ThemeContext';
import { AuthProvider } from '../context/AuthContext';
import App from '../App';

test('renders VedaMind navbar', () => {
  render(
    <MemoryRouter>
      <ThemeProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </ThemeProvider>
    </MemoryRouter>
  );
  expect(screen.getAllByText(/VedaMind/i).length).toBeGreaterThan(0);
});

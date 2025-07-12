import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../context/AuthContext';
import RoleSelection from '../RoleSelection';

const MockAuthProvider = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <AuthProvider>
      {children}
    </AuthProvider>
  </BrowserRouter>
);

describe('RoleSelection', () => {
  test('renders all role options', () => {
    render(
      <MockAuthProvider>
        <RoleSelection />
      </MockAuthProvider>
    );

    expect(screen.getByText('Student')).toBeInTheDocument();
    expect(screen.getByText('Teacher')).toBeInTheDocument();
    expect(screen.getByText('Content Creator')).toBeInTheDocument();
    expect(screen.getByText('Investor')).toBeInTheDocument();
    expect(screen.getByText('Entrepreneur')).toBeInTheDocument();
  });

  test('allows role selection', () => {
    render(
      <MockAuthProvider>
        <RoleSelection />
      </MockAuthProvider>
    );

    const studentCard = screen.getByText('Student').closest('button');
    fireEvent.click(studentCard!);
    
    expect(studentCard).toHaveClass('border-primary');
  });

  test('shows error when trying to continue without selection', async () => {
    render(
      <MockAuthProvider>
        <RoleSelection />
      </MockAuthProvider>
    );

    const continueButton = screen.getByText('Continuer');
    fireEvent.click(continueButton);

    await waitFor(() => {
      expect(screen.getByText('Veuillez sélectionner un rôle pour continuer')).toBeInTheDocument();
    });
  });

  test('renders welcome message', () => {
    render(
      <MockAuthProvider>
        <RoleSelection />
      </MockAuthProvider>
    );

    expect(screen.getByText(/Bienvenue sur/)).toBeInTheDocument();
    expect(screen.getByText(/AyanBridge/)).toBeInTheDocument();
  });
});
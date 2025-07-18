import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LearnHubPage from './pages/LearnHubPage';
import MarketplacePage from './pages/MarketplacePage';
import InvestorClubPage from './pages/InvestorClubPage';
import StudioPage from './pages/StudioPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import RoleSelectionPage from './pages/RoleSelectionPage';
import EbooksPage from './pages/magasin/EbooksPage';
import VideosPage from './pages/magasin/VideosPage';
import LivesPage from './pages/magasin/LivesPage';
import FormationPage from './pages/magasin/FormationPage';
import MainLayout from './layout/MainLayout';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import AuthRedirect from './components/AuthRedirect';

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Auth pages - full screen without layout */}
          <Route path="/login" element={
            <AuthRedirect>
              <LoginPage />
            </AuthRedirect>
          } />
          <Route path="/signup" element={
            <AuthRedirect>
              <SignUpPage />
            </AuthRedirect>
          } />
          
          {/* Role Selection - requires auth but not role */}
          <Route path="/role-selection" element={
            <ProtectedRoute requireRole={false}>
              <RoleSelectionPage />
            </ProtectedRoute>
          } />
          
          {/* Protected Dashboard Route */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } />
          
          {/* Main app routes with layout */}
          <Route path="/" element={
            <MainLayout>
              <HomePage />
            </MainLayout>
          } />
          <Route path="/learn" element={
            <MainLayout>
              <LearnHubPage />
            </MainLayout>
          } />
          <Route path="/marketplace" element={
            <MainLayout>
              <MarketplacePage />
            </MainLayout>
          } />
          <Route path="/invest" element={
            <MainLayout>
              <InvestorClubPage />
            </MainLayout>
          } />
          <Route path="/studio" element={
            <MainLayout>
              <StudioPage />
            </MainLayout>
          } />
          
          {/* Magasin routes */}
          <Route path="/magasin/ebooks" element={
            <MainLayout>
              <EbooksPage />
            </MainLayout>
          } />
          <Route path="/magasin/videos" element={
            <MainLayout>
              <VideosPage />
            </MainLayout>
          } />
          <Route path="/magasin/lives" element={
            <MainLayout>
              <LivesPage />
            </MainLayout>
          } />
          <Route path="/magasin/formation" element={
            <MainLayout>
              <FormationPage />
            </MainLayout>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App

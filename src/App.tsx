import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LearnHubPage from './pages/LearnHubPage';
import MarketplacePage from './pages/MarketplacePage';
import InvestorClubPage from './pages/InvestorClubPage';
import StudioPage from './pages/StudioPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import MainLayout from './layout/MainLayout';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Auth pages - full screen without layout */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        
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
      </Routes>
    </Router>
  );
}

export default App

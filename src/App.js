import { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/auth/LoginPage';
import OnboardingPage from './components/auth/OnboardingPage';
import FarmMappingPage from './components/farm/FarmMappingPage';
import DashboardPage from './components/dashboard/DashboardPage';
import EcoPracticePage from './components/practice/EcoPracticePage';
import ProofUploadPage from './components/proof/ProofUploadPage';
import CarbonCreditsPage from './components/credits/CarbonCreditsPage';
import MarketplacePage from './components/marketplace/MarketplacePage';
import { setCurrentUser as setGlobalCurrentUser } from './data/dataStore';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('landing'); // landing, login, onboarding, etc.
  const [currentUser, setCurrentUser] = useState(null);

  const handleGetStarted = () => {
    setCurrentPage('login');
  };

  const handleLogin = (userData, isNewUser) => {
    setCurrentUser(userData);
    setGlobalCurrentUser(userData);
    
    if (isNewUser) {
      setCurrentPage('onboarding');
    } else {
      setCurrentPage('dashboard');
    }
  };

  const handleOnboardingComplete = (userData) => {
    const updatedUser = { ...currentUser, ...userData };
    setCurrentUser(updatedUser);
    setGlobalCurrentUser(updatedUser);
    setCurrentPage('farm-mapping');
  };

  const handleFarmMappingComplete = () => {
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page) => {
    setCurrentPage(page);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setGlobalCurrentUser(null);
    setCurrentPage('landing');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'landing':
        return <LandingPage onGetStarted={handleGetStarted} />;
      
      case 'login':
        return <LoginPage onLogin={handleLogin} onBack={() => setCurrentPage('landing')} />;
      
      case 'onboarding':
        return <OnboardingPage userData={currentUser} onComplete={handleOnboardingComplete} />;
      
      case 'farm-mapping':
        return <FarmMappingPage onComplete={handleFarmMappingComplete} isFromDashboard={false} />;
      
      case 'dashboard':
        return <DashboardPage onNavigate={handleNavigate} onLogout={handleLogout} />;
      
      case 'practice':
        return <EcoPracticePage onBack={() => handleNavigate('dashboard')} />;
      
      case 'proof-upload':
        return <ProofUploadPage onBack={() => handleNavigate('dashboard')} />;
      
      case 'credits':
        return <CarbonCreditsPage onBack={() => handleNavigate('dashboard')} />;
      
      case 'marketplace':
        return <MarketplacePage onBack={() => handleNavigate('dashboard')} />;
      
      default:
        return <LandingPage onGetStarted={handleGetStarted} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
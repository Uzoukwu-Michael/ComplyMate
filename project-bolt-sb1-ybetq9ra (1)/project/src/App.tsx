import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import ContractBuilder from './components/ContractBuilder';
import Onboarding from './components/Onboarding';
import LandingPage from './components/LandingPage';
import { User } from './types';
import { 
  mockUser, 
  mockContracts, 
  mockDocuments, 
  mockNotifications, 
  mockComplianceItems,
  mockContractTemplates
} from './data/mockData';

type AppPage = 
  | 'landing'
  | 'onboarding' 
  | 'dashboard' 
  | 'contracts' 
  | 'documents' 
  | 'compliance' 
  | 'notifications'
  | 'settings'
  | 'profile'
  | 'upgrade'
  | 'help'
  | 'login';

function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [isOnboarded, setIsOnboarded] = useState(false);

  // Check if user is returning (simulate with localStorage)
  useEffect(() => {
    const savedUser = localStorage.getItem('complymate_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsOnboarded(true);
      setCurrentPage('dashboard');
    }
  }, []);

  const handleGetStarted = () => {
    setCurrentPage('onboarding');
  };

  const handleOnboardingComplete = (userData: Partial<User>) => {
    const newUser: User = {
      ...mockUser,
      ...userData
    };
    setUser(newUser);
    setIsOnboarded(true);
    localStorage.setItem('complymate_user', JSON.stringify(newUser));
    setCurrentPage('dashboard');
  };

  const handleNavigate = (page: string) => {
    if (page === 'login') {
      localStorage.removeItem('complymate_user');
      setUser(null);
      setIsOnboarded(false);
      setCurrentPage('landing');
    } else {
      setCurrentPage(page as AppPage);
    }
  };

  const unreadNotifications = mockNotifications.filter(n => !n.read).length;

  // Landing page for non-authenticated users
  if (!isOnboarded && currentPage === 'landing') {
    return <LandingPage onGetStarted={handleGetStarted} />;
  }

  // Onboarding flow
  if (!isOnboarded && currentPage === 'onboarding') {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Main application for authenticated users
  if (!user) return null;

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <Dashboard
            contracts={mockContracts}
            documents={mockDocuments}
            notifications={mockNotifications}
            complianceItems={mockComplianceItems}
            onNavigate={handleNavigate}
          />
        );
      case 'contracts':
        return (
          <ContractBuilder
            templates={mockContractTemplates}
            onNavigate={handleNavigate}
          />
        );
      case 'documents':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Document Center</h1>
            <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
              <p className="text-gray-600">Document management interface coming soon...</p>
            </div>
          </div>
        );
      case 'compliance':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Compliance Center</h1>
            <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
              <p className="text-gray-600">Compliance tracking interface coming soon...</p>
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
            <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
              <p className="text-gray-600">Notification center coming soon...</p>
            </div>
          </div>
        );
      case 'upgrade':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Upgrade to Pro</h1>
            <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
              <p className="text-gray-600">Upgrade interface coming soon...</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
            <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
              <p className="text-gray-600">Settings interface coming soon...</p>
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Profile Settings</h1>
            <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
              <p className="text-gray-600">Profile settings coming soon...</p>
            </div>
          </div>
        );
      case 'help':
        return (
          <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">Help & Support</h1>
            <div className="bg-white rounded-xl p-8 border border-gray-200 text-center">
              <p className="text-gray-600">Help center coming soon...</p>
            </div>
          </div>
        );
      default:
        return (
          <Dashboard
            contracts={mockContracts}
            documents={mockDocuments}
            notifications={mockNotifications}
            complianceItems={mockComplianceItems}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        user={user} 
        notificationCount={unreadNotifications}
        onNavigate={handleNavigate}
      />
      <div className="flex">
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
        <main className="flex-1 p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;
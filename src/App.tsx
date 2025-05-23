import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from './context/ThemeContext';
import { LocationProvider } from './context/LocationContext';
import { InventoryProvider } from './context/InventoryContext';
import { AnalyticsProvider } from './context/AnalyticsContext';
import { MatchingProvider } from './context/MatchingContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import DashboardPage from './pages/DashboardPage';
import DonationPage from './pages/DonationPage';
import InventoryPage from './pages/InventoryPage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';
import LogisticsPage from './pages/LogisticsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import AvailableDonationsPage from './pages/AvailableDonationsPage';
import SettingsPage from './pages/SettingsPage';

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/auth" />;
  }

  return <>{children}</>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return <>{children}</>;
};

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LocationProvider>
          <InventoryProvider>
            <AnalyticsProvider>
              <MatchingProvider>
                <AuthProvider>
                  <Router>
                    <Routes>
                      <Route path="/auth" element={
                        <PublicRoute>
                          <AuthPage />
                        </PublicRoute>
                      } />
                      
                      <Route path="/" element={
                        <ProtectedRoute>
                          <Layout />
                        </ProtectedRoute>
                      }>
                        <Route index element={<HomePage />} />
                        <Route path="dashboard" element={<DashboardPage />} />
                        <Route path="donate" element={<DonationPage />} />
                        <Route path="available-donations" element={<AvailableDonationsPage />} />
                        <Route path="inventory" element={<InventoryPage />} />
                        <Route path="logistics" element={<LogisticsPage />} />
                        <Route path="analytics" element={<AnalyticsPage />} />
                        <Route path="profile" element={<ProfilePage />} />
                        <Route path="settings" element={<SettingsPage />} />
                        <Route path="*" element={<NotFoundPage />} />
                      </Route>
                    </Routes>
                  </Router>
                </AuthProvider>
              </MatchingProvider>
            </AnalyticsProvider>
          </InventoryProvider>
        </LocationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
// src/App.jsx
import { useCallback, useState } from 'react';
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router-dom';

import Header from './components/Header.jsx';
import Navbar from './components/Navbar.jsx';
import LoginModal from './components/LoginModal.jsx';

import WelcomePage from './pages/WelcomePage.jsx';
import TodayPage from './pages/TodayPage.jsx';
import MapPage from './pages/MapPage.jsx';
import SchedulePage from './pages/SchedulePage.jsx';
import RoutePage from './pages/RoutePage.jsx';
import SecurityPage from './pages/SecurityPage.jsx';

import { ROUTES } from './constants/routes.js';
import { getStoredSession, saveSession, signOut } from './services/authService.js';

function RequireSession({ session }) {
  return session ? <Outlet /> : <Navigate to={ROUTES.WELCOME} replace />;
}

function AppShell({ session, onSignIn, onSignOut }) {
  return (
    <div className="app-shell">
      <Header session={session} onSignIn={onSignIn} onSignOut={onSignOut} />
      <main className="app-main">
        <Outlet />
      </main>
      <Navbar />
    </div>
  );
}

export default function App() {
  const navigate = useNavigate();
  const [session, setSession] = useState(getStoredSession);
  const [loginOpen, setLoginOpen] = useState(false);

  const openLogin = useCallback(() => setLoginOpen(true), []);
  const closeLogin = useCallback(() => setLoginOpen(false), []);

  const startSession = (next) => {
    saveSession(next);
    setSession(next);
    setLoginOpen(false);
    navigate(ROUTES.TODAY);
  };

  const handleLoginSuccess = (user) => startSession({ user, guest: false });
  const handleGuest = () => startSession({ user: null, guest: true });

  const handleSignOut = async () => {
    await signOut();
    setSession(null);
    navigate(ROUTES.WELCOME);
  };

  return (
    <div style={frameStyles.browserWrapper}>
      <div style={frameStyles.mobileFrame}>
        <Routes>
          <Route
            path={ROUTES.WELCOME}
            element={
              session ? (
                <Navigate to={ROUTES.TODAY} replace />
              ) : (
                <WelcomePage onOpenLogin={openLogin} onGuest={handleGuest} />
              )
            }
          />

          <Route element={<RequireSession session={session} />}>
            <Route
              element={
                <AppShell session={session} onSignIn={openLogin} onSignOut={handleSignOut} />
              }
            >
              <Route path={ROUTES.TODAY} element={<TodayPage />} />
              <Route path={ROUTES.MAP} element={<MapPage />} />
              <Route path={ROUTES.SCHEDULE} element={<SchedulePage />} />
              <Route path={ROUTES.ROUTE} element={<RoutePage />} />
              <Route path={ROUTES.SECURITY} element={<SecurityPage />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to={ROUTES.WELCOME} replace />} />
        </Routes>

        <LoginModal isOpen={loginOpen} onClose={closeLogin} onSuccess={handleLoginSuccess} />
      </div>
    </div>
  );
}

const frameStyles = {
  browserWrapper: {
    backgroundColor: '#18181b',
    minHeight: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
    padding: '20px',
    boxSizing: 'border-box',
  },
  mobileFrame: {
    width: '100%',
    maxWidth: '410px',
    height: '840px',
    backgroundColor: '#000000',
    color: '#ffffff',
    borderRadius: '24px',
    boxShadow: '0 25px 60px rgba(0, 0, 0, 0.6)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box',
  },
};
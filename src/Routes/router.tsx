import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../MainLayout';
import About from '../components/About/About';
import ContactUs from '../components/ContactUs/ContactUs';
import GetStart from '../components/GetStart/GetStart';
import Home from '../components/Home/Home';
import ProtectedRoute from '../components/ProtectedRoute';
import { AuthProvider } from '../context/AuthContext';
import Deactivated from '../pages/Deactivated';
import Login from '../pages/Login';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';
import Unauthorized from '../pages/Unauthorized';
import Dashboard from '../pages/admin/Dashboard';
import EligibilityChecksPage from '../pages/admin/EligibilityChecksPage';
import Invitations from '../pages/admin/Invitations';
import Participants from '../pages/admin/Participants';
import ErrorBoundary from './ErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <AuthProvider>
          <MainLayout />
        </AuthProvider>
      </ErrorBoundary>
    ),
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/apply-now',
        element: <GetStart />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/privacy',
        element: <Privacy />,
      },
      {
        path: '/terms',
        element: <Terms />,
      },
      {
        path: '/contact-us',
        element: <ContactUs />,
      },
    ],
  },
  {
    path: '/login',
    element: (
      <ErrorBoundary>
        <AuthProvider>
          <Login />
        </AuthProvider>
      </ErrorBoundary>
    ),
  },
  {
    path: '/admin/dashboard',
    element: (
      <ErrorBoundary>
        <AuthProvider>
          <ProtectedRoute requireAdmin>
            <Dashboard />
          </ProtectedRoute>
        </AuthProvider>
      </ErrorBoundary>
    ),
  },
  {
    path: '/admin/participants',
    element: (
      <ErrorBoundary>
        <AuthProvider>
          <ProtectedRoute requireAdmin>
            <Participants />
          </ProtectedRoute>
        </AuthProvider>
      </ErrorBoundary>
    ),
  },
  {
    path: '/admin/invitations',
    element: (
      <ErrorBoundary>
        <AuthProvider>
          <ProtectedRoute requireAdmin>
            <Invitations />
          </ProtectedRoute>
        </AuthProvider>
      </ErrorBoundary>
    ),
  },
  {
    path: '/admin/eligibility-checks',
    element: (
      <ErrorBoundary>
        <AuthProvider>
          <ProtectedRoute requireAdmin>
            <EligibilityChecksPage />
          </ProtectedRoute>
        </AuthProvider>
      </ErrorBoundary>
    ),
  },
  {
    path: '/unauthorized',
    element: (
      <ErrorBoundary>
        <AuthProvider>
          <Unauthorized />
        </AuthProvider>
      </ErrorBoundary>
    ),
  },
  {
    path: '/deactivated',
    element: (
      <ErrorBoundary>
        <AuthProvider>
          <Deactivated />
        </AuthProvider>
      </ErrorBoundary>
    ),
  },
]);

export default router;

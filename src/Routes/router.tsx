import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../MainLayout';
import GetStart from '../components/GetStart/GetStart';
import Home from '../components/Home/Home';
import AboutPage from '../pages/About';
import ErrorBoundary from './ErrorBoundary';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ErrorBoundary>
        <MainLayout />
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
        element: <AboutPage />,
      },
    ],
  },
]);

export default router;

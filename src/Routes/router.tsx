import {createBrowserRouter} from 'react-router-dom';
import MainLayout from '../MainLayout';
import Home from '../components/Home/Home';
import GetStart from '../components/GetStart/GetStart';
import ErrorBoundary from './ErrorBoundary';


const router = createBrowserRouter([
    {
        path: '/',
        element: <ErrorBoundary><MainLayout /></ErrorBoundary> ,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/apply-now',
                element: <GetStart />
            }
        ]
    }
]);

export default router;
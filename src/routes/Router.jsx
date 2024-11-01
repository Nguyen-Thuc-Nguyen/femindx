import { createHashRouter } from 'react-router-dom';
import DefaultLayout from '../pages/defaultlayout/DefaultLayout';
import Login from '../pages/login/Login';
import Dashboard from '../pages/dashboard/Dashboard';
import AddStudent from '../pages/addstudent/Addstudent';
import NotFound from '../pages/notfound/Notfound';

export const router = createHashRouter([
    {
        path: '/',
        element: <Login />,
    },
    {
        path: '/default',
        element: <DefaultLayout />,
        children: [
            {
                index: true,
                path: '',
                element: <Dashboard />,
            },
            {
                path: 'addnewstudent',
                element: <AddStudent />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
    {
        path: '*',
        element: <NotFound />,
    }
]);

import { createBrowserRouter } from 'react-router-dom'
import DefaultLayout from '../pages/defaultlayout/DefaultLayout'
import Login from '../pages/login/Login'
import Dashboard from '../pages/dashboard/Dashboard'
import Addstudent from '../pages/addstudent/Addstudent'
import NotFound from '../pages/notfound/Notfound'

export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/',
        element: <DefaultLayout />,
        children: [
            {
                path: '',
                element: <Dashboard />,
            },
            {
                path: 'addnewstudent',
                element: <Addstudent />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ],
    },
])

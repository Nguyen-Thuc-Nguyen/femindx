import { createHashRouter } from 'react-router-dom'
import DefaultLayout from '../pages/defaultlayout/DefaultLayout'
import Login from '../pages/login/Login'
import Dashboard from '../pages/dashboard/Dashboard'
import AddStudent from '../pages/addstudent/Addstudent'
import NotFound from '../pages/notfound/Notfound'
import Addteacher from '../pages/addteacher/Addteacher'
import ClassManage from '../pages/classManage/ClassManage'

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
                path: 'student',
                element: <AddStudent />,
            },
            {
                path: 'teacher',
                element: <Addteacher />,
            },
            {
                path: 'class',
                element: <ClassManage />,
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
    },
])

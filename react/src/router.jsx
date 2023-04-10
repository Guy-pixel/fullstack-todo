import {createBrowserRouter} from "react-router-dom";
import {Navigate} from "react-router-dom";
import Signup from "./views/Signup";
import Login from "./views/Login";
import NotFound from "./views/NotFound";
import Tasks from "./views/Tasks";
import DefaultLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout.jsx";
import Dashboard from "./views/Dashboard";

const router = createBrowserRouter([
    {
        path:'/',
        element:<DefaultLayout/>,
        children:[
            {
                path:'/',
                element: <Navigate to="/tasks" />
            },
            {
                path:'/dashboard',
                element:<Dashboard/>
            },
            {
                path:'/tasks',
                element:<Tasks/>
            },
        ]
    },
    {
        path:'/',
        element:<GuestLayout/>,
        children:[
            {
                path:'/login',
                element: <Login/>
            },
            {
                path:'/signup',
                element: <Signup/>
            },
        ]
    },
    {
        path:'*',
        element:<NotFound/>
    },
])

export default router;

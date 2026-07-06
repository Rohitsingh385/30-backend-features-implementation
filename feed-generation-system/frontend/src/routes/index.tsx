import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login"
import Register from "../pages/Register"
import Dashboard from "../pages/Dashboard"
import ProtectedRoute from "./ProtectedRoute";
import Feed from "../pages/Feed";
import User from "../pages/User";
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        )
    },
    {
        path: '/feed',
        element: (
            <ProtectedRoute>
                <Feed />
            </ProtectedRoute>
        )
    }, {
        path: '/users',
        element: (
            <ProtectedRoute>
                <User/>
            </ProtectedRoute>
        )
    }
])
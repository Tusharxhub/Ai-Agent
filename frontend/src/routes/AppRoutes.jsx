import React, { Suspense, lazy } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import UserAuth from '../auth/UserAuth.jsx'

const Login = lazy(() => import('../screens/Login.jsx'))
const Register = lazy(() => import('../screens/Register.jsx'))
const Home = lazy(() => import('../screens/Home.jsx'))
const Project = lazy(() => import('../screens/Project.jsx'))

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path="/" element={<UserAuth><Home /></UserAuth>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/project/:projectId" element={<UserAuth><Project /></UserAuth>} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default AppRoutes
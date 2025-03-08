import React, { Suspense, lazy } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import UserAuth from '../auth/UserAuth'

const Login = lazy(() => import('../screens/Login'))
const Register = lazy(() => import('../screens/Register'))
const Home = lazy(() => import('../screens/Home'))
const Project = lazy(() => import('../screens/Project'))

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
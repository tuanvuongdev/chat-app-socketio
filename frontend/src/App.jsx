import React, { useEffect } from 'react'
import Navbar from './components/Navbar'

import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import SettingsPage from './pages/SettingsPage'
import ProfilePage from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore'

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();
  const { theme } = useThemeStore();

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  console.log({ authUser }, isCheckingAuth);

  if (isCheckingAuth && !authUser) {
    return <div className='flex h-screen items-center justify-center'>
      <span className="loading loading-spinner w-[70px]"></span>
    </div>
  }

  return (
    <div data-theme={theme}>

      <Navbar />

      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/singup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster toastOptions={{
      }} />
    </div>
  )
}

export default App
import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar.js'
import Auth from './components/Auth.js'
import Profile from './components/Profile.js'
import Public from './components/Public.js'
import ProtectedRoute from './components/ProtectedRoute'
import { UserContext } from './context/UserProvider.js'

export default function App() {
  const { token, logout } = useContext(UserContext)
  return (
    <div className="app">

      {/* conditional view: wrap the navbar in a condition so it wont be visible until user logs in */}
      {/* { token && <Navbar logout={logout}/>} */}
      <Navbar logout={logout} token={token} />

      <Routes>
        <Route
          path="/"
          element={token ? <Navigate to="/profile" /> : <Auth />}
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute token={token} redirectTo="/">
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/public"
          element={
            <ProtectedRoute token={token} redirectTo="/">
              <Public />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}
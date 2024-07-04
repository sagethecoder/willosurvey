import React, { useState, useEffect } from 'react';
import LoginPage from './page/LoginPage'
import FormPage from './page/FormPage'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Thankyou from './page/Thankyou';
// App Component
const App = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            {/* <Route path="/login" element={<LoginPage setUser={setUser} />} /> */}
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <LoginPage setUser={setUser} />}
            />
            {/* <Route 
              path="/survey" 
              // element={ <FormPage user={user} />} 
              element={user ? <FormPage user={user} /> : <Navigate to="/login" />} 
            /> */}
             <Route
              path="/survey"
              element={user ? <FormPage user={user} /> : <Navigate to="/login" />}
            />
            {/* <Route path="/" element={<Navigate to="/login" />} /> */}
            {/* <Route path="/" element={user ? <FormPage user={user} /> : <Navigate to="/login" />} /> */}
            <Route
              path="/"
              element={user ? <FormPage user={user} /> : <Navigate to="/login" />}
            />
            <Route
              path="/thank"
              element={<Thankyou user={user} />}
            />
          </Routes>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App

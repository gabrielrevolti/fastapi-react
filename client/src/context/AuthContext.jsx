// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ token: null, loading: true });

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setAuth({ token: null, loading: false });
        return;
      }

      try {
        const res = await fetch(`http://localhost:8000/auth/verify-token/${token}`);
        if (!res.ok) throw new Error('Invalid token');
        setAuth({ token, loading: false });
      } catch {
        localStorage.removeItem('token');
        setAuth({ token: null, loading: false });
      }
    };

    checkToken();
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    setAuth({ token, loading: false });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setAuth({ token: null, loading: false });
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/tracking/login/Login';
import ProtectedPage from './pages/tracking/Protected';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import { ChakraProvider } from '@chakra-ui/react'
import PublicRoute from './components/PublicRoute';
import Layout from './components/Layout';

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/tracking/login" />} />
            <Route path="/tracking" element={<Navigate to="/tracking/login" />} />

            <Route path="/tracking" element={<Layout />}>
              <Route element={<PublicRoute />}>
                <Route path="login" element={<Login />} />
              </Route>

              <Route element={<ProtectedRoute />}>
                <Route path="processos" element={<ProtectedPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;

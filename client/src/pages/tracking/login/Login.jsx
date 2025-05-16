// Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import "./Login.css";
import Input from '../../../components/input/Input';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Card from '../../../components/card/Card';
import Footer from '../../../components/footer/Footer';
import Button from '../../../components/button/Button';
import { FaMapMarkerAlt } from "react-icons/fa";

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password) {
      setError('Username and password are required');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    const formDetails = new URLSearchParams();
    formDetails.append('username', username);
    formDetails.append('password', password);

    try {
      const response = await fetch('http://localhost:8000/auth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: formDetails,
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        login(data.access_token);
        navigate('/tracking/processos');
      } else {
        setError(data.detail || 'Authentication failed!');
      }
    } catch {
      setLoading(false);
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <div className='background containerLoginArea'>
        <p style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '60px' }}>Seja bem vindo(a) ao Tracking</p>

        <div className='containerLoginGeneral'>
          <Card>
            <p style={{ fontSize: '28px', fontWeight: '600' }}>Login</p>


            <div>
              <div className='inputWrap'>
                <Input placeholder="Email" type="text" value={username} onChange={(e) => setUsername(e.target.value)}>
                  <FaUser />
                </Input>
              </div>
            </div>

            <div className='inputWrap'>
              <Input placeholder="Senha" type="password" value={password} onChange={(e) => setPassword(e.target.value)}>
                <FaLock />
              </Input>
            </div>

            <Button text="Login" disabled={loading} func={handleSubmit} />
            {error && <span style={{ color: 'red' }}>{error}</span>}
          </Card>

          <Card style={{ justifyContent: 'unset', paddingTop: '44px' }}>
            <p style={{ fontSize: '28px', fontWeight: '600' }}>Consulta Rápida</p>

            <div>
              <div className='inputWrap'>
                <Input placeholder="Cod. de Rastreamento" type="text" value={username} onChange={(e) => setUsername(e.target.value)}>
                  <FaMapMarkerAlt />
                </Input>
              </div>
            </div>

            <Button text="Consultar" disabled={loading} func={handleSubmit} />

          </Card>
        </div>
        <Footer />
      </div>
    </>

  );
}

export default Login;

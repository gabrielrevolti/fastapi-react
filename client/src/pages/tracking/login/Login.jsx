// Login.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../context/AuthContext';
import "./Login.css";
import Input from '../../../components/input/Input';
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import Card from '../../../components/card/Card';
import Button from '../../../components/button/Button';
import Footer from '../../../components/footer/Footer';
import { FaMapMarkerAlt } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [trackingCode, setTrackingCode] = useState('')
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password) {
      toast.error('Email e senha necessários!');
      return false;
    }
    return true;
  };

  const handleDataCapFast = async () => {
      try {
        const response = await fetch(`http://localhost:8000/process/cap-fast/${trackingCode}`);
        console.log(response.json())
        if (!response.ok) {
          toast.error("Erro!")
        }
      } catch (error) {
    
      }

  }

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
        toast.error("Usuário ou senha incorretos!")
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='background containerLoginArea'>
        <p style={{ fontSize: 'var(--font-3xl)', fontWeight: 'bold', marginBottom: '60px' }}>Seja bem vindo(a) ao Tracking</p>

        <div className='containerLoginGeneral'>
          <Card>
            <p className='cardTitle'>Login</p>


            <div>
              <div className='inputWrap'>
                <Input placeholder="Usuário (email)" type="text" value={username} onChange={(e) => setUsername(e.target.value)}>
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
          </Card>

          <Card style={{ justifyContent: 'unset', paddingTop: '2.75rem' }}>
            <p className='cardTitle'>Consulta Rápida</p>

            <div>
              <div className='inputWrap'>
                <Input placeholder="Cod. de Rastreamento" type="text" value={trackingCode} onChange={(e) => setTrackingCode(e.target.value)}>
                  <FaMapMarkerAlt />
                </Input>
              </div>
            </div>

            <Button text="Consultar" disabled={loading} func={handleDataCapFast}/>
          </Card>
        </div>
            <ToastContainer
            position="top-right"
            autoClose={5000}
            pauseOnFocusLoss={false}
            hideProgressBar={false}
            pauseOnHover={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            draggable
            theme="colored"
          />
      </div>

      <Footer />
    </>

  );
}

export default Login;

// Login.jsx
import React, { useState } from 'react';
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
import { toast } from 'react-toastify';
import ModalProcessFast from '../../../components/modalProcessFast/ModalProcessFast';
import api from '../../../api';

const Login = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [modalProcessFast, setModalProcessFast] = useState(false);
  const [password, setPassword] = useState('');
  const [trackingCode, setTrackingCode] = useState('')
  const [loading, setLoading] = useState(false);
  const [trackingData, setTrackingData] = useState('')
  const navigate = useNavigate();

  const toggleModalProcessFast = () => {
    setModalProcessFast(!modalProcessFast)
  }

  const handleDataCapFast = async () => {
      try {
        if (!trackingCode) return  toast.error("Cod.de rastreamento necessário")

        const response =  await api.get(`/process/cap-fast/${trackingCode}`);
          const data = response.data;
          console.log(data)
          setTrackingData(data)
          toggleModalProcessFast()
      } catch (error) {
        
      }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password) return toast.error('Email e senha necessários!');
    setLoading(true);

    try {
      const formDetails = new URLSearchParams();
      formDetails.append('username', username);
      formDetails.append('password', password);

      const response = await api.post('/auth/token', formDetails, {
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      })

      // const response = await fetch('http://localhost:8000/auth/token', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      //   body: formDetails,
      // });

      // const data = await response.json();

      setLoading(false);

      login(response.data.access_token);
      navigate('/tracking/processos');

    } catch (error) {
      setLoading(false);

      if (error.response && error.response.status === 401) {
        toast.error('Usuário ou senha incorretos!');
      } else {
        toast.error('Erro na autenticação, tente novamente.');
      }
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
                <Input icon={<FaUser/>} placeholder="Usuário (email)" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
              </div>
            </div>

            <div className='inputWrap'>
              <Input placeholder="Senha" icon={<FaLock />} type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </div>

            <Button text="Login" disabled={loading} func={handleSubmit} />
          </Card>

          <Card style={{ justifyContent: 'unset', paddingTop: '2.75rem' }}>
            <p className='cardTitle'>Consulta Rápida</p>

            <div>
              <div className='inputWrap'>
                <Input icon={<FaMapMarkerAlt />} placeholder="Cod. de Rastreamento" type="text" value={trackingCode} onChange={(e) => setTrackingCode(e.target.value)}/>
              </div>
            </div>

            <Button text="Consultar" disabled={loading} func={handleDataCapFast}/>
          </Card>
        </div>
          {modalProcessFast && 
            <ModalProcessFast trackingData={trackingData} state={modalProcessFast} func={toggleModalProcessFast}/>
          }
      </div>

      <Footer />
    </>

  );
}

export default Login;

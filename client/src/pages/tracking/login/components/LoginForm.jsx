import React, { useState } from 'react'
import { useAuth } from '../../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Card from '../../../../components/card/Card';
import { FaLock, FaUser } from 'react-icons/fa';
import Input from '../../../../components/input/Input';
import Button from '../../../../components/button/Button';
import api from '../../../../api';

const LoginForm = () => {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password) return toast.error('Email e senha necessários!');

    try {
      const formDetails = new URLSearchParams();
      formDetails.append('username', username);
      formDetails.append('password', password);

      const response = await api.post('/auth/token', formDetails, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })

      login(response.data.access_token);
      navigate('/tracking/processos');

    } catch (error) {
      
    }
  };

  return (
    <Card>
      <p className='cardTitle'>Login</p>

      <div>
        <div className='inputWrap'>
          <Input icon={<FaUser/>} placeholder="Usuário (email)" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
      </div>

      <div className='inputWrap'>
        <Input placeholder="Senha" icon={<FaLock/>} type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      <Button text="Login" func={handleSubmit} />
    </Card>

  )
}

export default LoginForm
// Login.jsx
import "./Login.css";
import Footer from '../../../components/footer/Footer';
import ModalProcessFast from '../../../components/modalProcessFast/ModalProcessFast';
import LoginForm from "./components/LoginForm";
import QuickQuery from "./components/QuickQuery";
import { useState } from "react";


const Login = () => {
  const [modalProcessFast, setModalProcessFast] = useState(false);
  const [trackingData, setTrackingData] = useState('')

  const toggleModalProcessFast = () => {
    setModalProcessFast(!modalProcessFast)
  }

  return (
    <>
      <div className='background containerLoginArea'>
        <p style={{ fontSize: 'var(--font-3xl)', fontWeight: 'bold', marginBottom: '60px' }}>Seja bem vindo(a) ao Tracking</p>
        
        <div className='containerLoginGeneral'>
          <LoginForm/>
          <QuickQuery setTrackingData={setTrackingData} toggleModal={toggleModalProcessFast}/>
        </div>
          {modalProcessFast && (
            <ModalProcessFast trackingData={trackingData} state={modalProcessFast} func={toggleModalProcessFast}/>
          )
          }
     
      </div>

      <Footer />
    </>

  );
}

export default Login;

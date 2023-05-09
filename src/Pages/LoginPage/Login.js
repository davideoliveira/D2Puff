import React, { useState } from 'react';
import './Login.css';
import {auth} from '../../FireBase/Configuracao'
import { useNavigate } from 'react-router-dom';

import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';




const Login = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(true);

  const [
    signInWithEmailAndPassword,
    user,
    loading,
    error,
  ] = useSignInWithEmailAndPassword(auth);

  const handleSubmit = (event) => {
    event.preventDefault()
    signInWithEmailAndPassword(email, password)
    .then(function(resp){
      if(resp != undefined){
        setIsAuthorized(true)
        navigate('/home')
      }else{
        setIsAuthorized(false)
      }
    }

    )
  };

  if(user) {
    return console.log(user)
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>
        {!isAuthorized && (
          <p className="login-error">Login não autorizado. Verifique suas credenciais.</p>
        )}

      
        <form onSubmit={handleSubmit}>
          <label className="login-label">
            Email:
            <input
              className="login-input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </label>
          <label className="login-label">
            Password:
            <input
              className="login-input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          <button className="login-button" onClick={handleSubmit}  >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

import './login.css'
import React, { useState } from 'react';
import imagenFondo from '../../assets/icons8-gameboy-96.png';

export default function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Aquí podrías agregar la lógica de autenticación si fuera necesario
      console.log('Correo electrónico:', email);
      console.log('Contraseña:', password);
    };
  
    return (
      <div className="Login">
        <div className="left-half"></div>
        <div className="login-container">
          <h2>Inicio de Sesión</h2>
            {}
            <p className="welcome">Welcome to</p>
            <img src={imagenFondo} alt="Fondo" className="fondo-imagen" />
            <p className="Game">GameClub</p>
          <form onSubmit={handleSubmit}>
            <label>
              Correo Electrónico:
              <input
                type="email"
                value={email}
                onChange={handleEmailChange}
              />
            </label>
            <br />
            <label>
              Contraseña:
              <input
                type="password"
                value={password}
                onChange={handlePasswordChange}
              />
            </label>
            <br />
            <button type="submit">Iniciar sesión</button>
          </form>
        </div>
      </div>
    );
  }
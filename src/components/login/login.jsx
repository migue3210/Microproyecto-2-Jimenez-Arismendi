import './login.css'
import React, { useState } from 'react';
import imagenFondo from '../../assets/icons8-gameboy-96.png';
import { auth } from '/Users/Luis Gustavo/Desktop/Microproyecto-2-Jimenez-Arismendi/src/services/firebase';
import {signInWithEmailAndPassword} from 'firebase/auth';



export default function Login () {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const signIn = (e) => {
      e.preventDefault();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          console.log(userCredential);
        })
        .catch((error) => {
          console.log(error);
        });
    }

    
  
    return (
      <div className="Login">
        <div className="left-half"></div>
        <div className="login-container">
          <h2>Inicio de Sesión</h2>
            {}
            <p className="welcome">Welcome to</p>
            <img src={imagenFondo} alt="Fondo" className="fondo-imagen" />
            <p className="Game">GameClub</p>
          <form onSubmit={signIn}>
            <label>
              Correo Electrónico:
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <br />
            <label>
              Contraseña:
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
            <button type="submit">Iniciar sesión</button>
          </form>
        </div>
      </div>
    );
  }
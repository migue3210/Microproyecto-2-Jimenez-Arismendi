import './register.css'
import React, { useState } from 'react';
import imagenFondo from '../../assets/icons8-gameboy-96.png';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';



export default function Register () {
    const [name, setName] = useState('');
    const [apellido, setApellido] = useState('');
    const [usuario, setUsuario] = useState('');
    const [game, setGame] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const signUp = (e) => {
      e.preventDefault();
      createUserWithEmailAndPassword(auth, email, password, name, apellido, usuario, game)
        .then((userCredential) => {
          console.log(userCredential);
        })
        .catch((error) => {
          console.log(error);
        });

        const enviar = {
            nombre: name,
            apellido: apellido,
            usuario: usuario,
            juego_favorito: game,
            correo: email,
            contrasena: password
    }

    const datos = collection(db, "usuarios")
    addDoc(datos, enviar)
    };

    
    
        
    
  
    return (
      <div className="Register">
        <div className="left-half"></div>
        <div className="login-container">
          <h2>Registrarse</h2>
            {}
            <p className="welcome">Welcome to</p>
            <img src={imagenFondo} alt="Fondo" className="fondo-imagen" />
            <p className="Game">GameClub</p>

          <form onSubmit={signUp}>
            <label className='name'>
                Nombre
            </label>
                <input
                type="name"
                className='input-name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            
            <label className='apellido'>
                Apellido
            </label>
                <input
                type="apellido"
                className='input-apellido'
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                />
            
            <label className='usuario'>
                Nombre de usuario
            </label>
                <input
                type="usuario"
                className='input-usuario'
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                />
            
            <label className='game'>
                Juego favorito
            </label>
                <input
                type="game"
                className='input-game'
                value={game}
                onChange={(e) => setGame(e.target.value)}
                />
            
            <label className='input-email'>
              Correo Electrónico
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
            <br />
            <label className='input-password'>
              Contraseña
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>
            <br />
            <button type="submit" className='button-register'>Registrarse</button>

            <label className='signIn'>
              ¿Ya tienes cuenta?
            </label>
            <button className='button-signIn'>Iniciar sesión</button>

          </form>
        </div>
      </div>
    );
  }
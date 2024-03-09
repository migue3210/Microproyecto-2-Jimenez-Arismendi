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
            <label>
                Nombre:
                <input
                type="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </label>
            <label>
                Apellido:
                <input
                type="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                />
            </label>
            <label>
                Nombre de usuario:
                <input
                type="usuario"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                />
            </label>
            <label>
                Juego favorito:
                <input
                type="game"
                value={game}
                onChange={(e) => setGame(e.target.value)}
                />
            </label>
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
            <button type="submit">Registrarse</button>
          </form>
        </div>
      </div>
    );
  }
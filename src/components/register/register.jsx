import './register.css'
import { useState } from 'react';
import imagenFondo from '../../assets/icons8-gameboy-96.png';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../services/firebase';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../services/firebase';
import { useNavigate } from 'react-router-dom';

export default function Register() {
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


  const juegos = [
    "The Witcher 3: Wild Hunt",
    "Red Dead Redemption 2",
    "The Legend of Zelda: Breath of the Wild",
    "Dark Souls III",
    "Super Mario Odyssey",
    "Overwatch",
    "Minecraft",
    "Fortnite",
    "FIFA 22",
    "Call of Duty: Warzone",
    "Assassin's Creed Valhalla",
    "Cyberpunk 2077",
    "Among Us",
    "Animal Crossing: New Horizons",
    "League of Legends",
    "Genshin Impact",
    "Apex Legends",
    "World of Warcraft",
    "Control",
    "Hades"
  ];


  const handleChange = (e) => {
    setGame(e.target.value);
  };


  let navigate = useNavigate();

  function signIn(){
    navigate('/')
  }


  return (
    <div className="Register">
      <div className="left-half"></div>
      <div className="login-container">
        <h2>Registrarse</h2>
        { }
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
          <select className='select-game' value={game} onChange={handleChange}>
        {juegos.map((juego, index) => (
          <option key={index} value={juego}>{juego}</option>
        ))}
      </select>

          <label className='email'>
            Correo Electrónico
            <input
              type="email"
              className='input-email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label className='password' >
            Contraseña
            <input
              type="password"
              className='input-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="submit" className='button-register'>Registrarse</button>

          <label className='signIn'>
            ¿Ya tienes cuenta?
          </label>
          <button type="button" className='button-signIn' onClick={signIn}>Iniciar sesión</button>

        </form>
      </div>
    </div>
  );
}
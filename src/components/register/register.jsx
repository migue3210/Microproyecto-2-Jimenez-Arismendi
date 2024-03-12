import './register.css'
import { useState, useEffect } from 'react';
import imagenFondo from '../../assets/icons8-gameboy-96.png';
import { createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
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
  const [isFormValid, setIsFormValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');



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

  const validateForm = () => {
    // Validación para todos los campos
    const isValid = name !== '' && apellido !== '' && usuario !== '' && game !== '' && email !== '' && password !== '';

    if (!isValid) {
      setErrorMessage('Rellene todos los campos');
    } else {
      setErrorMessage('');
    }

    // Actualización del estado de validez del formulario
    setIsFormValid(isValid);
  };


  let navigate = useNavigate();

  function signIn() {
    navigate('/')
  }

  function enter() {
    navigate('/inicio')
  }


  return (
    <div className="Register">

      <div className="left-half">
        <h2>Welcome to</h2>
        <img src={imagenFondo} alt="Fondo" />
        <h2>GameClub</h2>
      </div>

      <div className="login-container">

        <h2>Registrarse</h2>
        <form className='entry-form' onSubmit={signUp}>

          <div className='row'>
            <div className='textfield-container'>
              <label className='name'>
                Nombre
              </label>
              <input
                type="name"
                className='input-name'
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  validateForm();
                }}
              />
            </div>

            <div className='textfield-container'>
              <label className='apellido'>
                Apellido
              </label>
              <input
                type="apellido"
                className='input-apellido'
                value={apellido}
                onChange={(e) => {
                  setApellido(e.target.value);
                  validateForm();
                }}
              />
            </div>
          </div>

          <div className='row'>
            <div className='textfield-container'>
              <label className='usuario'>
                Nombre de usuario
              </label>
              <input
                type="usuario"
                className='input-usuario'
                value={usuario}
                onChange={(e) => {
                  setUsuario(e.target.value)
                  validateForm();
                }}
              />
            </div>

            <div className='textfield-container'>
              <label className='game'>
                Juego favorito
              </label>
              <select className='select-game' value={game} onChange={handleChange}>
                {juegos.map((juego, index) => (
                  <option key={index} value={juego}>{juego}</option>
                ))}
              </select>
            </div>
          </div>

          <label className='email'>
            Correo Electrónico
            <input
              type="email"
              className='input-email'
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                validateForm();
              }}
            />
          </label>
          <br />

          <div className='textfield-container'>
            <label className='password' >
              Contraseña
            </label>
            <input
              type="password"
              className='input-password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                validateForm();
              }}

            />
          </div>

          <section className='register-buttons'>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button type="submit" className='button-register' disabled={!isFormValid} onClick={enter}>Registrarse</button>
            <label className='signIn'>
              <br />
              ¿Ya tienes cuenta?
            </label>
            <button type="button" className='button-signIn' onClick={signIn}>Iniciar sesión</button>
          </section>


        </form>
      </div>
    </div>
  );
}

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Escucha cambios en la autenticación
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });

    // Detiene la escucha cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  return {
    currentUser,
  };
};
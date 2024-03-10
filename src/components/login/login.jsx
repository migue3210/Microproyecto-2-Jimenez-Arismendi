import './login.css'
import { useState } from 'react';
import imagenFondo from '../../assets/icons8-gameboy-96.png';
import { auth } from '../../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';



export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();


  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
        navigate('/inicio');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function registrarse(){
    navigate('/registro')
  }

  return (
    <div className="Login">
      <div className="left-half"></div>
      <div className="login-container">
        <h2>Inicio de Sesión</h2>
        { }
        <p className="welcome">Welcome to</p>
        <img src={imagenFondo} alt="Fondo" className="fondo-imagen" />
        <p className="Game">GameClub</p>
        
        <form onSubmit={signIn}>
          <label>
            Correo Electrónico:
            <input
              className='login-input'
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <br />
          <label>
            Contraseña:
            <input
              className='login-input'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Iniciar sesión</button>
          <label className='signUp'>
            ¿No tienes cuenta?
          </label>
          <button type="button" className='button-signUp' onClick={registrarse}>Registrarse</button>
        </form>
      </div>
    </div>
  );
}
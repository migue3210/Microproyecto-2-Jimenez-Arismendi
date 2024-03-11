import './login.css'
import imagenFondo from '../../assets/icons8-gameboy-96.png';
import { auth } from '../../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import SignIn from './sign-in.component';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState(null);



  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Usuario autenticado con éxito:', userCredential.user);
        navigate('/inicio');
      })
      .catch((error) => {
        setError('Correo electrónico o contraseña incorrectos');
        console.error(error);
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
          <SignIn></SignIn>
          <label className='signUp'>
            ¿No tienes cuenta?
          </label>
          <button type="button" className='button-signUp' onClick={registrarse}>Registrarse</button>
          {error && <p className="error-message">{error}</p>}
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
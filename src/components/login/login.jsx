import './login.css'
import imagenFondo from '../../assets/icons8-gameboy-96.png';
import { auth } from '../../services/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Navigate, useNavigate } from 'react-router-dom';
import SignIn from './sign-in.component';
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

export default function Login({user}) {
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

  function registrarse() {
    navigate('/registro')
  }

  if(user){
    return <Navigate to='/inicio'></Navigate>
  }

  return (
    <div className="Login">

      <div className="left-half">
        <h2>Welcome to</h2>
        <img src={imagenFondo} alt="Fondo" className="game-image" />
        <h2 >GameClub</h2>
      </div>

      <div className="login-container">
        <h2>Inicio de Sesión</h2>
        <form className='entry-form' onSubmit={signIn}>

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
          {error && <p className="error-message">{error}</p>}

          <br />

          <section className='login-buttons'>
            <button type="submit">Iniciar sesión</button>
            <SignIn></SignIn>
          </section>

          <section className='register-section'>
            <label className='signUp'>
              ¿No tienes cuenta?
            </label>
            <button type="button" className='button-signUp' onClick={registrarse}>Registrarse</button>
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
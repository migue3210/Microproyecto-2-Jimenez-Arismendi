import { signInWithGooglePopup } from "../../services/firebase.util"
import {GoogleButton} from 'react-google-button';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const response = await signInWithGooglePopup();
            console.log(response);
      
            // Verifica si el inicio de sesión fue exitoso
            if (response) {
              // Redirige a la página deseada
              navigate('/inicio'); 
            }
          } catch (error) {
            console.error('Error al iniciar sesión con Google:', error);
          }
        };

    return (
            
          <div className='google'>
          <GoogleButton onClick={handleGoogleSignIn}/>
          </div>
        )
    }


    export default SignIn;
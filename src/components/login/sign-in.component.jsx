import { signInWithGooglePopup } from "../../services/firebase.util"
import {GoogleButton} from 'react-google-button';

const SignIn = () => {
    const handleGoogleSignIn = async () => {
            const response = await signInWithGooglePopup();
            console.log(response);
        }
    return (
            
          <div className='google'>
          <GoogleButton onClick={handleGoogleSignIn}/>
          </div>
        )
    }


    export default SignIn;
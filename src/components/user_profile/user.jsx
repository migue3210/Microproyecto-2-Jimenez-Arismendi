import React, { useState, useEffect } from 'react';
import { useAuth } from '../login/login'; 
import Header from '../header/header'
import '../user_profile/user.css'
import { db, auth } from '../../services/firebase';
import { getDocs, collection, doc, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';



const UserProfile = ( ) => {
  const { uid } = useParams();
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    juego_favorito: '',
    correo: '',
    contrasena:'',
    username: '',
  });

  useEffect(() => {
    const fetchUserDetails = async () => {
      console.log('UID:', uid);
      const userRef = db.collection('usuarios').doc(uid);
      const doc = await userRef.get();
      if (doc.exists){
        setUserData(doc.data());
      } else {
        console.log('User not found')
      }
    };
    fetchUserDetails();
  }, [currentUser][uid]); 

  console.log('userData:', userData);

  const [val, setVal] = useState([]);
  const fetchUserDetails = async () => {
      await getDocs(collection(db, "usuarios"))
          .then((querySnapshot) => {
              const newData = querySnapshot.docs
                  .map((doc) => ({ ...doc.data(), uid: doc.iud }));
              setVal(newData);
          })
  }

  useEffect(() => {
    fetchUserDetails();
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      await updateProfile(currentUser, {
        displayName: `${userData.nombre} ${userData.apellido}`,
        customField: userData.videojuegoPreferido,
        // Add more fields as needed
      });
      console.log('Perfil actualizado con éxito');
    } catch (error) {
      console.log('Datos completos del usuario:', userData);
    }
  };

  let navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth).then(() => console.log("Sign Out")).catch((error) => console.log(error));
    navigate('/')
  };  

  return (
    <>
    <Header></Header>
    <div className="user-profile-container">
      <h2>Perfil de Usuario</h2>
      <label>
        Nombre:
        <input type="text" name="nombre" value={userData.nombre} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Apellido:
        <input type="text" name="apellido" value={userData.apellido} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Juego Favorito:
        <input
          type="text"
          name="juego_favorito"
          value={userData.videojuegoPreferido}
          onChange={handleInputChange}
        />
      </label>
      <br />
      <label>
        Correo Electrónico:
        <input type="text" name="correo" value={userData.email} disabled />
      </label>
      <br />
      <label>
        Username:
        <input type="text" name="usuario" value={userData.usuario} disabled />
      </label>
      <br />

      <button onClick={handleSaveChanges}>Guardar Cambios</button>
      <button onClick={handleSignOut}>Sign Out</button>

    </div>

    </>
  );
};

export default UserProfile;

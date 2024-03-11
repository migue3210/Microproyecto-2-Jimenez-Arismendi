import React, { useState, useEffect } from 'react';
import { useAuth } from '../login/login'; 
import Header from '../header/header'
import '../user_profile/user.css'


const UserProfile = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    videojuegoPreferido: '',
    correo: '',
    username: '',
  });

  useEffect(() => {
    if (currentUser) {
      setUserData({
        name: currentUser.name || '',
        apellido: currentUser.apellido || '',
        videojuegoPreferido: currentUser.juego_favorito || '',
        email: currentUser.email || '', 
        usuario: currentUser.usuario || '', 
      });
    }
  }, [currentUser]);

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
      console.error('Error al actualizar el perfil:', error);
    }
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
          name="videojuegoPreferido"
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
        <input type="text" name="username" value={userData.usuario} disabled />
      </label>
      <br />

      <button onClick={handleSaveChanges}>Guardar Cambios</button>
    </div>

    </>
  );
};

export default UserProfile;

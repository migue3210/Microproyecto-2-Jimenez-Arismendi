import React, { useState, useEffect } from 'react';
import { useAuth } from '../login/login'; 
import Header from '../header/header'


const UserProfile = () => {
  const { currentUser, updateProfileData } = useAuth(); // Asegúrate de tener una función para obtener el usuario actual y actualizar el perfil en tu contexto de autenticación
  const [userData, setUserData] = useState({
    nombre: '',
    apellido: '',
    videojuegoPreferido: '',
  });

  useEffect(() => {
    // Cargar datos del usuario al montar el componente
    if (currentUser) {
      setUserData({
        nombre: currentUser.nombre || '',
        apellido: currentUser.apellido || '',
        videojuegoPreferido: currentUser.videojuegoPreferido || '',
      });
    }
  }, [currentUser]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      // Llama a la función para actualizar el perfil en Firebase
      await updateProfileData(userData);
      console.log('Perfil actualizado con éxito');
    } catch (error) {
      console.error('Error al actualizar el perfil:', error);
    }
  };

  return (
    <div>
      <Header></Header>
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
        Videojuego Preferido:
        <input type="text" name="videojuegoPreferido" value={userData.videojuegoPreferido} onChange={handleInputChange} />
      </label>
      <br />
      <button onClick={handleSaveChanges}>Guardar Cambios</button>
    </div>
  );
};

export default UserProfile;

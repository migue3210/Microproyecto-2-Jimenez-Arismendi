import './user.css';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get } from 'firebase/database';
import { useEffect, useState } from 'react';


export default function User () {

    const [userData, setUserData] = useState(null);
  
    useEffect(() => {
      const auth = getAuth();
      const db = getDatabase();
  
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          const userRef = ref(db, `usuarios/${user.uid}`);
  
          get(userRef)
            .then((snapshot) => {
              const data = snapshot.val();
              setUserData(data);
            })
            .catch((error) => {
              console.error('Error al obtener datos del usuario:', error);
            });
        }
      });
  
      return () => unsubscribe();
    }, []);
  
    return (
      <div className="perfil-container">
        {userData && (
          <div className="perfil-card">
            <h2>Perfil de Usuario</h2>
            <p><strong>Nombre:</strong> {userData.nombre}</p>
            <p><strong>Apellido:</strong> {userData.apellido}</p>
            <p><strong>Nombre de Usuario:</strong> {userData.username}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Contraseña:</strong> ************</p>
            <p><strong>Videojuego Preferido:</strong> {userData.videojuego}</p>
          </div>
        )}
      </div>
    );
  };

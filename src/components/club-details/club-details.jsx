/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../services/firebase';
import { getDocs, collection } from 'firebase/firestore';
import './club-details.css';
import Header from '../header/header';

export default function ClubDetails() {
    const { id } = useParams();
    console.log(id);
    const [clubData, setClubData] = useState(null);

    useEffect(() => {
        const fetchClubDetails = async () => {
            try {
                const clubRef = db.collection('clubs').doc(id);
                const doc = await clubRef.get();
                if (doc.exists) {
                    setClubData(doc.data());
                } else {
                    console.log('Club not found');
                }
            } catch (error) {
                console.error('Error fetching club details:', error);
            }
        };

        fetchClubDetails();
    }, [id]);

    const [val, setVal] = useState([]);
    const fetchGames = async () => {

        await getDocs(collection(db, "games"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setVal(newData);
            })

    }

    useEffect(() => {
        fetchGames();
    }, [])


    if (!clubData) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <Header></Header>
            <div className='club-details-container'>
                <h1>Detalles del {clubData.nombre}</h1>
                <p>{clubData.descripcion}</p>
                <h2>Juegos</h2>
                <div>
                    {
                        val.map(values => (
                            clubData.videojuegos.map(games => (
                                games == values.id
                                    ?
                                    <>
                                        <div>
                                            <h3>{values.titulo}</h3>
                                            <p>{values.descripcion}</p>
                                            <p className='game-gender'>{values.genero}</p>
                                        </div>
                                    </>
                                    : null
                            ))
                        ))
                    }
                </div>

                <button id='subscribe'>Suscribirme</button>
                <button id='unsubscribe'>Retirarme</button>

            </div>
        </>

    );
}
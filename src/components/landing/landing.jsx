/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import './landing.css'
import Header from '../header/header'
import { db } from '../../services/firebase';
import { Link } from 'react-router-dom';

export default function Landing() {
    const [info, setInfo] = useState([]);
    window.addEventListener('load', () => {
        Fetchdata();
    });

    const Fetchdata = () => {
        db.collection("clubs").get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                setInfo(arr => [...arr, element]);
            });
        })
    }

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


    return (
        <>
            <Header></Header>
            <div className='club-list'>
                {
                    info.map((data) => (
                        <Link to={`/detalles-club/${data.id}`} style={{ textDecoration: 'none', color: '#000' }}>
                            <div className='card-container'>
                                <h3>{data.data().nombre}</h3>
                                <p>{data.data().descripcion}</p>
                                <h4 className='games-title'>Juegos</h4>
                                {
                                    val.map(values => (
                                        data.data().videojuegos.map(games => (
                                            games == values.id
                                                ? <p>{values.titulo}</p>
                                                : null
                                        ))
                                    ))
                                }
                            </div>
                        </Link>
                    ))
                }
            </div>
        </>

    );
}


/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import { useState, useEffect } from 'react';
import { getDocs, collection } from 'firebase/firestore';
import './landing.css'
import Header from '../header/header'
import { db } from '../../services/firebase';

export default function Landing() {
    const [info, setInfo] = useState([]);
    window.addEventListener('load', () => {
        Fetchdata();
    });

    const Fetchdata = () => {
        db.collection("clubs").get().then((querySnapshot) => {
            querySnapshot.forEach(element => {
                var data = element.data();
                setInfo(arr => [...arr, data]);
            });
        })
    }

    const [val, setVal] = useState([]);

    const fetchPost = async () => {

        await getDocs(collection(db, "games"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setVal(newData);
                console.log(val, newData);
            })

    }

    useEffect(() => {
        fetchPost();
    }, [])


    return (
        <>
            <Header></Header>
            <div className='club-list'>
                {
                    info.map((data) => (
                        <div className='card-container'>
                            <h3>{data.nombre}</h3>
                            <p>{data.descripcion}</p>
                            <h4 className='games-title'>Juegos</h4>
                            {val.map(values => (
                                data.videojuegos.map(games => (
                                    games == values.id
                                        ? <p>{values.titulo}</p>
                                        : null
                                ))
                            ))}
                        </div>
                    ))
                }
            </div>
        </>

    );
}


import { useState } from 'react';
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

    return (
        <>
            <Header></Header>
            <div className='club-list'>
                {
                    info.map((data) => (
                        // eslint-disable-next-line react/jsx-key
                        <ClubCard
                            name={data.nombre}
                            description={data.descripcion}
                            games={data.videojuegos}
                        />
                    ))
                }
            </div>
        </>

    );
}

const ClubCard
    // eslint-disable-next-line react/prop-types
    = ({ name, description, games }) => {
        return (
            <div className='card-container'>
                <h3>{name}</h3>
                <p>{description}</p>
                <h4 className='games-title'>Juegos</h4>
                <p>{games}</p>
            </div>
        );
    }
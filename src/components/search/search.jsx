/* eslint-disable react/jsx-key */
import './search.css';
import Header from '../header/header';
import search_icon from '../../assets/search_icon.svg';
import { db } from '../../services/firebase';
import { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';


export default function Search() {
    const [val, setVal] = useState([]);
    const value = collection(db, 'games');
    useEffect(() => {
        const getData = async () => {
            const dbVal = await getDocs(value)
            setVal(dbVal.docs.map(doc => ({ ...doc.data(), id: doc.id })))
        }
        getData()
    })
    return (
        <>
            <Header></Header>
            <div className='search-container'>
                <div className='browser'>
                    <img className='search-icon' src={search_icon} alt="search icon" />
                    <input id='search-input' type='text' placeholder='Buscar...' />
                </div>
                <div className='game-cards-container'>
                    {val.map(values => (
                        <div className='game-card'>
                            <strong>{values.titulo}</strong>
                        </div>
                    ))}
                </div>

            </div>
        </>

    );
}
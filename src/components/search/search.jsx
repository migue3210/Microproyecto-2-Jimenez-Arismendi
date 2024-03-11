/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
import './search.css';
import Header from '../header/header';
import search_icon from '../../assets/search_icon.svg';
import { db } from '../../services/firebase';
import { useEffect, useState } from 'react';
import { getDocs, collection } from 'firebase/firestore';


export default function Search() {
    const [val, setVal] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const fetchPost = async () => {

        await getDocs(collection(db, "games"))
            .then((querySnapshot) => {
                const newData = querySnapshot.docs
                    .map((doc) => ({ ...doc.data(), id: doc.id }));
                setVal(newData);
                setSearchResults(newData);
            })

    }

    const handleSearch = async () => {
        try {
            if (searchTerm.trim() === '') {
                setSearchResults(val);
            } else {
                const querySnapshot = await db
                    .collection('games')
                    .where('titulo', '>=', searchTerm)
                    .where('titulo', '<=', searchTerm + '\uf8ff')
                    .get();

                const results = querySnapshot.docs.map((doc) => doc.data());
                setSearchResults(results);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        fetchPost();
    }, [])



    return (
        <>
            <Header></Header>
            <div className='search-container'>
                <div className='browser'>
                    <img className='search-icon' src={search_icon} alt="search icon" />
                    <input
                        id='search-input'
                        type='text' placeholder='Buscar...'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter")
                                handleSearch();
                        }}
                    />
                </div>
                <div className='game-cards-container'>
                    {
                        searchResults.map((game) => (
                            <div className='game-card' key={game.id}>
                                <strong >{game.titulo}</strong>
                                <p>{game.descripcion}</p>
                                <p className='game-gender'>{game.genero}</p>
                            </div>
                        ))
                    }
                </div>

            </div>
        </>

    );
}
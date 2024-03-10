import './search.css';
import Header from '../header/header';
import search_icon from '../../assets/search_icon.svg';

export default function Search() {
    return (
        <>
            <Header></Header>
            <div className='search-container'>
                <div className='browser'>
                    <img className='search-icon' src={search_icon} alt="search icon" />
                    <input id='search-input' type='text' placeholder='Buscar...' />
                </div>
            </div>
        </>

    );
}
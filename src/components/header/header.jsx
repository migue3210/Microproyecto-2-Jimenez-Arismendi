// import { Link } from "react-router-dom";
import './header.css'
import person_icon from '../../assets/person_icon.svg';

export default function Header() {
    return (
        <>
            <div className="header">
                <h1>Gaming Club</h1>
                <div className="nav">
                    <a className="link" href='/inicio'>Inicio</a >
                    <a className="link" href='/buscar-juego'>Buscar Juegos</a >
                    <a href='/perfil/:uid'><img className="person-icon" src={person_icon} alt="perfil" /></a>
                </div>
            </div>
        </>
    )
}
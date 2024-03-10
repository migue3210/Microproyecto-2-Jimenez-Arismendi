import { Link } from "react-router-dom";
import './header.css'
import person_icon from '../../assets/person_icon.svg';

export default function Header() {
    return (
        <>
            <div className="header">
                <h1>Gaming Club</h1>
                <div className="nav">
                    <Link className="link" to='/inicio'>Inicio</Link >
                    <Link className="link" to='/buscar-juego'>Buscar Juegos</Link >
                    <Link to='/perfil'><img className="person-icon" src={person_icon} alt="perfil" /></Link>
                </div>
            </div>
        </>
    )
}
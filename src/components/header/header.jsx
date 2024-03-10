import { Link } from "react-router-dom";
import './header.css'

export default function Header() {
    return (
        <>
            <div className="header">
                <h1>Gaming Club</h1>
                <div className="nav">
                    <Link className="link" to='/inicio'>Inicio</Link >
                    <Link className="link" to='/buscar-juego'>Buscar Juegos</Link >
                </div>
            </div>
        </>
    )
}
import { Navigate } from "react-router-dom"

export const ProtectedRouteInicio = ({ children, user}) => {
    return user ? children : <Navigate to="/"></Navigate>;
};

export const ProtectedRoutePerfil = ({ children, user}) => {
    return user ? children : <Navigate to="/perfil"></Navigate>;
};

export const ProtectedRouteSearch = ({ children, user}) => {
    return user ? children : <Navigate to="/buscar-juego"></Navigate>;
};


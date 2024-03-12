import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import Landing from './components/landing/landing'
import Login from './components/login/login'
import Register from './components/register/register'
import Search from "./components/search/search";
import UserProfile from "./components/user_profile/user";
import ClubDetails from "./components/club-details/club-details";

import { ProtectedRouteInicio, ProtectedRoutePerfil, ProtectedRouteSearch } from "./components/ProtectedRoute";
import {onAuthStateChanged} from "firebase/auth"
import {useEffect, useState} from "react"
import { auth } from "./services/firebase";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if(user) {
          setUser(user);
          return;
        }

        setUser(null);
      });
      return () => unsubscribe();
  }, []);



  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<Login user={user}/>}
          ></Route>
          <Route
            exact
            path="/registro"
            element={<Register user={user}/>}
          ></Route>
          <Route
            exact
            path="/inicio"
            element={
              <ProtectedRouteInicio user={user}>
                <Landing></Landing>
              </ProtectedRouteInicio>
            }
          ></Route>
          <Route
            exact
            path="/buscar-juego"
            element={
            <ProtectedRouteSearch user={user}>
            <Search/>
            </ProtectedRouteSearch>
          }
          ></Route>
          <Route
            exact
            path="/perfil"
            element={
            <ProtectedRoutePerfil user={user}>
            <UserProfile/>
            </ProtectedRoutePerfil>
            }
          ></Route>
          <Route path="/detalles-club/:id" element={<ClubDetails user={user}/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App

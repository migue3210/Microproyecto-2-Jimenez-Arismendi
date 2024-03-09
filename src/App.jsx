import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import './App.css'
import Landing from './components/landing/landing'
import Login from './components/login/login'
import Register from './components/register/register'


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<Login />}
          ></Route>
          <Route
            exact
            path="/registro"
            element={<Register />}
          ></Route>
          <Route
            exact
            path="/inicio"
            element={<Landing />}
          ></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App

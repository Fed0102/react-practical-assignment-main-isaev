import './App.css';
import HomePage from "./Pages/HomePage";
import {useSelector} from "react-redux";
import LoginPage from "./Pages/LoginPage";
import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";

function App() {
    const login = useSelector(state => state.loginPage.login);

    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/" element={login ? <HomePage/> : <Navigate to="/loginPage"/>}/>
                    <Route path="/homePage" element={login ? <HomePage/> : <Navigate to="/loginPage"/>}/>
                    <Route path="/loginPage" element={login ? <Navigate to="/homePage"/> : <LoginPage/>}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;

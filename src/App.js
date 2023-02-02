import {Route, Routes, useNavigate} from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/logIn/login";
import Signup from "./pages/signUp/signup";
import './globalStyle/style.css'
import Testing from "./pages/testing/testingAdmin";
import Subjects from "./pages/subjects/subjects";
import {useEffect} from "react";
import TestingAdmin from "./pages/testing/testingAdmin";
import TestingUser from "./pages/testing/testingUser";
import About from "./pages/about/about";

function App() {
    const navigate = useNavigate()
    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.removeItem("role");
            localStorage.removeItem("user");
            navigate('/')
        }, 3600 * 1000);
        return () => {
            clearTimeout(timeout);
        };
    }, [])

    return (
        <Routes>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/signup'} element={<Signup/>}/>
            <Route path={'/'} element={<Home/>}/>
            <Route path={'/about'} element={<About/>}/>
            {
                localStorage.getItem('user') &&
                <Route path={'/subjects'} element={<Subjects/>}/>
            }
            {
                localStorage.getItem('user') &&
                <Route path={'/test/:subject/:id/admin'} element={<TestingAdmin/>}/>
            }
            {
                localStorage.getItem('user') &&
                <Route path={'/test/:subject/:id/user'} element={<TestingUser/>}/>
            }
        </Routes>
    );
}

export default App;

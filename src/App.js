import {useSelector} from "react-redux";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/logIn/login";
import Signup from "./pages/signUp/signup";
import './globalStyle/style.css'
import Testing from "./pages/testing/testing";

function App() {
    const user = useSelector(state => state.user)
    console.log(user)
    return (
        <Routes>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/'} element={<Login/>}/>
            <Route path={'/signup'} element={<Signup/>}/>
            {
                localStorage.getItem('user') &&
                <Route path={'/home'} element={<Home/>}/>
            }
            {
                localStorage.getItem('user') &&
                <Route path={'/test/:subject/:id'} element={<Testing/>}/>
            }

        </Routes>
    );
}

export default App;

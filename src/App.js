import {Route, Routes} from "react-router-dom";
import Home from "./pages/home/home";
import Login from "./pages/logIn/login";
import Signup from "./pages/signUp/signup";
import './globalStyle/style.css'
import Testing from "./pages/testing/testing";
import Subjects from "./pages/subjects/subjects";

function App() {
    return (
        <Routes>
            <Route path={'/login'} element={<Login/>}/>
            <Route path={'/signup'} element={<Signup/>}/>
            <Route path={'/'} element={<Home/>}/>
            {
                localStorage.getItem('user') &&
                <Route path={'/subjects'} element={<Subjects/>}/>
            }
            {
                localStorage.getItem('user') &&
                <Route path={'/test/:subject/:id'} element={<Testing/>}/>
            }
        </Routes>
    );
}

export default App;

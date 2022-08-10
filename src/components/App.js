import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SignUp from "./SignUpPage/SignUpPage.js";
import SignIn from "./SignInPage/SignInPage.js";
import UserContext from "../contexts/UserContext.js";

export default function App(){

    const [user, setUser] = useState([]);

    return(
        <BrowserRouter>
            <UserContext.Provider value={{ user, setUser }}>
                <Routes>
                    <Route path="/" element={<SignIn/>} />
                    <Route path="/signup" element={<SignUp/>} />
                </Routes>
            </UserContext.Provider>            
        </BrowserRouter>
    )
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header/Header.js";
import { useState } from "react";
import SignUp from "./SignUpPage/signUpPage.js";
import UserContext from "../contexts/UserContext.js";

export default function App(){

    const [user, setUser] = useState([]);

    return(
        <BrowserRouter>
            <UserContext.Provider value={{ user, setUser }}>
                <Header />
                <Routes>
                    <Route path="/signup" element={<SignUp/>} />
                </Routes>
            </UserContext.Provider>            
        </BrowserRouter>
    )
}
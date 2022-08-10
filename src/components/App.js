import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SignUp from "./SignUpPage/SignUpPage.js";
import SignIn from "./SignInPage/SignInPage.js";
import UserContext from "../contexts/UserContext.js";
import Header from "./Header/Header.js";
import UserPage from "./UserPage/UserPage.js";
import HashtagPage from "./HashtagPage/HashtagPage.js";

export default function App(){

    const [user, setUser] = useState([]);

    return(
        <BrowserRouter>
            <UserContext.Provider value={{ user, setUser }}>
            <Header />
            <Routes>
                <Route path="/" element={<SignIn/>} />
                 <Route path="/signup" element={<SignUp/>} />
                <Route path="/user/:id" element={<UserPage />} />
                <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
            </Routes>
            </UserContext.Provider>  
        </BrowserRouter>
    )
}
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header/Header.js";
import Publications from "./PublicationsPage/Publications.js";
import { UserDataProvider } from "../contexts/UserContext.js";
import SignUp from "./SignUpPage/SignUpPage.js";
import SignIn from "./SignInPage/SignInPage.js";
import UserPage from "./UserPage/UserPage.js";
import HashtagPage from "./HashtagPage/HashtagPage.js";

export default function App(){
    return(
        <BrowserRouter>
            <UserDataProvider>
            <Routes>
                <Route path="/" element={<Publications />} />
                <Route path="/" element={<SignIn/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/user/:id" element={<UserPage />} />
                <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
            </Routes>
            </UserDataProvider>  
        </BrowserRouter>
    )
}
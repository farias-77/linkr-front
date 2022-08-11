import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserDataProvider } from "../contexts/UserContext.js";
import SignUp from "./SignUpPage/SignUpPage.js";
import SignIn from "./SignInPage/SignInPage.js";
import Header from "./Header/Header.js";
import UserPage from "./UserPage/UserPage.js";
import HashtagPage from "./HashtagPage/HashtagPage.js";

export default function App(){
    return(
        <BrowserRouter>
            <UserDataProvider>
            <Header />
            <Routes>
                <Route path="/" element={<SignIn/>} />
                <Route path="/signup" element={<SignUp/>} />
                <Route path="/user/:id" element={<UserPage />} />
                <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
            </Routes>
            </UserDataProvider>  
        </BrowserRouter>
    )
}
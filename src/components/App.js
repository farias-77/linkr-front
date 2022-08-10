import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./Header/Header.js";
import UserPage from "./UserPage/UserPage.js";
import HashtagPage from "./HashtagPage/HashtagPage.js";

export default function App(){
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/user/:id" element={<UserPage />} />
                <Route path="/hashtag/:hashtag" element={<HashtagPage />} />
            </Routes>
        </BrowserRouter>
    )
}
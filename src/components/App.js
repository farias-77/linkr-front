import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserPage from "./UserPage/UserPage.js";

export default function App(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<UserPage />} />
            </Routes>
        </BrowserRouter>
    )
}
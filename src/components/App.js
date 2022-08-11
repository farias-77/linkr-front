import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header/Header.js";
import Publications from "./PublicationsPage/Publications.js";

export default function App(){
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Publications />} />
            </Routes>
        </BrowserRouter>
    )
}
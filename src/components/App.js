import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Header/Header.js";

export default function App(){
    return(
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<></>} />
            </Routes>
        </BrowserRouter>
    )
}
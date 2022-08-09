import { BrowserRouter, Router, Route } from "react-router-dom";
import UserPage from "./UserPage/UserPage.js";

export default function App(){
    return(
        <BrowserRouter>
            <Router>
                <Route path="/user/:id" element={<UserPage />} />
            </Router>
        </BrowserRouter>
    )
}
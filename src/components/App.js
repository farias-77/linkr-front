import { BrowserRouter, Router, Route } from "react-router-dom"

export default function App(){
    return(
        <BrowserRouter>
            <Router>
                <Route path="/user/:id" element={<UserPage />} />
            </Router>
        </BrowserRouter>
    )
}
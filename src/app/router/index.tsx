import { BrowserRouter, Routes, Route } from "react-router"
import Index from "../../pages";

const Rotas = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Index/>}/>
        </Routes>
        </BrowserRouter>
    );
}

export default Rotas;
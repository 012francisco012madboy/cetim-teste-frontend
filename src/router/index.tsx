import { BrowserRouter, Routes, Route } from "react-router"
import Index from "../pages";
import Product from "@/pages/product";

const Rotas = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Index/>}/>
            <Route path="/product" element={<Product/>}/>
        </Routes>
        </BrowserRouter>
    );
}

export default Rotas;
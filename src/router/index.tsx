import { BrowserRouter, Routes, Route } from "react-router"
import Index from "../pages";
import Product from "@/pages/product";
import { Index404 } from "@/pages/404";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="*" element={<Index404 />} />
                <Route path="/" element={<Index />} />
                <Route path="/product/:id" element={<Product />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;
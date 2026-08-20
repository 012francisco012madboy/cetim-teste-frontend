import Loading from "@/pages/loading";
import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router"

const Index = lazy(() => import("../pages"));
const Product = lazy(() => import("@/pages/product"));
const Index404 = lazy(() => import("@/pages/404"));

const Rotas = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="*" element={<Index404 />} />
                    <Route path="/" element={<Index />} />
                    <Route path="/product/:id" element={<Product />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    );
}

export default Rotas;
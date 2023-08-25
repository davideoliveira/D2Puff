
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login  from "../Pages/LoginPage/Login";
import Home from "../Pages/HomePage/Home";
import SalesPage from "../Pages/VendaPage/Venda";
import EstoqueManager from "../Pages/EstoquePage/Estoque";
import Financeiro from "../Pages/Financeiro/Financeiro";


export function AppRoutes() {

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element= {<Login/>}/>
                <Route path="/home" element={<Home/>}/>
                <Route path="/vendas" element={<SalesPage/>} />
                <Route path="/estoque" element={<EstoqueManager/>}/>
                <Route path="/financeiro" element={<Financeiro/>}/>
            </Routes>
        </BrowserRouter>
    )
}
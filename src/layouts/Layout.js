import { Outlet } from "react-router-dom";
import Navbar from "../Components/navbar";

export default function Layout () {
    return (
        <>
        <Navbar/>
        <Outlet/>
        </>
    )
}
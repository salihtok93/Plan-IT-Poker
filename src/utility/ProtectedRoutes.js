import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
    const [isLoggedIn,setIsLoggedIn] = useState(true);

    const checkLog = () => {
        if(localStorage.getItem('serverResponse')) {
            setIsLoggedIn(false);
        } else {
            setIsLoggedIn(true);
        }
    };
    useEffect(() => {
        checkLog();
    },[]);


    return isLoggedIn ? <Outlet/> : <Navigate to="/home"/>
}

export default ProtectedRoutes
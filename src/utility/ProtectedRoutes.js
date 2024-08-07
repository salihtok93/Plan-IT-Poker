import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoutes() {
    const [isLoggedIn,setIsLoggedIn] = useState(false);

    const checkLog = () => {
        if(localStorage.getItem('serverResponse')) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    };
    useEffect(() => {
        checkLog();
    },[]);


    return isLoggedIn === true ? <Outlet/> : <Navigate to="register"/>
}

export default ProtectedRoutes
import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useSelector } from "react-redux";
import {useParams} from 'react-router-dom'
const RequireAuth = ({ allowedRoles }) => {
    const  user  = useSelector((state) => state.user);
    const location = useLocation();


    const carID = useParams()

///lisings



    return (
      !user ? <Navigate to="/" state={{ from: location }} replace />
            :  
            <Outlet /> 

    );
}

export default RequireAuth;
import React from 'react';
import useAuth from '../hook/useAuth';
import Loader from '../pages/Loader/Loader';
import { Navigate, useLocation } from 'react-router';

const PrivateRoutes = ({children}) => {
    const location = useLocation();
    console.log(location)
    const {user,loading} = useAuth();
    if(loading) return <Loader></Loader>

    if(!user){
        return <Navigate state={location.pathname} to='/login'>Login</Navigate>
    }
   return children;
};

export default PrivateRoutes;

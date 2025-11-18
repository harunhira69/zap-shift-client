import React from 'react';
import useAuth from '../hook/useAuth';
import Loader from '../pages/Loader/Loader';
import { Navigate } from 'react-router';

const PrivateRoutes = ({children}) => {
    const {user,loading} = useAuth();
    if(loading) return <Loader></Loader>

    if(!user){
        return <Navigate to='/login'>Login</Navigate>
    }
   return children;
};

export default PrivateRoutes;

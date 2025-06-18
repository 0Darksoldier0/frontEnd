import React from 'react';
import { Navigate } from 'react-router-dom';

const DefaultRoute = () => {

    return <Navigate to="/" replace />;

};

export default DefaultRoute;
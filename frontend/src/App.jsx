import React from 'react';
import AppRoutes from './routes/AppRoutes';
import UserProvider from '../context/UserProvider'; // Ensure this matches the file name exactly

const App = () => {
    return (
        <UserProvider>
            <AppRoutes />
        </UserProvider>
    );
};

export default App;
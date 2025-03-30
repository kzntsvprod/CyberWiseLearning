import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const loginUser = async (token) => {
        try {
            sessionStorage.setItem('token', token);
            await fetchUserData();
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const logoutUser = () => {
        sessionStorage.removeItem('token');
        setUser(null);
    };

    const fetchUserData = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = sessionStorage.getItem('token');
            if (!token) {
                setLoading(false);
                return;
            }

            // Перевіряємо чи токен валідний
            const decoded = jwtDecode(token);
            if (decoded.exp * 1000 < Date.now()) {
                throw new Error('Токен протерміновано');
            }

            const response = await fetch('http://localhost:5000/api/auth/data', {
                headers: { 'Authorization': token }
            });

            if (!response.ok) {
                throw new Error('Помилка отримання даних');
            }

            const data = await response.json();
            setUser(data.user);
        } catch (err) {
            setError(err.message);
            logoutUser();
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <UserContext.Provider value={{
            user,
            loading,
            error,
            loginUser,
            logoutUser,
            refetchUser: fetchUserData
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
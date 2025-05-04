import React, { createContext, useContext, useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(true);
    const [errorUsers, setErrorUsers] = useState(null);

    const getToken = () => {
        return localStorage.getItem('token') || sessionStorage.getItem('token');
    };

    const loginUser = async (token, rememberMe = false) => {
        try {
            // Зберігаємо токен у вибране сховище
            if (rememberMe) {
                localStorage.setItem('token', token);
            } else {
                sessionStorage.setItem('token', token);
            }
            await fetchUserData();
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const logoutUser = async () => {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        setUser(null);
        if (user?._id) {
            try {
                await fetch(`http://localhost:5000/api/user/${user._id}/status`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ isOnline: false }),
                });
            } catch (err) {
                console.error('Помилка оновлення статусу:', err);
            }
        }
    };

    const fetchUserData = async () => {
        try {
            setLoading(true);
            setError(null);

            const token = getToken();
            if (!token) {
                setLoading(false);
                return;
            }

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

            await fetch(`http://localhost:5000/api/user/${data.user._id}/status`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isOnline: true }),
            });
        } catch (err) {
            setError(err.message);
            logoutUser();
        } finally {
            setLoading(false);
        }
    };

    const updateUser = async (updatedData) => {
        try {
            const token = getToken();
            if (!token) throw new Error('Токен не знайдено');

            const response = await fetch('http://localhost:5000/api/user/update', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                },
                body: JSON.stringify(updatedData)
            });

            const data = await response.json();
            if (!response.ok) {
                alert(data.message || "Помилка зміни електронної адреси");
                throw new Error(data.message || "Помилка зміни електронної адреси");
            }

            setUser(prev => ({ ...prev, ...updatedData }));
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const updateAvatar = async (file) => {
        try {
            const token = getToken();
            if (!token) throw new Error('Токен не знайдено');

            const formData = new FormData();
            formData.append('avatar', file);

            const response = await fetch('http://localhost:5000/api/user/avatar', {
                method: 'POST',
                headers: {
                    'Authorization': token
                },
                body: formData
            });

            if (!response.ok) {
                throw new Error('Помилка завантаження аватарки');
            }

            const data = await response.json();
            setUser(prev => ({ ...prev, avatar: data.avatar }));
        } catch (err) {
            setError(err.message);
            throw err;
        }
    };

    const fetchAllUsers = async () => {
        setLoadingUsers(true);
        setErrorUsers(null);

        try {
            const response = await fetch("http://localhost:5000/api/user/users");

            if (!response.ok) {
                throw new Error("Failed to fetch users");
            }

            const data = await response.json();
            const filteredData = data.filter(user => user.role === "user");
            setUsers(filteredData);
        } catch (err) {
            setErrorUsers(err.message);
        } finally {
            setLoadingUsers(false);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchAllUsers();
    }, []);

    return (
        <UserContext.Provider value={{
            user,
            loading,
            error,
            users,
            loadingUsers,
            errorUsers,
            loginUser,
            logoutUser,
            refetchUser: fetchUserData,
            updateUser,
            updateAvatar,
            fetchAllUsers,
            isAdmin: user?.role === 'admin'
        }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
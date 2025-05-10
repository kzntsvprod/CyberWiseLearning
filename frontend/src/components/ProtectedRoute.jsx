import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

const ProtectedRoute = () => {
    const { getToken } = useUser();
    const token = getToken();

    if (!token) {
        // Якщо користувач не авторизований, перенаправляємо на сторінку входу
        return <Navigate to="/" replace />;
    }

    // Якщо користувач авторизований, відображаємо дочірній компонент
    return <Outlet />;
};

export default ProtectedRoute;
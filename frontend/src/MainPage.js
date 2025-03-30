import React from "react";
import { useUser } from "./contexts/UserContext";

function MainPage() {
    const { user, loading } = useUser();

    if (loading) return <div>Завантаження...</div>;
    if (!user) return <div>Будь ласка, увійдіть в систему</div>;

    return (
        <div>
            <h1>Профіль користувача</h1>
            <p>Email: {user.email}</p>
        </div>
    );
}

export default MainPage;
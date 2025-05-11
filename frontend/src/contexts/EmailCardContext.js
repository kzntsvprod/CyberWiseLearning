import React, { createContext, useContext, useEffect, useState } from "react";

const EmailCardContext = createContext();

export const useCard = () => useContext(EmailCardContext);

export const EmailCardProvider = ({ children }) => {
    const [cards, setCards] = useState([]);

    const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

    const fetchCards = async () => {
        try {
            const res = await fetch(`${BACKEND_URL}/api/cards/data`);
            const data = await res.json();
            setCards(data);
        } catch (err) {
            console.error('Помилка при завантаженні карток:', err);
        }
    };

    useEffect(() => {
        fetchCards();
    }, []);

    return (
        <EmailCardContext.Provider value={{ cards, fetchCards }}>
            {children}
        </EmailCardContext.Provider>
    );
};
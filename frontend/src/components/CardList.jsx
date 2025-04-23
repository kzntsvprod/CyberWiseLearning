import React, { useState } from "react";
import { useCard } from "../contexts/EmailCardContext";

const CardList = () => {
    const { cards, fetchCards } = useCard();
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    const handleCardClick = (index, isPhishing) => {
        if (selectedIndex === null) {
            setSelectedIndex(index);
            setIsCorrect(isPhishing);
            setTimeout(() => {
                fetchCards();
                setSelectedIndex(null);
                setIsCorrect(null);
            }, 1500); // Час для того, щоб побачити результат перед оновленням
        }
    };

    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {cards.map((card, index) => (
                <Card
                    key={index}
                    html={card.html}
                    css={card.css}
                    isSelected={selectedIndex === index}
                    isCorrect={isCorrect}
                    onClick={() => handleCardClick(index, card.isPhishing)}
                />
            ))}
        </div>
    );
};

const Card = ({ html, css, isSelected, isCorrect, onClick }) => {
    let borderColor = '#ccc';
    if (isSelected && isCorrect === true) {
        borderColor = 'green';
    } else if (isSelected && isCorrect === false) {
        borderColor = 'red';
    }

    return (
        <div
            onClick={onClick}
            style={{
                border: `3px solid ${borderColor}`,
                padding: '10px',
                borderRadius: '10px',
                cursor: 'pointer',
                backgroundColor: '#f5f5f5',
                maxWidth: '420px'
            }}
        >
            <style>{css}</style>
            <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
    );
};

export default CardList;
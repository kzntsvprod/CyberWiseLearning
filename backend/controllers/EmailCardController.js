import EmailCard from "../models/EmailCard.js";

// Отримання одної випадкової фішингової і одної не фішингової картки
export const getRandomCards = async (req, res) => {
    try {
        const phishingCard = await EmailCard.aggregate([
            { $match: { isPhishing: true } },
            { $sample: { size: 1 } }
        ]);

        const legitimateCard = await EmailCard.aggregate([
            { $match: { isPhishing: false } },
            { $sample: { size: 1 } }
        ]);

        const cards = [...phishingCard, ...legitimateCard];

        // Тасування порядку карток
        const shuffledCards = cards.sort(() => Math.random() - 0.5);

        res.json(shuffledCards);
    } catch (error) {
        res.status(500).json({ message: 'Помилка при отриманні карток' });
    }
};
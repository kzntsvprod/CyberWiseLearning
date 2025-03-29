import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Перевіряємо, чи існує такий користувач
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Користувач вже існує" });

        // Хешуємо пароль
        const hashedPassword = await bcrypt.hash(password, 10);

        // Створюємо користувача
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Реєстрація успішна" });
    } catch (error) {
        res.status(500).json({ message: "Помилка сервера" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Перевіряємо, чи є користувач
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Невірний email або пароль" });

        // Перевіряємо пароль
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Невірний email або пароль" });

        // Генеруємо токен
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token, userId: user._id });
    } catch (error) {
        res.status(500).json({ message: "Помилка сервера" });
    }
};

export const authMiddleware = (req, res, next) => {
    const token = req.header("Authorization");
    if (!token) return res.status(401).json({ message: "Немає авторизації" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(403).json({ message: "Невірний токен" });
    }
};

export const profileUser = async(req, res) => {
    try {
        const user = await User.findById(req.userId).select("-password");
        res.status(200).json({user, message: "Get user data"});
    } catch (error) {
        res.status(500).json({ message: "Помилка сервера" });
    }
};
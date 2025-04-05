import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";

const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    return password.length >= minLength && hasNumber && hasLetter;
};

export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!password) {
            alert("Введіть свої дані!");
            return;
        }

        if(!email) {
            alert("Введіть свої дані!");
            return;
        }

        // Валідація email
        if (!email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return res.status(400).json({ message: "Будь ласка, введіть дійсний email" });
        }

        if (!validatePassword(password)) {
            alert("Пароль має містити не менше 8 символів, включати цифри та літери.");
            return;
        }

        // Перевірка, чи існує такий користувач
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Користувач вже існує" });

        // Хешування пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Створення користувача
        const newUser = new User({ email, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ token, userId: newUser._id });
    } catch (error) {
        res.status(500).json({ message: "Помилка сервера" });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if(!password) {
            alert("Введіть свої дані!");
            return;
        }

        if(!email) {
            alert("Введіть свої дані!");
            return;
        }

        // Перевірка, чи є користувач
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Невірний email або пароль" });

        // Перевірка пароля
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Невірний email або пароль" });

        // Генерування токена
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

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if(!email) {
            alert("Введіть адресу електронної пошти!");
            return;
        }

        // Валідація email
        if (!email || !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return res.status(400).json({ message: "Будь ласка, введіть дійсний email" });
        }

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Невірний email або пароль" });

        if (!user) {
            return res.json({ message: "Якщо email існує, лист для відновлення буде надіслано" });
        }

        // Генерація унікального токена
        const token = crypto.randomBytes(32).toString("hex");
        user.resetToken = token;
        user.resetTokenExpiry = Date.now() + 3600000; // 1 година = 3600000 мс
        await user.save();

        // Налаштування поштового сервера
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS
            }
        });

        const resetUrl = `${process.env.CLIENT_URL || 'http://localhost:3000'}/reset-password/${token}`;

        const mailOptions = {
            from: `"CyberWise Learning" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Відновлення пароля",
            html: `
                <h2>Відновлення пароля</h2>
                <p>Ви отримали цей лист, тому що хтось (сподіваємось, ви) запросив скидання пароля для вашого акаунта.</p>
                <p>Натисніть на посилання нижче, щоб встановити новий пароль:</p>
                <a href="${resetUrl}">${resetUrl}</a>
                <p>Якщо ви не запитували скидання пароля, проігноруйте цей лист.</p>
                <p>Посилання дійсне протягом 1 години.</p>
            `
        };

        await transporter.sendMail(mailOptions);
        res.json({ message: "Якщо email існує, лист для відновлення буде надіслано" });

    } catch (error) {
        console.error("Помилка в forgotPassword:", error);
        res.status(500).json({ message: "Помилка сервера при обробці запиту" });
    }
};

// Встановлення нового пароля
export const resetPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;

        if (!password) {
            alert("Будь ласка, введіть новий пароль");
            return;
        }

        if (!validatePassword(password)) {
            alert("Пароль має містити не менше 8 символів, включати цифри та літери.");
            return;
        }

        console.log("Received token:", token); // Логування для дебагінгу

        if (!token || !password) {
            return res.status(400).json({ message: "Необхідно надати токен та новий пароль" });
        }

        const user = await User.findOne({
            resetToken: token,
            resetTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            console.log("Token not found or expired"); // Додаткове логування
            return res.status(400).json({
                message: "Неправильний або прострочений токен. Будь ласка, запросіть новий лист для скидання пароля."
            });
        }

        // Хешування нового паролю
        const hashedPassword = await bcrypt.hash(password, 10);
        user.password = hashedPassword;
        user.resetToken = undefined;
        user.resetTokenExpiry = undefined;
        await user.save();

        res.json({ message: "Пароль успішно змінено!" });

    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({
            message: "Помилка сервера при зміні пароля",
            error: process.env.NODE_ENV === 'development' ? error.message : undefined
        });
    }
};
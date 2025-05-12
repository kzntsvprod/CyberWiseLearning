import User from '../models/User.js';
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import multer from "multer";

// Ініціалізація multer для збереження у пам’яті
const upload = multer({ storage: multer.memoryStorage() });

const validatePassword = (password) => {
    const minLength = 8;
    const hasNumber = /\d/.test(password);
    const hasLetter = /[a-zA-Z]/.test(password);
    const noSpaces = !/\s/.test(password);
    return password.length >= minLength && hasNumber && hasLetter && noSpaces;
};

export const updateUser = async (req, res) => {
    try {
        const { name, email } = req.body;
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: "Користувача не знайдено" });

        if (name !== undefined) {
            if (typeof name !== "string" || name.trim() === "") {
                return res.status(400).json({ message: "Ім'я не може бути порожнім" });
            }
            user.name = name;
        }

        if (email !== undefined) {
            if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
                return res.status(400).json({ message: "Будь ласка, введіть дійсний email" });
            }
            user.email = email;
        }

        await user.save();

        res.json({ message: "Дані оновлено успішно" });
    } catch (err) {
        res.status(500).json({ message: "Помилка при оновленні даних" });
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

export const uploadAvatar = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if (!user) return res.status(404).json({ message: "Користувача не знайдено" });

        if (!req.file) return res.status(400).json({ message: "Файл не надано" });

        // Перевірка розміру фото
        const maxSize = 4 * 1024 * 1024;
        if (req.file.size > maxSize) {
            return res.status(400).json({ message: "Розмір файлу перевищує 4 МБ" });
        }

        // Конвертація буфера в Base64
        const base64Image = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;

        user.avatar = base64Image;
        await user.save();

        res.json({ message: "Аватар оновлено", avatar: base64Image });
    } catch (err) {
        res.status(500).json({ message: "Помилка при оновленні аватарки" });
    }
};

// Експорт upload як middleware
export const uploadMiddleware = upload.single("avatar");

export const resetPassword = async (req, res) => {
    const { email, currentPassword, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Користувача не знайдено" });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Неправильний поточний пароль" });
        }

        if (!validatePassword(newPassword)) {
            return res.status(401).json({ message: "Пароль має містити не менше 8 символів, включати цифри та літери та не містити пробілів." });
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;

        await user.save();

        return res.status(200).json({ message: "Пароль успішно змінено" });
    } catch (error) {
        console.error("Помилка при зміні пароля:", error);
        return res.status(500).json({ message: "Внутрішня помилка сервера" });
    }
};

export const markModuleAsViewed = async (req, res) => {
    const { userId, moduleId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Користувача не знайдено" });
        }

        if (!user.viewedModules.includes(moduleId)) {
            user.viewedModules.push(moduleId);
            await user.save();
        }

        res.status(200).json({ message: "Модуль збережено в прогресі" });
    } catch (err) {
        res.status(500).json({ message: "Помилка сервера", error: err.message });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { isOnline } = req.body;

        await User.findByIdAndUpdate(id, { isOnline });

        res.status(200).json({ message: 'Статус оновлено' });
    } catch (err) {
        res.status(500).json({ message: 'Помилка оновлення статусу' });
    }
};
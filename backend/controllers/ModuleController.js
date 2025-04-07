import Module from "../models/Module.js";

export const getModules = async (req, res) => {
    try {
        const modules = await Module.find();
        res.json(modules);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
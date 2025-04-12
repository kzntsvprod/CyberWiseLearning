import Module from "../models/Module.js";

export const getModules = async (req, res) => {
    try {
        const modules = await Module.find();
        res.json(modules);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getModuleById = async (req, res) => {
    try {
        const module = await Module.findById(req.params.id);
        if (!module) return res.status(404).json({ error: "Module not found" });
        res.json(module);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
import React, {createContext, useContext, useEffect, useState} from "react";

const ModuleContext = createContext();

export const ModuleProvider = ({ children }) => {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    const [module, setModule] = useState(null);
    const [moduleLoading, setModuleLoading] = useState(false);
    const [moduleError, setModuleError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/modules/data")
            .then((res) => {
                if (!res.ok) throw new Error("Network error");
                return res.json();
            })
            .then((data) => {
                setModules(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err);
                setLoading(false);
            });
    }, []);

    const filteredModules = modules.filter(module =>
        module.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const setModuleById = (id) => {
        setModuleLoading(true);
        setModule(null);
        fetch(`http://localhost:5000/api/modules/data/${id}`)
            .then((res) => {
                if (!res.ok) throw new Error("Module not found");
                return res.json();
            })
            .then((data) => {
                setModule(data);
                setModuleLoading(false);
            })
            .catch((err) => {
                setModuleError(err);
                setModuleLoading(false);
            });
    };

    return (
        <ModuleContext.Provider
            value={{
                modules: filteredModules,
                loading,
                error,
                searchQuery,
                setSearchQuery,
                module,
                moduleLoading,
                moduleError,
                setModuleById,
            }}
        >
            {children}
        </ModuleContext.Provider>
    );
};

export const useModule = () => useContext(ModuleContext);
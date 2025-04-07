import React, {createContext, useContext, useEffect, useState} from "react";

const ModuleContext = createContext();

export const ModuleProvider = ({ children }) => {
    const [modules, setModules] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5000/api/modules")
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

    return (
        <ModuleContext.Provider value={{ modules, loading, error }}>
            {children}
        </ModuleContext.Provider>
    );
};

export const useModule = () => useContext(ModuleContext);
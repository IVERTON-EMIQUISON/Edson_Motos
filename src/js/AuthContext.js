import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userToken, setUserToken] = useState(null);

    useEffect(() => {
        // Verifica se o usuário já está logado ao carregar a página
        const token = localStorage.getItem('userToken');
        if (token) {
            setIsAuthenticated(true);
            setUserToken(token);
        }
    }, []);

    const login = (token) => {
        setIsAuthenticated(true);
        setUserToken(token);
        localStorage.setItem('userToken', token);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUserToken(null);
        localStorage.removeItem('userToken');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, userToken, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
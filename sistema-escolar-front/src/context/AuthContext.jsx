import { createContext, useState, useEffect } from 'react';

// Se removió el error "public const" y se usa el estándar de ES6 "export const"
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [username, setUsername] = useState(localStorage.getItem('username') || null);

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
        } else {
            localStorage.removeItem('token');
            localStorage.removeItem('username');
        }
    }, [token, username]);

    const logout = () => {
        setToken(null);
        setUsername(null);
    };

    return (
        <AuthContext.Provider value={{ token, setToken, username, setUsername, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
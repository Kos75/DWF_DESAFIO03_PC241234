import { useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import Login from './components/Login';
import Register from './components/Register';
import Alumnos from './components/Alumnos';
import Profesores from './components/Profesores';
import Materias from './components/Materias';
import Notas from './components/Notas';

function AppContent() {
    const { token, username, logout } = useContext(AuthContext);
    const [view, setView] = useState('login'); // login | register
    const [tab, setTab] = useState('alumnos'); // alumnos | profesores | materias | notas

    if (!token) {
        return (
            <div className="auth-wrapper">
                <h1>Sistema de Registro Académico UDB</h1>
                {view === 'login' ? (
                    <Login onToggleRegister={() => setView('register')} />
                ) : (
                    <Register onToggleLogin={() => setView('login')} />
                )}
            </div>
        );
    }

    return (
        <div className="dashboard-container">
            <header className="main-header">
                <h2>Panel Escolar — Bienvenido, <u>{username}</u></h2>
                <button onClick={logout} className="btn-logout">Cerrar Sesión</button>
            </header>
            <nav className="navbar">
                <button className={tab === 'alumnos' ? 'active' : ''} onClick={() => setTab('alumnos')}>Alumnos</button>
                <button className={tab === 'profesores' ? 'active' : ''} onClick={() => setTab('profesores')}>Profesores</button>
                <button className={tab === 'materias' ? 'active' : ''} onClick={() => setTab('materias')}>Materias</button>
                <button className={tab === 'notas' ? 'active' : ''} onClick={() => setTab('notas')}>Notas</button>
            </nav>
            <main className="content-area">
                {tab === 'alumnos' && <Alumnos />}
                {tab === 'profesores' && <Profesores />}
                {tab === 'materias' && <Materias />}
                {tab === 'notas' && <Notas />}
            </main>
        </div>
    );
}

export default function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}
import { AuthProvider } from './context/AuthContext';
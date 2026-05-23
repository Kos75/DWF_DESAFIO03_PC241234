import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Login({ onToggleRegister }) {
    const { setToken, setUsername } = useContext(AuthContext);
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const res = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            if (res.ok) {
                setToken(data.token);
                setUsername(data.username);
            } else {
                setError('Credenciales inválidas');
            }
        } catch (err) {
            setError('Error de conexión con el servidor');
        }
    };

    return (
        <div className="auth-card">
            <h2>Iniciar Sesión</h2>
            {error && <p className="error-msg">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Usuario:</label>
                    <input type="text" name="username" value={form.username} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Contraseña:</label>
                    <input type="password" name="password" value={form.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn-primary">Ingresar</button>
            </form>
            <p>¿No tienes una cuenta? <span className="link" onClick={onToggleRegister}>Regístrate aquí</span></p>
        </div>
    );
}
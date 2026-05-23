import { useState } from 'react';

export default function Register({ onToggleLogin }) {
    const [form, setForm] = useState({ username: '', password: '' });
    const [msg, setMsg] = useState({ type: '', text: '' });

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMsg({ type: '', text: '' });
        try {
            const res = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            if (res.ok) {
                setMsg({ type: 'success', text: '¡Usuario registrado! Ya puedes iniciar sesión.' });
                setForm({ username: '', password: '' });
            } else {
                const data = await res.json();
                setMsg({ type: 'error', text: data.error || 'Error al registrar' });
            }
        } catch (err) {
            setMsg({ type: 'error', text: 'Error de conexión' });
        }
    };

    return (
        <div className="auth-card">
            <h2>Registro de Usuario</h2>
            {msg.text && <p className={msg.type === 'success' ? 'success-msg' : 'error-msg'}>{msg.text}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Nuevo Usuario:</label>
                    <input type="text" name="username" value={form.username} onChange={handleChange} required />
                </div>
                <div className="form-group">
                    <label>Contraseña:</label>
                    <input type="password" name="password" value={form.password} onChange={handleChange} required />
                </div>
                <button type="submit" className="btn-primary">Registrar</button>
            </form>
            <p>¿Ya tienes cuenta? <span className="link" onClick={onToggleLogin}>Inicia sesión</span></p>
        </div>
    );
}
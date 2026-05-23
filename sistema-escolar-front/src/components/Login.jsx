import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Login({ onToggleRegister }) {
    const { setToken, setUsername } = useContext(AuthContext);
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Limpiar errores previos

        try {
            const res = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            // 1. Si las credenciales son válidas e ingresa exitosamente
            if (res.ok) {
                const data = await res.json();
                setToken(data.token);
                setUsername(data.username);
                return;
            }

            // 2. Si el servidor respondió pero con código de rechazo (401 o 403)
            if (res.status === 401 || res.status === 403) {
                setError('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
            } else {
                setError(`Error en el servidor: Código ${res.status}`);
            }

        } catch (err) {
            // 3. Este bloque solo se ejecuta si el backend está apagado o incomunicado
            console.error(err);
            setError('No se pudo establecer conexión con el servidor. Verifica que esté encendido.');
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Iniciar Sesión</h2>
                <p>Bienvenido al Sistema Escolar</p>
                
                {error && (
                    <p className="error-msg" style={{
                        background: 'var(--danger-bg)', 
                        color: 'var(--danger-text)', 
                        padding: '0.75rem', 
                        borderRadius: '8px', 
                        marginBottom: '1rem',
                        fontSize: '0.9rem',
                        fontWeight: '500'
                    }}>
                        {error}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label>Usuario:</label>
                        <input 
                            type="text" 
                            name="username" 
                            value={form.username} 
                            onChange={handleChange} 
                            placeholder="Ingrese su usuario"
                            required 
                        />
                    </div>
                    
                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input 
                            type="password" 
                            name="password" 
                            value={form.password} 
                            onChange={handleChange} 
                            placeholder="••••••••"
                            required 
                        />
                    </div>
                    
                    <button type="submit" className="btn-save" style={{ marginTop: '0.5rem', width: '100%' }}>
                        Ingresar al Sistema
                    </button>
                </form>
                
                <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    ¿No tienes una cuenta?{' '}
                    <span 
                        className="link" 
                        onClick={onToggleRegister} 
                        style={{ color: '#4f46e5', fontWeight: '600', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        Regístrate aquí
                    </span>
                </p>
            </div>
        </div>
    );
}
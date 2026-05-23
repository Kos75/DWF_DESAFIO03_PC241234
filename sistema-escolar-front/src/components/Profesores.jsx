import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Profesores() {
    const { token } = useContext(AuthContext);
    const [profesores, setProfesores] = useState([]);
    const [nombre, setNombre] = useState('');
    const [editId, setEditId] = useState(null);

    const cargar = async () => {
        const res = await fetch('http://localhost:8080/api/profesores', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (res.ok) setProfesores(await res.json());
    };

    useEffect(() => { cargar(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editId ? `http://localhost:8080/api/profesores/${editId}` : 'http://localhost:8080/api/profesores';
        const method = editId ? 'PUT' : 'POST';

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify({ nombre })
        });
        if (res.ok) {
            setNombre('');
            setEditId(null);
            cargar();
        }
    };

    const handleEliminar = async (id) => {
        if(confirm('¿Desea eliminar este profesor?')) {
            const res = await fetch(`http://localhost:8080/api/profesores/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) cargar();
        }
    };

    return (
        <div className="crud-container">
            <h3>Gestión de Profesores</h3>
            <form onSubmit={handleSubmit} className="crud-form">
                <input type="text" placeholder="Nombre completo del profesor" value={nombre} onChange={e => setNombre(e.target.value)} required />
                <button type="submit" className="btn-save">{editId ? 'Actualizar' : 'Agregar'}</button>
                {editId && <button type="button" onClick={() => { setEditId(null); setNombre(''); }}>Cancelar</button>}
            </form>
            <table className="crud-table">
                <thead>
                    <tr><th>ID</th><th>Nombre</th><th>Acciones</th></tr>
                </thead>
                <tbody>
                    {profesores.map(p => (
                        <tr key={p.id}>
                            <td>{p.id}</td>
                            <td>{p.nombre}</td>
                            <td>
                                <button className="btn-edit" onClick={() => { setEditId(p.id); setNombre(p.nombre); }}>Editar</button>
                                <button className="btn-delete" onClick={() => handleEliminar(p.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Materias() {
    const { token } = useContext(AuthContext);
    const [materias, setMaterias] = useState([]);
    const [profesores, setProfesores] = useState([]);
    const [form, setForm] = useState({ nombre: '', idProfesor: '' });
    const [editId, setEditId] = useState(null);

    const cargarData = async () => {
        const headers = { 'Authorization': `Bearer ${token}` };
        const resM = await fetch('http://localhost:8080/api/materias', { headers });
        const resP = await fetch('http://localhost:8080/api/profesores', { headers });
        if (resM.ok) setMaterias(await resM.json());
        if (resP.ok) setProfesores(await resP.json());
    };

    useEffect(() => { cargarData(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editId ? `http://localhost:8080/api/materias/${editId}` : 'http://localhost:8080/api/materias';
        const method = editId ? 'PUT' : 'POST';

        const payload = {
            nombre: form.nombre,
            profesor: form.idProfesor ? { id: parseInt(form.idProfesor) } : null
        };

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            setForm({ nombre: '', idProfesor: '' });
            setEditId(null);
            cargarData();
        }
    };

    const handleEliminar = async (id) => {
        if (confirm('¿Eliminar materia?')) {
            const res = await fetch(`http://localhost:8080/api/materias/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) cargarData();
        }
    };

    return (
        <div className="crud-container">
            <h3>Gestión de Materias</h3>
            <form onSubmit={handleSubmit} className="crud-form">
                <input type="text" placeholder="Nombre de la Materia" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
                <select value={form.idProfesor} onChange={e => setForm({...form, idProfesor: e.target.value})}>
                    <option value="">Seleccione un Profesor</option>
                    {profesores.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
                </select>
                <button type="submit" className="btn-save">{editId ? 'Actualizar' : 'Agregar Materia'}</button>
            </form>
            <table className="crud-table">
                <thead>
                    <tr><th>N°</th><th>Materia</th><th>Profesor Asignado</th><th>Acciones</th></tr>
                </thead>
                <tbody>
                    {materias.map((m, index) => (
                        <tr key={m.id}>
                            <td>{index + 1}</td>
                            <td>{m.nombre}</td>
                            <td>{m.profesor ? m.profesor.nombre : 'Sin asignar'}</td>
                            <td>
                                <button className="btn-edit" onClick={() => { setEditId(m.id); setForm({ nombre: m.nombre, idProfesor: m.profesor?.id || '' }); }}>Editar</button>
                                <button className="btn-delete" onClick={() => handleEliminar(m.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
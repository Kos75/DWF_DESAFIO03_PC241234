import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Alumnos() {
    const { token } = useContext(AuthContext);
    const [alumnos, setAlumnos] = useState([]);
    const [materias, setMaterias] = useState([]);
    const [form, setForm] = useState({ nombre: '', apellido: '', materiasIds: [] });
    const [editId, setEditId] = useState(null);

    const cargarData = async () => {
        const headers = { 'Authorization': `Bearer ${token}` };
        const resA = await fetch('http://localhost:8080/api/alumnos', { headers });
        const resM = await fetch('http://localhost:8080/api/materias', { headers });
        if (resA.ok) setAlumnos(await resA.json());
        if (resM.ok) setMaterias(await resM.json());
    };

    useEffect(() => { cargarData(); }, []);

    const handleCheckboxChange = (id) => {
        const { materiasIds } = form;
        if (materiasIds.includes(id)) {
            setForm({ ...form, materiasIds: materiasIds.filter(mid => mid !== id) });
        } else {
            setForm({ ...form, materiasIds: [...materiasIds, id] });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = editId ? `http://localhost:8080/api/alumnos/${editId}` : 'http://localhost:8080/api/alumnos';
        const method = editId ? 'PUT' : 'POST';

        const payload = {
            nombre: form.nombre,
            apellido: form.apellido,
            materias: form.materiasIds.map(id => ({ id }))
        };

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(payload)
        });
        if (res.ok) {
            setForm({ nombre: '', apellido: '', materiasIds: [] });
            setEditId(null);
            cargarData();
        }
    };

    const handleEliminar = async (id) => {
        if (confirm('¿Eliminar alumno?')) {
            const res = await fetch(`http://localhost:8080/api/alumnos/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) cargarData();
        }
    };

    return (
        <div className="crud-container">
            <h3>Gestión de Alumnos</h3>
            <form onSubmit={handleSubmit} className="crud-form">
                <input type="text" placeholder="Nombre" value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required />
                <input type="text" placeholder="Apellido" value={form.apellido} onChange={e => setForm({...form, apellido: e.target.value})} required />
                
                <div className="checkbox-group">
                    <strong style={{gridColumn: '1/-1', marginBottom: '0.25rem', color: '#64748b'}}>Inscribir Materias:</strong>
                    {materias.map(m => (
                        <label key={m.id} className="checkbox-label">
                            <input type="checkbox" checked={form.materiasIds.includes(m.id)} onChange={() => handleCheckboxChange(m.id)} />
                            <span>{m.nombre}</span>
                        </label>
                    ))}
                </div>
                <button type="submit" className="btn-save">{editId ? 'Actualizar' : 'Registrar Alumno'}</button>
            </form>

            <table className="crud-table">
                <thead>
                    <tr><th>N°</th><th>Nombre Completo</th><th>Materias Inscritas</th><th>Acciones</th></tr>
                </thead>
                <tbody>
                    {alumnos.map((a, index) => (
                        <tr key={a.id}>
                            <td>{index + 1}</td>
                            <td>{a.nombre} {a.apellido}</td>
                            <td>{a.materias?.map(m => m.nombre).join(', ') || 'Ninguna'}</td>
                            <td>
                                <button className="btn-edit" onClick={() => { setEditId(a.id); setForm({ nombre: a.nombre, apellido: a.apellido, materiasIds: a.materias?.map(m => m.id) || [] }); }}>Editar</button>
                                <button className="btn-delete" onClick={() => handleEliminar(a.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Notas() {
    const { token } = useContext(AuthContext);
    const [alumnos, setAlumnos] = useState([]);
    const [notas, setNotas] = useState([]);
    const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);
    const [materiaSeleccionada, setMateriaSeleccionada] = useState('');
    
    // Estado de las 4 evaluaciones individuales
    const [examenes, setExamenes] = useState({ ex1: '', ex2: '', ex3: '', ex4: '' });

    const cargarDatos = async () => {
        const headers = { 'Authorization': `Bearer ${token}` };
        const resA = await fetch('http://localhost:8080/api/alumnos', { headers });
        const resN = await fetch('http://localhost:8080/api/notas', { headers });
        if (resA.ok) setAlumnos(await resA.json());
        if (resN.ok) setNotas(await resN.json());
    };

    useEffect(() => { cargarDatos(); }, []);

    // Calcula el promedio dinámicamente en el front
    const calcularNotaFinal = () => {
        const { ex1, ex2, ex3, ex4 } = examenes;
        const n1 = parseFloat(ex1) || 0;
        const n2 = parseFloat(ex2) || 0;
        const n3 = parseFloat(ex3) || 0;
        const n4 = parseFloat(ex4) || 0;
        return ((n1 + n2 + n3 + n4) / 4).toFixed(2);
    };

    const registrarNota = async (e) => {
        e.preventDefault();
        if (!alumnoSeleccionado || !materiaSeleccionada) return;

        const notaFinal = calcularNotaFinal();
        
        // Buscamos si ya existe una nota previa registrada para este alumno en esta materia
        const notaExistente = notas.find(n => n.alumno?.id === alumnoSeleccionado.id && n.materia?.id === parseInt(materiaSeleccionada));
        
        const url = notaExistente ? `http://localhost:8080/api/notas/${notaExistente.id}` : 'http://localhost:8080/api/notas';
        const method = notaExistente ? 'PUT' : 'POST';

        const payload = {
            alumno: { id: alumnoSeleccionado.id },
            materia: { id: parseInt(materiaSeleccionada) },
            calificacion: parseFloat(notaFinal)
        };

        const res = await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            body: JSON.stringify(payload)
        });

        if (res.ok) {
            alert('Calificaciones guardadas y nota final actualizada.');
            setAlumnoSeleccionado(null);
            setMateriaSeleccionada('');
            setExamenes({ ex1: '', ex2: '', ex3: '', ex4: '' });
            cargarDatos();
        }
    };

    const seleccionarAlumno = (alumno) => {
        setAlumnoSeleccionado(alumno);
        setMateriaSeleccionada('');
        setExamenes({ ex1: '', ex2: '', ex3: '', ex4: '' });
    };

    return (
        <div className="crud-container">
            <h3>Gestión y Control de Calificaciones</h3>
            
            <div className="notas-layout">
                {/* Panel Izquierdo: Lista de Alumnos */}
                <div>
                    <h4 style={{color: 'var(--text-muted)', marginBottom: '1rem'}}>Seleccione un Alumno</h4>
                    <table className="crud-table">
                        <thead>
                            <tr><th>N°</th><th>Alumno</th><th>Notas Registradas</th></tr>
                        </thead>
                        <tbody>
                            {alumnos.map((a, index) => {
                                const notasAlumno = notas.filter(n => n.alumno?.id === a.id);
                                return (
                                    <tr key={a.id} onClick={() => seleccionarAlumno(a)} style={{cursor: 'pointer', background: alumnoSeleccionado?.id === a.id ? '#e0f2fe' : ''}}>
                                        <td>{index + 1}</td>
                                        <strong><td>{a.nombre} {a.apellido}</td></strong>
                                        <td>
                                            {notasAlumno.length > 0 
                                                ? notasAlumno.map(n => `${n.materia?.nombre}: ${n.calificacion}`).join(' | ')
                                                : 'Sin notas'}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {/* Panel Derecho: Formulario Evaluativo Dinámico */}
                <div>
                    {alumnoSeleccionado ? (
                        <div style={{background: '#f8fafc', padding: '1.5rem', borderRadius: 'var(--radius)', border: '1px solid var(--border)'}}>
                            <h4>Evaluando a: <span style={{color: '#4f46e5'}}>{alumnoSeleccionado.nombre} {alumnoSeleccionado.apellido}</span></h4>
                            
                            <form onSubmit={registrarNota}>
                                <div style={{marginBottom: '1rem', display: 'flex', flexDirection: 'column'}}>
                                    <label style={{marginBottom: '0.5rem', fontWeight: '500'}}>Materia a Evaluar</label>
                                    <select value={materiaSeleccionada} onChange={e => setMateriaSeleccionada(e.target.value)} required>
                                        <option value="">-- Elija una materia inscrita --</option>
                                        {alumnoSeleccionado.materias?.map(m => (
                                            <option key={m.id} value={m.id}>{m.nombre}</option>
                                        ))}
                                    </select>
                                </div>

                                {materiaSeleccionada && (
                                    <>
                                        <div className="nota-row">
                                            <label>Examen Parcial 1 (25%)</label>
                                            <input type="number" step="0.1" min="0" max="10" placeholder="0.0" value={examenes.ex1} onChange={e => setExamenes({...examenes, ex1: e.target.value})} required />
                                        </div>
                                        <div className="nota-row">
                                            <label>Examen Parcial 2 (25%)</label>
                                            <input type="number" step="0.1" min="0" max="10" placeholder="0.0" value={examenes.ex2} onChange={e => setExamenes({...examenes, ex2: e.target.value})} required />
                                        </div>
                                        <div className="nota-row">
                                            <label>Examen Parcial 3 (25%)</label>
                                            <input type="number" step="0.1" min="0" max="10" placeholder="0.0" value={examenes.ex3} onChange={e => setExamenes({...examenes, ex3: e.target.value})} required />
                                        </div>
                                        <div className="nota-row">
                                            <label>Examen Parcial 4 (25%)</label>
                                            <input type="number" step="0.1" min="0" max="10" placeholder="0.0" value={examenes.ex4} onChange={e => setExamenes({...examenes, ex4: e.target.value})} required />
                                        </div>

                                        <div className="badge-final" style={{
                                            background: calcularNotaFinal() >= 6.0 ? '#d1fae5' : '#fee2e2',
                                            color: calcularNotaFinal() >= 6.0 ? '#065f46' : '#991b1b'
                                        }}>
                                            Nota Final Calculada: {calcularNotaFinal()}
                                        </div>

                                        <button type="submit" className="btn-save" style={{width: '100%', marginTop: '1rem'}}>
                                            Guardar Registro Completo
                                        </button>
                                    </>
                                )}
                            </form>
                        </div>
                    ) : (
                        <div style={{textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', border: '2px dashed var(--border)', borderRadius: 'var(--radius)'}}>
                            Selecciona un alumno de la tabla de la izquierda para gestionar sus evaluaciones parciales.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
package sv.edu.udb.sistemaescolar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sv.edu.udb.sistemaescolar.entity.Alumno;
import sv.edu.udb.sistemaescolar.repository.AlumnoRepository;
import java.util.List;
import java.util.Optional;

@Service
public class AlumnoService {
    @Autowired private AlumnoRepository repository;
    public List<Alumno> obtenerTodos() { return repository.findAll(); }
    public Optional<Alumno> obtenerPorId(Long id) { return repository.findById(id); }
    public Alumno guardar(Alumno a) { return repository.save(a); }
    public void eliminar(Long id) { repository.deleteById(id); }
}
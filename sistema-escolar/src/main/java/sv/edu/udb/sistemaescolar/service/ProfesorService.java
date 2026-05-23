package sv.edu.udb.sistemaescolar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sv.edu.udb.sistemaescolar.entity.Profesor;
import sv.edu.udb.sistemaescolar.repository.ProfesorRepository;
import java.util.List;
import java.util.Optional;

@Service
public class ProfesorService {
    @Autowired private ProfesorRepository repository;
    public List<Profesor> obtenerTodos() { return repository.findAll(); }
    public Optional<Profesor> obtenerPorId(Long id) { return repository.findById(id); }
    public Profesor guardar(Profesor p) { return repository.save(p); }
    public void eliminar(Long id) { repository.deleteById(id); }
}
package sv.edu.udb.sistemaescolar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sv.edu.udb.sistemaescolar.entity.Nota;
import sv.edu.udb.sistemaescolar.repository.NotaRepository;
import java.util.List;
import java.util.Optional;

@Service
public class NotaService {
    @Autowired private NotaRepository repository;
    public List<Nota> obtenerTodas() { return repository.findAll(); }
    public Optional<Nota> obtenerPorId(Long id) { return repository.findById(id); }
    public Nota guardar(Nota n) { return repository.save(n); }
    public void eliminar(Long id) { repository.deleteById(id); }
}
package sv.edu.udb.sistemaescolar.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import sv.edu.udb.sistemaescolar.entity.Materia;
import sv.edu.udb.sistemaescolar.repository.MateriaRepository;

import java.util.List;
import java.util.Optional;

@Service
public class MateriaService {

    @Autowired
    private MateriaRepository materiaRepository;

    public List<Materia> obtenerTodas() {
        return materiaRepository.findAll();
    }

    public Optional<Materia> obtenerPorId(Long id) {
        return materiaRepository.findById(id);
    }

    public Materia guardar(Materia materia) {
        return materiaRepository.save(materia);
    }

    public void eliminar(Long id) {
        materiaRepository.deleteById(id);
    }
}
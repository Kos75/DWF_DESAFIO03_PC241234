package sv.edu.udb.sistemaescolar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sv.edu.udb.sistemaescolar.entity.Materia;
import org.springframework.stereotype.Repository;

@Repository
public interface MateriaRepository extends JpaRepository<Materia, Long> {
}
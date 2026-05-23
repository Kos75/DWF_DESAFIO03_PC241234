package sv.edu.udb.sistemaescolar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sv.edu.udb.sistemaescolar.entity.Materia;

@Repository
public interface MateriaRepository extends JpaRepository<Materia, Long> {}
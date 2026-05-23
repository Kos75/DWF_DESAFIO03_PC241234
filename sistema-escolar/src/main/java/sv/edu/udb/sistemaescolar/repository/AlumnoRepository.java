package sv.edu.udb.sistemaescolar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import sv.edu.udb.sistemaescolar.entity.Alumno;
import org.springframework.stereotype.Repository;

@Repository
public interface AlumnoRepository extends JpaRepository<Alumno, Long> {
}
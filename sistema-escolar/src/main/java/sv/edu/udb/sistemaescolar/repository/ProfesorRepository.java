package sv.edu.udb.sistemaescolar.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import sv.edu.udb.sistemaescolar.entity.Profesor;

public interface ProfesorRepository extends JpaRepository<Profesor, Long> {}
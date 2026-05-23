package sv.edu.udb.sistemaescolar.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import sv.edu.udb.sistemaescolar.entity.Nota;

@Repository
public interface NotaRepository extends JpaRepository<Nota, Long> {}
package sv.edu.udb.sistemaescolar;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Commit;
import org.springframework.transaction.annotation.Transactional;

import sv.edu.udb.sistemaescolar.entity.Alumno;
import sv.edu.udb.sistemaescolar.entity.Materia;
import sv.edu.udb.sistemaescolar.entity.Profesor;
import sv.edu.udb.sistemaescolar.repository.AlumnoRepository;
import sv.edu.udb.sistemaescolar.repository.MateriaRepository;
import sv.edu.udb.sistemaescolar.repository.ProfesorRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
class SpringApiRestApplicationTests {

    @Autowired
    private ProfesorRepository profesorRepository;

    @Autowired
    private MateriaRepository materiaRepository;

    @Autowired
    private AlumnoRepository alumnoRepository;

    @Test
    @Commit
    void ingresarRegistrosTest() {
        System.out.println("======= INICIANDO TEST: INSERTANDO DATOS NUEVOS =======");

        // Inserts
        Profesor profTest1 = profesorRepository.save(new Profesor("Dra. Elena Castro"));
        Profesor profTest2 = profesorRepository.save(new Profesor("Ing. Roberto Sanchez"));
        System.out.println("Profesores añadidos: " + profTest1.getNombre() + ", " + profTest2.getNombre());

        Materia matTest1 = materiaRepository.save(new Materia("Inteligencia Artificial", profTest1));
        Materia matTest2 = materiaRepository.save(new Materia("Seguridad Informatica", profTest2));
        System.out.println("Materias añadidas: " + matTest1.getNombre() + " (" + matTest1.getProfesor().getNombre() + ")" +
                ", " + matTest2.getNombre() + " (" + matTest2.getProfesor().getNombre() + ")");

        Alumno alTest1 = new Alumno("Sofia", "Rivas");
        alTest1.getMaterias().add(matTest1);

        Alumno alTest2 = new Alumno("Miguel", "Lara");
        alTest2.getMaterias().add(matTest2);

        alumnoRepository.save(alTest1);
        alumnoRepository.save(alTest2);
        System.out.println("Alumnos añadidos: " + alTest1.getNombre() + " " + alTest1.getApellido() +
                " y " + alTest2.getNombre() + " " + alTest2.getApellido());

        System.out.println("======= VERIFICANDO REGISTROS EN CONSOLA =======");

        // Prints
        alumnoRepository.findAll().forEach(alumno -> {
            System.out.println("Alumno: " + alumno.getNombre() + " " + alumno.getApellido());
            if (alumno.getMaterias().isEmpty()) {
                System.out.println(" -> No inscrito en materias.");
            } else {
                alumno.getMaterias().forEach(m -> {
                    System.out.println(" -> Inscrito en: " + m.getNombre() +
                            " | Profesor: " + m.getProfesor().getNombre());
                });
            }
            System.out.println("-----------------------------------");
        });

        assertEquals(7, alumnoRepository.count(), "Deberían haber 7 alumnos (5 de data.sql + 2 del test)");
        System.out.println("======= TEST FINALIZADO EXITOSAMENTE =======");
    }
}
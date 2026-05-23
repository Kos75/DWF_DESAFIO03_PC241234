package sv.edu.udb.sistemaescolar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.sistemaescolar.entity.Alumno;
import sv.edu.udb.sistemaescolar.service.AlumnoService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/alumnos")
public class AlumnoController {

    @Autowired
    private AlumnoService alumnoService;

    @GetMapping
    public List<Alumno> listarTodos() {
        return alumnoService.obtenerTodos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Alumno> obtenerPorId(@PathVariable Long id) {
        Optional<Alumno> alumno = alumnoService.obtenerPorId(id);
        return alumno.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Alumno crear(@RequestBody Alumno alumno) {
        return alumnoService.guardar(alumno);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Alumno> actualizar(@PathVariable Long id, @RequestBody Alumno detallesAlumno) {
        Optional<Alumno> alumnoOpcional = alumnoService.obtenerPorId(id);
        if (alumnoOpcional.isPresent()) {
            Alumno alumnoExistente = alumnoOpcional.get();
            alumnoExistente.setNombre(detallesAlumno.getNombre());
            alumnoExistente.setApellido(detallesAlumno.getApellido());
            alumnoExistente.setMaterias(detallesAlumno.getMaterias());
            return ResponseEntity.ok(alumnoService.guardar(alumnoExistente));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (alumnoService.obtenerPorId(id).isPresent()) {
            alumnoService.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
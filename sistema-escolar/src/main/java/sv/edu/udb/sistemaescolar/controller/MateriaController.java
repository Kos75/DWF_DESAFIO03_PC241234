package sv.edu.udb.sistemaescolar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.sistemaescolar.entity.Materia;
import sv.edu.udb.sistemaescolar.service.MateriaService;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/materias")
public class MateriaController {

    @Autowired
    private MateriaService materiaService;

    @GetMapping
    public List<Materia> listarTodas() {
        return materiaService.obtenerTodas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Materia> obtenerPorId(@PathVariable Long id) {
        Optional<Materia> materia = materiaService.obtenerPorId(id);
        return materia.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Materia crear(@RequestBody Materia materia) {
        return materiaService.guardar(materia);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Materia> actualizar(@PathVariable Long id, @RequestBody Materia detallesMateria) {
        Optional<Materia> materiaOpcional = materiaService.obtenerPorId(id);
        if (materiaOpcional.isPresent()) {
            Materia materiaExistente = materiaOpcional.get();
            materiaExistente.setNombre(detallesMateria.getNombre());
            materiaExistente.setProfesor(detallesMateria.getProfesor());
            return ResponseEntity.ok(materiaService.guardar(materiaExistente));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (materiaService.obtenerPorId(id).isPresent()) {
            materiaService.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
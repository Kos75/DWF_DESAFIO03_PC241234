package sv.edu.udb.sistemaescolar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.sistemaescolar.entity.Materia;
import sv.edu.udb.sistemaescolar.service.MateriaService;
import java.util.List;

@RestController
@RequestMapping("/api/materias")
public class MateriaController {
    @Autowired private MateriaService service;

    @GetMapping public List<Materia> listar() { return service.obtenerTodas(); }

    @GetMapping("/{id}")
    public ResponseEntity<Materia> buscar(@PathVariable Long id) {
        return service.obtenerPorId(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping public Materia crear(@RequestBody Materia m) { return service.guardar(m); }

    @PutMapping("/{id}")
    public ResponseEntity<Materia> actualizar(@PathVariable Long id, @RequestBody Materia m) {
        // Corrección aquí: se cambió service.obtainPorId por service.obtenerPorId
        return service.obtenerPorId(id).map(existente -> {
            existente.setNombre(m.getNombre());
            existente.setProfesor(m.getProfesor());
            return ResponseEntity.ok(service.guardar(existente));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if(service.obtenerPorId(id).isPresent()) {
            service.eliminar(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}
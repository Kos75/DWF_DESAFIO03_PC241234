package sv.edu.udb.sistemaescolar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.sistemaescolar.entity.Profesor;
import sv.edu.udb.sistemaescolar.service.ProfesorService;
import java.util.List;

@RestController
@RequestMapping("/api/profesores")
public class ProfesorController {
    @Autowired private ProfesorService service;

    @GetMapping public List<Profesor> listar() { return service.obtenerTodos(); }

    @GetMapping("/{id}")
    public ResponseEntity<Profesor> buscar(@PathVariable Long id) {
        return service.obtenerPorId(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping public Profesor crear(@RequestBody Profesor p) { return service.guardar(p); }

    @PutMapping("/{id}")
    public ResponseEntity<Profesor> actualizar(@PathVariable Long id, @RequestBody Profesor p) {
        return service.obtenerPorId(id).map(existente -> {
            existente.setNombre(p.getNombre());
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
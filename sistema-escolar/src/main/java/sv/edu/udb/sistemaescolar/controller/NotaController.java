package sv.edu.udb.sistemaescolar.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import sv.edu.udb.sistemaescolar.entity.Nota;
import sv.edu.udb.sistemaescolar.service.NotaService;
import java.util.List;

@RestController
@RequestMapping("/api/notas")
public class NotaController {
    @Autowired private NotaService service;

    @GetMapping public List<Nota> listar() { return service.obtenerTodas(); }

    @GetMapping("/{id}")
    public ResponseEntity<Nota> buscar(@PathVariable Long id) {
        return service.obtenerPorId(id).map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping public Nota crear(@RequestBody Nota n) { return service.guardar(n); }

    @PutMapping("/{id}")
    public ResponseEntity<Nota> actualizar(@PathVariable Long id, @RequestBody Nota n) {
        return service.obtenerPorId(id).map(existente -> {
            existente.setAlumno(n.getAlumno());
            existente.setMateria(n.getMateria());
            existente.setCalificacion(n.getCalificacion());
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
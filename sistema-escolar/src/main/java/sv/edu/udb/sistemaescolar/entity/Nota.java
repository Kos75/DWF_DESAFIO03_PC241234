package sv.edu.udb.sistemaescolar.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "nota")
public class Nota {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "id_alumno", nullable = false)
    private Alumno alumno;

    @ManyToOne
    @JoinColumn(name = "id_materia", nullable = false)
    private Materia materia;

    @Column(nullable = false)
    private Double calificacion;

    public Nota() {}
    public Nota(Alumno alumno, Materia materia, Double calificacion) {
        this.alumno = alumno;
        this.materia = materia;
        this.calificacion = calificacion;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Alumno getAlumno() { return alumno; }
    public void setAlumno(Alumno alumno) { this.alumno = alumno; }
    public Materia getMateria() { return materia; }
    public void setMateria(Materia materia) { this.materia = materia; }
    public Double getCalificacion() { return calificacion; }
    public void setCalificacion(Double calificacion) { this.calificacion = calificacion; }
}
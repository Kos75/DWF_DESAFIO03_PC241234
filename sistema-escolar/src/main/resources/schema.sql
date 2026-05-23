DROP TABLE IF EXISTS nota;
DROP TABLE IF EXISTS alumno_materia;
DROP TABLE IF EXISTS alumno;
DROP TABLE IF EXISTS materia;
DROP TABLE IF EXISTS profesor;
DROP TABLE IF EXISTS usuario;

CREATE TABLE usuario (
                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         username VARCHAR(50) NOT NULL UNIQUE,
                         password VARCHAR(255) NOT NULL,
                         role VARCHAR(20) NOT NULL
);

CREATE TABLE profesor (
                          id BIGINT AUTO_INCREMENT PRIMARY KEY,
                          nombre VARCHAR(100) NOT NULL
);

CREATE TABLE materia (
                         id BIGINT AUTO_INCREMENT PRIMARY KEY,
                         nombre VARCHAR(100) NOT NULL,
                         id_profesor BIGINT,
                         FOREIGN KEY (id_profesor) REFERENCES profesor(id) ON DELETE SET NULL
);

CREATE TABLE alumno (
                        id BIGINT AUTO_INCREMENT PRIMARY KEY,
                        nombre VARCHAR(100) NOT NULL,
                        apellido VARCHAR(100) NOT NULL
);

CREATE TABLE alumno_materia (
                                id_alumno BIGINT,
                                id_materia BIGINT,
                                PRIMARY KEY (id_alumno, id_materia),
                                FOREIGN KEY (id_alumno) REFERENCES alumno(id) ON DELETE CASCADE,
                                FOREIGN KEY (id_materia) REFERENCES materia(id) ON DELETE CASCADE
);

CREATE TABLE nota (
                      id BIGINT AUTO_INCREMENT PRIMARY KEY,
                      id_alumno BIGINT NOT NULL,
                      id_materia BIGINT NOT NULL,
                      calificacion DECIMAL(4,2) NOT NULL,
                      FOREIGN KEY (id_alumno) REFERENCES alumno(id) ON DELETE CASCADE,
                      FOREIGN KEY (id_materia) REFERENCES materia(id) ON DELETE CASCADE
);
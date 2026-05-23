-- Contraseña por defecto para admin: admin123 (encriptada con BCrypt)
INSERT INTO usuario (username, password, role) VALUES ('admin', '$2a$10$R7Mlwz4T9Mh4qOInSUpbU.TzszU5OsqM6GvXNsnfXzRWhUsh76V62', 'ROLE_ADMIN');

INSERT INTO profesor (nombre) VALUES ('Alexander Siguenza');
INSERT INTO profesor (nombre) VALUES ('Maria Lopez');
INSERT INTO profesor (nombre) VALUES ('Carlos Ramirez');

INSERT INTO materia (nombre, id_profesor) VALUES ('Programacion Web', 1);
INSERT INTO materia (nombre, id_profesor) VALUES ('Base de Datos', 2);
INSERT INTO materia (nombre, id_profesor) VALUES ('Redes', 3);

INSERT INTO alumno (nombre, apellido) VALUES ('Jose', 'Perez');
INSERT INTO alumno (nombre, apellido) VALUES ('Marta', 'Gomez');

INSERT INTO alumno_materia (id_alumno, id_materia) VALUES (1, 1);
INSERT INTO alumno_materia (id_alumno, id_materia) VALUES (2, 2);

INSERT INTO nota (id_alumno, id_materia, calificacion) VALUES (1, 1, 9.5);
INSERT INTO nota (id_alumno, id_materia, calificacion) VALUES (2, 2, 8.0);
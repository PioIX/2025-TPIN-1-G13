CREATE TABLE IF NOT EXISTS Usuarios (
    id INT AUTOINCREMENT,
    usuario VARCHAR(50) NOT NULL,
    contraseña VARCHAR(20) NOT NULL,
    puntaje INT,
    tiempo INT,
    es_admin BOOLEAN,
    PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS Preguntas (
    id_pregunta INT AUTOINCREMENT,
    pregunta VARCHAR(144),
    categoria VARCHAR(50),
    PRIMARY KEY (id_pregunta)
);

CREATE TABLE IF NOT EXISTS Respuestas (
    id_respuesta INT AUTOINCREMENT,
    id_pregunta INT,
    correcta BOOLEAN,
    respuesta VARCHAR(144),
    PRIMARY KEY (id_respuesta),
    FOREIGN KEY (id_pregunta) REFERENCES Preguntas(id_pregunta) 
);

INSERT INTO Usuarios (id, usuario, contraseña, puntaje, tiempo, es_admin) 
VALUES    
    (1, "fran", "a", 0, 0, TRUE),
    (2, "putri", "a", 0, 0, TRUE),
    (3, "nasti", "a", 0, 0, TRUE),
    (4, "suarez", "a", 0, 0, TRUE),
    (5, "mati", "b", 0, 0, FALSE);


INSERT INTO Preguntas (pregunta, categoria, imagen) 
VALUES
    ("¿Como se llama el profesor de Quimica?", "Ciencia", "../IMAGES/reglas.png"),
    ("¿Como se llama el profesor de Lengua?", "Entretenimiento", null),
    ("¿En que pais vivimos?", "Geografia", "../IMAGES/reglas.png");
    ("¿En que año Cristobal Colon llegó a América?", "Historia", "../IMAGES/reglas.png");
    ("¿Quién pintó la 'Última Cena'?", "Arte", null);
    ("¿Qué país ganó el mundial de fútbol masculino en 2010?", "Deporte", null);


INSERT INTO Respuestas (id_respuesta, id_pregunta, correcta, respuesta)
VALUES
    (1, 1, FALSE, "Naboni"),
    (2, 1, TRUE, "Naddeo"),
    (3, 1, FALSE, "Rivas"),
    (4, 1, FALSE, "Facon"),
    (5, 2, FALSE, "Rossi"),
    (6, 2, FALSE, "Vazques"),
    (7, 2, FALSE, "Rivas"),
    (8, 2, TRUE, "Bergondi"),
    (9, 3, TRUE, "Argentina"),
    (10, 3, FALSE, "Uzbekistan"),
    (11, 3, FALSE, "San Marino"),
    (12, 3, FALSE, "Singapur");
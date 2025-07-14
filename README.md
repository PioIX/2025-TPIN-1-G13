Proyecto interdisciplinario

Primer cuatrimestre

Título de la propuesta: Preguntados

Grupo: 13 

División: B

Integrantes: Francisco Manzanares - Juan Ignacio Nastasi - Facundo Suarez - Agustin Putrino

Descripción de la propuesta:

Para nuestro proyecto, decidimos desarrollar un juego tipo Preguntados, en el cual los jugadores deberán
responder preguntas de opción múltiple relacionadas con una temática específica. La opción de juego que
elegimos es individual, en donde el jugador compite contra sí mismo para obtener el mayor puntaje posible.
La funcionalidad principal del juego será mostrar preguntas aleatorias al usuario, con cuatro posibles
respuestas, de las cuales solo una será correcta. Si el jugador responde correctamente, sumará puntos; en
cambio, si se equivoca, no sumará nada y pasará a la siguiente pregunta. Cada respuesta correcta otorgará 10
puntos, y el objetivo será acumular la mayor cantidad posible antes de que se terminen las preguntas o el
tiempo. Habrán distintas temáticas para responder.
Nuestro objetivo es que el juego sea simple, dinámico y educativo, permitiendo que cualquier persona pueda
jugar, aprender y divertirse al mismo tiempo.

Alcance
Objetivos del proyecto:

- Juego tipo Preguntados
- Diseñar una UI interactiva, entretenida y fácil para el jugador.
- Crear un banco de preguntas con respuestas múltiples y aleatoriedad en su
selección.
- Validar si las respuestas seleccionadas son correctas o incorrectas y brindar
retroalimentación inmediata
- Sistema de puntaje / Mostrar puntaje final
- Ranking de jugadores con guardado en base de datos.

Tareas
Listado de tareas para lograr la realización de los objetivos:

1. Investigación y redacción de preguntas y sus respuestas
2. Búsqueda de imágenes
3. Crear bases de datos (js)
4. Crear banco de preguntas en el código (js)
5. Programar la selección aleatoria de preguntas para que no se repitan siempre las
mismas (js)
6. Diseñar la lógica para verificar respuestas y mostrar si es correcta o incorrecta
(js)
7. Implementar el sistema de puntaje (js)
8. Diseñar Front-End visual (HTML, CSS)
9. Realizar pruebas del juego para detectar errores o problemas.
10. Corregir posibles fallas o mejorar aspectos del diseño o funcionamiento
11. Adaptar el juego para distintos dispositivos (responsive (CSS))
12. Presentación del proyecto.

Responsabilidades
Que partes realizará cada integrante del equipo:

● Suárez: 5, 6, 8, (12)
● Manzanares: 2, 7, 11, (12)
● Nastasi: 3, 4, 9, (12)
● Putrino: 1, 10, 8, (12)

Tablas de base de datos:

Base de datos de jugadores registrados: (“nombre” , “puntaje”) - Los jugadores que se
registren tendrán que jugar bajo un nombre y el sistema de puntuación según sus
respuestas correctas e incorrectas les devolverá un número que será el puntaje.
Base de datos de ranking (“puesto”, “nombre”, “puntaje”, “tiempo”) - Esta base de datos
se actualizará cada que un jugador sea agregado a la otra base de datos y mediante una
función calculará cuál es el puntaje más alto y con menor tiempo. Cuando de con la mejor
calificación disponible lo colocará en el ranking.
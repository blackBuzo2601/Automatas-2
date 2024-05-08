# Automatas-2 BOT DE TELEGRAM DE ACCIONES DIVERSAS
Autor(es): Buzo Zamora Elian

Estatus: Borrador

Ultima Actualización: 13/04/2024
## Contenido
* Metas 
* Metas no tan prioritarias
* Trasfondo del proyecto
* Descripción general

### Metas
* Desarrollar un bot de telegram con Javascript que realice distintas acciones con un sistema de menú principal.
* Lograr el funcionamiento con apoyo del framework NODE.JS v20.11.0 y Telegraf.js v4.16.3.
* Elaborarlo en forma de menú principal, haciendo uso de palabras clave como S,N para realizar nuevamente una acción o regresar al menú principal.
* Reforzar mis conocimientos en JS.
* Realizar un sistema de login desde cero, es decir, no utilizaremos una herramienta externa para validar credenciales. Cuando un usuario se "Registra" sus datos son almacenados en un archivo de texto. El bot cuando reciba un mensaje, llamará a una función que analiza dicho archivo de texto, si el ID del usuario que mandó mensaje se encuentra en el archivo de texto, significa que está registrado, de no ser así, el código le solicitará al usuario registrarse y no pasará de ahí hasta que el usuario otorgue sus credenciales.

# Metas no tan prioritarias
* Que el bot responda por mí, cuando un mensaje es enviado a mi perfil personal.

# Trasfondo del proyecto
El contexto del proyecto consiste en ser calificado como proyecto final para la asignatura de LENGUAJES Y AUTÓMATAS 2 de la carrera de Ingenieria en Sistemas Computacionales.
Se desarrolla con la finalidad de programar más por el lado del Back-end puesto que estamos próximos a cursar asignaturas de especialidad que se relacionan con la programación
en el FRONT-END y el BACK-END.

# Descripción general
El bot será desarrollado para la aplicación móvil TELEGRAM. Consistirá en ser un contestador de mensajes automático que interactuará con el usuario que le envíe mensajes. Cuando un usuario
le mande mensaje, el bot lo saludará amistosamente otorgándole un menú con distintas opciones, donde el usuario deberá indicar que se desea hacer con opciones como:
* Acerca de Elian (Nombre,edad,sexo,nacionalidad etc)
* Recomendar algún videojuego en particular: Para esto crearé un arreglo que contenga una enorme cantidad de videojuegos con atributos como titulo, descripcion, genero, etc)
* ¿Elian está conectado? Aquí el bot evaluará si me encuentro offline u online para dar una respuesta adecuada.
* Redes sociales: El bot desplegará los links hacia mis redes sociales públicas como Youtube o Instagram.
* Contáctame: Aquí el bot devolverá un mensaje proporcionando mi correo personal para contactarme.
* Otorgar consejos personales aleatorios a partir de mi archivo JSON.
* CLIP DIVERTIDO: El bot arrojará videos desde una carpeta cuando el usuario entre a esta opcion, a su vez que le preguntará si quiere ver los videos originales o con un filtro de vulgaridad, debido a que los clips contienen lenguaje vulgar.
* Juego de adivinar frases: De la misma manera que se envía un vídeo en la opción anterior, aquí el bot arrojará la escena en particular de la pregunta cuando el usuario indique una respuesta incorrecta a dicha pregunta.

# Instrucciones de uso
*El bot no soporta fotos ni audios, no enviar fotos ni audios porque por el momento no funciona.
*El bot le otorgará un menú principal con todas las cosas que puede hacer por el momento. Un total de 5 opciones. Para acceder a cada una de ellas, EL USUARIO DEBE INGRESAR LA OPCIÓN DEL MENÚ TAL CUAL VIENE, sea mayúscula o minuscula, pero tiene que escribirlo correctamente, de modo que si se introduce algo incorrecto el bot arrojará un mensaje de que no fue detectado un texto referente para las opciones del menú. 
*El bot arrojará un mensaje de S/N, donde dependiendo la situación, si el usuario elige N, regresará al menú principal o realizará otra acción.
Solo cuando el bot lo indique, el usuario debe responder con s o n, si escribe otra cosa, el bot no saldrá de ese ciclo hasta que el usuario escriba un mensaje válido.
*Si el bot lo indica, el usuario puede escribir cancelar para regresar al menú principal.




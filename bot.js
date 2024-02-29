/*Utiliza la funcion require de NODE.JS para cargar el modulo dotenv y
y ejecuta su funcion "config()" . Dotenv es una biblioteca de NodeJS que
permite la carga de variables de entorno desde un archivo .env
Con la función config() del modulo dotenv leeemos el archivo .env en el directorio
actual, en este caso estamos en la raiz del proyecto.
*/
require('dotenv').config();

/*
1. Creamos una constante de nombre Telegraf.
2. Utiliza la función require() de NODE.JS para cargar el módulo telegraf que es un framework
de NODE JS.
*/
const {Telegraf} = require('telegraf');

/*Telegraf necesita el token para poder funcionar.
En NODE.JS, 'process' es un objeto global que proporciona información y control
sobre el proceso de ejecución de una aplicación. Es decir, es predefinid por
NODEJS y se encuentra disponible en todo el entorno de la aplicación.
Entonces cuando escribimos process.env estamos accediendo a la propiedad
.env de process, esta propiedad da acceso a las variables de entorno
DE MI PROYECTO. Entonces accediendo a esas variables de entorno indicamos
la de nombre TELEGRAM_BOT_TOKEN para que sea almacenada en mi constante token.
*/
const token = process.env.TELEGRAM_BOT_TOKEN;

//Creamos una instancia de la clase Telegraf de nombre "bot". Recibirá como parametro el token
const bot = new Telegraf(token);  
//Con esto nuestro bot ya se encuentra autenticado. Esta conectado con el Token correspondiente.
//DEBO INVESTIGAR QUE SON LAS FUNCIONES DE FLECHA

bot.help((ctx) => { 
    ctx.reply("Lista de los posibles comandos que puede ejecutar");   //ctx hace referencia a los datos que se usen en un chat
});

bot.settings((ctx) => { 
    ctx.reply("Opciones");   //ctx hace referencia a los datos que se usen en un chat
});

bot.on('message', (ctx) => {
    // Responde con el mensaje de bienvenida a cualquier mensaje que llegue al bot
    ctx.reply('Bienvenido. ¿En que puedo ayudarte? Elige una opción por favor.');
});



bot.launch(); //comando para que funcione el bot.
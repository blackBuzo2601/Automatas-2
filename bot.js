/*Utiliza la funcion require de NODE.JS para cargar el modulo dotenv y
y ejecuta su funcion "config()" . Dotenv es una biblioteca de NodeJS que
permite la carga de variables de entorno desde un archivo .env
Con la función config() del modulo dotenv leeemos el archivo .env en el directorio
actual, en este caso estamos en la raiz del proyecto.
*/
require('dotenv').config();
/*
1. Creamos una constante de nombre Telegraf.
2. Utiliza el modulo require() de NODE.JS para cargar el módulo telegraf que es un framework
de NODE JS.*/
const {Telegraf} = require('telegraf');

/*1. Creamos una constante de nombre fs.
  2. Usamos el modulo require de NODE.JS para cargar el modulo fs (fileSystem). Que nos permite
  leer y escribir archivos*/
const fs = require('fs');

//almacenamos toda la data de miArchivo.json en una const jsonData con el método readFileSync del modulo FS. 
//especificamos el archivo que leeremos y el formato que este caso es el estándar UTF-8
const jsonData = fs.readFileSync('miArchivo.json', 'utf-8');
const dataParseada = JSON.parse(jsonData); //Dividimos la Data del JSON en cuanto a sus "CLAVES".
                                            //de esta manera podremos acceder a cada una de las CLAVES de mis objetos
                                            //que hay en miArchivo.json
//Por ejemplo si quisiera acceder a mi CLAVE "mensajesBienvenida" que su valor es un arreglo de objetos,
//para acceder puedo hacer lo siguiente: console.log(dataParseada.mensajesBienvenida[3]);
                                            //estamos indicando que de mensajesBienvenida, tomamos el objeto de la posición 3
                                            //recordemos que el valor es una arreglo (coleccion de objetos)

/*Telegraf necesita el token para poder funcionar.
En NODE.JS, 'process' es un objeto global que proporciona información y control
sobre el proceso de ejecución de una aplicación. Es decir, es predefinido por
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

//NUEVAS VARIABLES
var contadorMensajesIguales=0;
var randomDecimal=0; //usamos el objeto Math de JS y usamos el método random() que devuelve un numero aleatorio entre eo 0 y 1 en decimal.
var randomEntero=0;
var mensajeRecibido=""   //almacena el mensaje recibido actualmente
var mensajeAnterior="";  //almacenara el mensaje recibido anteriormente para comparar que sean diferentes
var parametroNumerico=0; //esta variable hace referencia a que en una función se usa para pasar parametros numericos
var banderaNegativaDetectada=false;
var mensajeRecibidoMinusculas="";
var banderaSaludo=false;
var contadorBlackList=10;
var banderaMensajeInicial=false;
//LAS SIGUIENTES CONSTANTES ALMACENAN LA CANTIDAD DE OBJETOS QUE HAY EN CADA CLAVE DEL archivo arreglojuegos.JSON
//Estas serán util para poder implementar una función para escoger un mensaje aleatorio estableciendo un tope maximo
//que será la cantidad que hay. De esta manera si hay 21 mensajes diferentes, el metodo random devolvera entre 1 y 21.
const listaVideojuegosCantidad = dataParseada.listaVideojuegos.length;
const mensajesBienvenidaCantidad = dataParseada.mensajesBienvenida.length;
const mensajesSalidaCantidad = dataParseada.mensajesSalida.length;                         
const mensajesMensajeRepetidoCantidad = dataParseada.mensajesMensajeRepetido.length;      
const mensajesConsejosPersonalesCantidad = dataParseada.mensajesConsejosPersonales.length; 
const mensajesBlacklistCantidad = dataParseada.mensajesBlacklist.length;

///------------------------------------------AREA DE LA MAGIA DEL BOT----------------------------------------------
//ctx (context) hace referencia a los datos que se usan en un chat

bot.on('message', (ctx) => { //INICIO de metodo .on del objeto BOT

while(banderaMensajeInicial==false){
    mensajeInicial();    
}
banderaNegativaDetectada=false;   //reiniciar bandera 
mensajeAnterior=mensajeRecibido; //almacenar el mensaje anterior.
mensajeRecibido = ctx.message.text; //ctx= contiene información sobre el mensaje que se esta proceesando
//message= es una propiedad de ctx que contiene propiedades como
//un id, el nombre y ultimo nombre (de quien lo envio) etc
//text= es una propiedad de message que contiene el texto especifico
//del mensaje.
console.log("Mensaje recibido: "+mensajeRecibido); 
mensajeRecibidoMinusculas=mensajeRecibido.toString(); //Convertir mensaje a tipo STRING
mensajeRecibidoMinusculas=mensajeRecibidoMinusculas.toLocaleLowerCase(); //String a minusculas
detectarGroserias();

//CONDICIONAL DE BLACKLIST (groserias)
if(banderaNegativaDetectada==true){
  mensajeAleatorio(mensajesBlacklistCantidad);
  ctx.reply(dataParseada.mensajesBlacklist[randomEntero]);
  ctx.deleteMessage();
}else{ //INICIO ELSE 1

contadorMsjRepetido();      
if(contadorMensajesIguales>=2){//aqui entra cuando ya se envió el 3er mensaje igualito
  mensajeAleatorio(mensajesMensajeRepetidoCantidad); 
  ctx.reply(dataParseada.mensajesMensajeRepetido[randomEntero].mensaje); 
}else{ //INICIO ELSE 1.1
    detectorDeClaves();
}//FIN ELSE 1.1

}//FIN DEL ELSE 1 correspondiente a CONDICIONAL BLACKLIST 




//$$$$$$$$$$$$$$$$$$$$$$$FUNCIONES QUE SON NECESARIO QUE SE DECLAREN AQUI EN bot.on (message)$$$$$$$$$$$$$$$$$$$$$

function mensajeInicial(){//FUNCION QUE SERÁ LLAMADA UNICAMENTE CUANDO SE ENVÍA EL PRIMER MENSAJE AL BOT
  ctx.reply(dataParseada.mensajesBienvenida[3].mensaje);
  banderaMensajeInicial=true;
}

//FUNCION QUE DETECTA SI EL MENSAJE CONTIENE LAS CLAVES QUE SOLICITA EL BOT
function detectorDeClaves(){
  if(mensajeRecibidoMinusculas=="recomendar videojuego"){
    mensajeAleatorio(listaVideojuegosCantidad);
    ctx.reply("TITULO: "+dataParseada.listaVideojuegos[randomEntero].titulo+"\n\nGÉNERO: "+dataParseada.listaVideojuegos[randomEntero].genero
    +"\n\nAÑO: "+dataParseada.listaVideojuegos[randomEntero].año+"\n\nEDAD RECOMENDADA: "+dataParseada.listaVideojuegos[randomEntero].edadRecomendada+
    "\n\nDESCRIPCIÓN: "+dataParseada.listaVideojuegos[randomEntero].descripcionDelJuego+"\n\nPLATAFORMA: "+dataParseada.listaVideojuegos[randomEntero].plataforma);        
  }
  else if(mensajeRecibidoMinusculas=="consejo personal"){
    mensajeAleatorio(mensajesConsejosPersonalesCantidad);
    ctx.reply(dataParseada.mensajesConsejosPersonales[randomEntero].mensaje);   
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
}); //FIN de metodo .on del objeto BOT


console.log("PRUEBAS PRUEBAS PRUEBAS PRUEBAS PRUEBAS PRUEBAS PRUEBAS PRUEBAS PRUEBAS PRUEBAS \n");
//===================================DECLARACION DE FUNCIONES ADICIONALES=========================0========================

//FUNCION QUE ME PERMITIRÁ CALCULAR NUMEROS ALEATORIOS EN UN RANGO DEFINIDO para que mande un mensaje aleatorio
function mensajeAleatorio(parametroNumerico){ //recibe por parametro el valor maximo del rango
  randomDecimal=Math.random();                //devuelve un valor aleatorio entre 0 y 1.
  randomEntero=Math.floor(randomDecimal * parametroNumerico); //se multiplica el valor
                                                //0.aleatorio por el parametro y al final se redondea hacia abajo   
}

//FUNCIÓN QUE UTILIZA EL MÉTODO "includes" PARA TODAS LAS PALABRAS DE LA BLACKLIST Y ASI DETECTAR GROSERIAS
function detectarGroserias(){
    for(let i=0;i<dataParseada.blackList.length;i++){
      if(mensajeRecibidoMinusculas.includes(dataParseada.blackList[i])){
        banderaNegativaDetectada=true;
        break;
      }
    }
}

function contadorMsjRepetido(){
    if(mensajeAnterior==mensajeRecibido){
      contadorMensajesIguales++;
    }else{
      contadorMensajesIguales=0; //Si el siguiente mensaje fue diferente, reiniciar contador de palabras repetidas
    }
}







//-----------------------------------------------------------------------------------------------------------------
bot.launch(); //comando para que se inicie el bot con toda la "configuración" anterior.




// ESTA LINEA ES LA QUE ME HIZO VER LA INFO DEL MENSAJE ctx.deleteMessage(message_id,idChat);
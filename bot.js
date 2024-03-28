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
var contadorBlackList=10;
var banderaMensajeInicial=0;
var banderaPrimerMensajeRecibido=false;
var banderaPregunta=0;
var elVideo;
var banderaVideoSinCensura=false;
//LAS SIGUIENTES CONSTANTES ALMACENAN LA CANTIDAD DE OBJETOS QUE HAY EN CADA CLAVE DEL archivo arreglojuegos.JSON
//Estas serán util para poder implementar una función para escoger un mensaje aleatorio estableciendo un tope maximo
//que será la cantidad que hay. De esta manera si hay 21 mensajes diferentes, el metodo random devolvera entre 1 y 21.
const listaVideojuegosCantidad = dataParseada.listaVideojuegos.length;
const mensajesSalidaCantidad = dataParseada.mensajesSalida.length;                         
const mensajesMensajeRepetidoCantidad = dataParseada.mensajesMensajeRepetido.length;      
const mensajesConsejosPersonalesCantidad = dataParseada.mensajesConsejosPersonales.length; 
const mensajesBlacklistCantidad = dataParseada.mensajesBlacklist.length;

///------------------------------------------AREA DE LA MAGIA DEL BOT----------------------------------------------
//ctx (context) hace referencia a los datos que se usan en un chat

bot.on('message', (ctx) => { //INICIO de metodo .on del objeto BOT

if(banderaMensajeInicial==0){
    mensajeInicial();   
}
banderaMensajeInicial++;
banderaNegativaDetectada=false;   //reiniciar bandera 
mensajeAnterior=mensajeRecibido; //almacenar el mensaje anterior.
mensajeRecibido = ctx.message.text; //ctx= contiene información sobre el mensaje que se esta proceesando
//message= es una propiedad de ctx que contiene propiedades como
//un id, el nombre y ultimo nombre (de quien lo envio) etc
//text= es una propiedad de message que contiene el texto especifico
//del mensaje.
console.log("Mensaje recibido: "+mensajeRecibido); 
mensajeRecibidoMinusculas=mensajeRecibido.toString(); //Convertir mensaje a tipo STRING
mensajeRecibidoMinusculas=mensajeRecibidoMinusculas.toLowerCase(); //String a minusculas
detectarGroserias();




//CONDICIONAL DE BLACKLIST (groserias)
if(banderaNegativaDetectada==true){
  mensajeAleatorio(mensajesBlacklistCantidad);
  ctx.reply(dataParseada.mensajesBlacklist[randomEntero]);
  ctx.deleteMessage();
}else{ //INICIO ELSE PRINCIPAL
  
      //SWITCH DE BANDERA DE (S/N) 
      switch(banderaPregunta){//start switch
        case 1: snFuncionjuegos();
          break;

        case 2: snConsejosPersonales();
          break;

        case 3: snInfoGeneral();
          break;

        case 4: menuClipDivertido();
          break;

        case 5: snClipDivertido();
          break;
        
        case 0:
          contadorMsjRepetido();      
          if(contadorMensajesIguales>=2){//aqui entra cuando ya se envió el 3er mensaje igualito
            mensajeAleatorio(mensajesMensajeRepetidoCantidad); 
            ctx.reply(dataParseada.mensajesMensajeRepetido[randomEntero].mensaje); 
          }else{ //INICIO ELSE 1.1.1
            if(banderaMensajeInicial>=2){
            detectorDeClaves();
            }
          }//FIN ELSE 1.1.1
      }//end switch

}//FIN DE ELSE PRINCIPAL correspondiente a CONDICIONAL BLACKLIST 



//$$$$$$$$$$$$$$$$$$$$$$$FUNCIONES QUE SON NECESARIO QUE SE DECLAREN AQUI EN bot.on (message)$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$FUNCIONES QUE SON NECESARIO QUE SE DECLAREN AQUI EN bot.on (message)$$$$$$$$$$$$$$$$$$$$$
//$$$$$$$$$$$$$$$$$$$$$$$FUNCIONES QUE SON NECESARIO QUE SE DECLAREN AQUI EN bot.on (message)$$$$$$$$$$$$$$$$$$$$$
function mensajeInicial(){//FUNCION QUE SERÁ LLAMADA UNICAMENTE CUANDO SE ENVÍA EL PRIMER MENSAJE AL BOT
  ctx.reply(dataParseada.mensajeBienvenida);
}

function detectorDeClaves(){ //inicio funcion detectorDeClaves
  switch(mensajeRecibidoMinusculas){
    case "recomendar videojuego": recomiendaJuegos();
        break;  
    
    case "consejo personal": consejosPersonales();
        break;   

    case "acerca de elian": infoGeneral();
        break;

    case "clip divertido": clipDivertido();
        break;

    default:
        ctx.reply("Lo siento. No entendí lo que quisiste decir. Por favor, revisa y escribe bien tu mensaje.");
        break;
  }
}//fin funcion detectorDeClaves

function recomiendaJuegos(){
      mensajeAleatorio(listaVideojuegosCantidad);
      ctx.reply("TITULO: "+dataParseada.listaVideojuegos[randomEntero].titulo+"\n\nGÉNERO: "+dataParseada.listaVideojuegos[randomEntero].genero
      +"\n\nAÑO: "+dataParseada.listaVideojuegos[randomEntero].año+"\n\nEDAD RECOMENDADA: "+dataParseada.listaVideojuegos[randomEntero].edadRecomendada+
      "\n\nDESCRIPCIÓN: "+dataParseada.listaVideojuegos[randomEntero].descripcionDelJuego+"\n\nPLATAFORMA: "+dataParseada.listaVideojuegos[randomEntero].plataforma+"\n\n¿Recomendar otro videojuego? (S/N)");
      banderaPregunta=1;
}

//las funciones s/n que vienen acompañadas de las funciones en si que devuelven los mensajes, son para evaluar
//el siguiente mensaje, si es S, N o si es otro mensaje que no sea alguno de esos, para seguir una estructura
//de menu principal.
function snFuncionjuegos(){
  switch(mensajeRecibidoMinusculas){//inicio switch
    case "s": recomiendaJuegos();
      break;

    case "n": ctx.reply("Regresando al menu principal... ");
    banderaPregunta=0;
    mensajeInicial();
      break;
    
    default:
    ctx.reply("Por favor. Escribe bien. ¿Quieres otra recomendación de videojuego? (S/N)");
      break;
  }//fin switch
}

function consejosPersonales(){
  mensajeAleatorio(mensajesConsejosPersonalesCantidad);
  ctx.reply(dataParseada.mensajesConsejosPersonales[randomEntero].mensaje+"\n\n¿Quieres otro consejo? (S/N)");
  banderaPregunta=2;
}

function snConsejosPersonales(){
  switch(mensajeRecibidoMinusculas){//inicio switch
    case "s": consejosPersonales();
      break;

    case "n": ctx.reply("Regresando al menu principal... ");
    banderaPregunta=0;
    mensajeInicial();
      break;
    
    default:
    ctx.reply("Por favor. Escribe bien. ¿Quieres otro consejo personal? (S/N)");
      break;
  }//fin switch
}

function infoGeneral(){
  ctx.reply("INFORMACIÓN GENERAL DE MI CREADOR\n\nNombre: Buzo Zamora Elian\nFecha de nacimiento: 26/01/2002\nNacionalidad: Mexicana\nSexo: Masculino\nCiudad de nacimiento: Ensenada\nEstado Civil: Soltero\n\n¿Quieres algo más? Escribe cualquier cosa para regresar al menú principal.");
  banderaPregunta=3;
}

function snInfoGeneral(){
  switch(mensajeRecibidoMinusculas){
    default: ctx.reply("Regresando al menu principal...");
    banderaPregunta=0;
    mensajeInicial();
    break;
  }
}

function clipDivertido(){
  ctx.reply("Los clips divertidos contienen lenguaje vulgar. Para esto, puedes elegir ver los videos sin censura/con censura. \n¿Como prefieres verlo?\n(SC=Sin censura/CS=Con censura)\nCancelar=Volver al menú principal");
  banderaPregunta=4;
}

function menuClipDivertido(){
  switch(mensajeRecibidoMinusculas){
    case "sc": clipSinCensura();
      break;
    
    case "cs": clipConCensura();
      break;

    case "cancelar":
      ctx.reply("Regresando al menu principal...");
      banderaPregunta=0;
      mensajeInicial();
      break;

    default: ctx.reply("Por favor. Escribe bien. ¿Quieres ver un clip? (SC/CS). Si quieres regresar escribe 'cancelar'");
      break;
  }
}

function clipSinCensura(){
  elVideo = 'clipsSC/clip1sc.mp4';
  fs.readFile(elVideo, (err, videoData) => {
      if(err){
          console.error('Error al leer el archivo de video:', err);
          ctx.reply('Error al detectar el video en pc.');
        }else {
          ctx.replyWithVideo({source:videoData});
      }
  }); //fin readFile que envia el video
  ctx.reply("¿Quieres otro clip? (S/N)");
  banderaPregunta=5;
  banderaVideoSinCensura=true;
}

function clipConCensura(){
  elVideo = 'clipsCC/clip1cc.mp4';
  fs.readFile(elVideo, (err, videoData) => {
      if(err){
          console.error('Error al leer el archivo de video:', err);
          ctx.reply('Error al detectar el video en pc.');
        }else {
          ctx.replyWithVideo({source:videoData});
      }
  }); //fin readFile que envia el video
  ctx.reply("¿Quieres otro clip? (S/N)");
  banderaPregunta=5;
  banderaVideoSinCensura=false;
}

function snClipDivertido(){
  if(banderaVideoSinCensura==true){
    switch(mensajeRecibidoMinusculas){
      case "s": clipSinCensura();
        break;

      case "n": ctx.reply("Regresando al menu principal...");
                banderaVideoSinCensura=false;
                banderaPregunta=0;
                mensajeInicial();
        break;

      default: ctx.reply("Por favor, escribe bien. ¿Quieres otro clip? (S/N)");
        break;
    }
  }else{//inicio else de filtro de video
    switch(mensajeRecibidoMinusculas){
      case "s": clipConCensura();
        break;

      case "n": ctx.reply("Regresando al menu principal...");
                banderaVideoSinCensura=false;
                banderaPregunta=0;
                mensajeInicial();
        break;

      default: ctx.reply("Por favor, escribe bien.¿Quieres otro clip? (S/N)");
        break;
    }
  }//fin else de filtro de video
}//fin funcion de SI/NO de clipDivertido


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
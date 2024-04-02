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
const { defaultMaxListeners } = require('events');

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
var banderaMensajeInicial=0;
var banderaPregunta=0;
var elVideo;
var banderaVideoSinCensura=false;
var imagenJuego="";
var nombreVideo="";
var idDelVideojuego="00";
var cantidadClipsSinCensura=4;
var cantidadClipsConCensura=4;
var contadorVideojuegos=0;
var nombreJuegoMostrar="";
var construirListaJuegosMostrar="";
var posicionJuegoDetectado="";
var banderaJuegoDetectado=false;
var banderaDeCompartirLista=false;
var tematicaSeleccionada="";
var numeroDePreguntaJuegoAdivina=0;
var arrayFrases=[]; //guardará las frases de los juegos de adivinar
var arrayPelicula=[];//guardará las peliculas 
var arrayEscenas=[]; //guardará el nombre de las escenas;
var arrayEscenasElegidas=[];
var objetoPreguntasOrdenadas={};
var arrayPreguntasDesordenadas=[];
var contarEquivocaciones=0;
var respuestaCorrecta="";
var paresClaveValorDelObjeto="";
var parametroPosicionPregunta=-1; //para que empiece en 0...1...2...3...
var puntuacion=0;
var cantidadPreguntasDeJuego=0;
var almacenarPeliculaSW="";
var almacenarPeliculaSWbien="";
var escenaPelicula="escena";
var tituloEscena="";
var n=-1; //para las escenas de las peliculas, ya que la primera empieza con 0
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
//console.log("Mensaje recibido detallado: "+ctx.message.message_id); (mensaje ID, lo utilizaré para cuando varias personas abran el chat)
mensajeRecibidoMinusculas=mensajeRecibido.toString(); //Convertir mensaje a tipo STRING
mensajeRecibidoMinusculas=mensajeRecibidoMinusculas.toLowerCase(); //String a minusculas
detectarGroserias();



//CONDICIONAL DE BLACKLIST (groserias)
if(banderaNegativaDetectada==true){
  mensajeAleatorio(mensajesBlacklistCantidad);
  ctx.reply(dataParseada.mensajesBlacklist[randomEntero]);
  ctx.deleteMessage();
}else{ //INICIO ELSE PRINCIPAL
  
      //SWITCH de opciones de banderaPregunta
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

        case 6: snEnviarAvanceJuego();
          break;

        case 7: snMandarListaJuegos();
          break;

        case 8: leerJuegoEscrito();
          break;

        case 9: elegirTematica();
          break;

        case 10: snEmpezarJuego();
          break;

        case 11: juegoComenzado();
          break;

        case 12: leerRespuestaJuegoComenzado();
          break;

        case 13: snVolverAJugar();
          break;


        case 0:
          contadorMsjRepetido();      
          if(contadorMensajesIguales>=2){//aqui entra cuando ya se envió el 3er mensaje igualito
            mensajeAleatorio(mensajesMensajeRepetidoCantidad); 
            ctx.reply(dataParseada.mensajesMensajeRepetido[randomEntero].mensaje); 
            mensajeInicial();
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

    case "adivina la pelicula" : adivinaPelicula();
        break;

    default:
        contarEquivocaciones++;
        if(contarEquivocaciones==3){
          mensajeInicial();
          contarEquivocaciones=0;
        }
        ctx.reply("Lo siento. No entendí lo que quisiste decir. Por favor, revisa y escribe bien tu mensaje.");
        break;
  }
}//fin funcion detectorDeClaves

function recomiendaJuegos(){
      if(contadorVideojuegos>=6 && banderaDeCompartirLista==false){
        ctx.reply("Ya me has pedido que te recomiende videojuegos "+(contadorVideojuegos)+" veces. ¿No quieres que mejor te comparta la lista y tu eliges el juego? (S/N)");
        banderaPregunta=7;
        banderaDeCompartirLista=true;
      }else{//inicia ELSE de si se llega al 7mo videojuego a recomendar
        mensajeAleatorio(listaVideojuegosCantidad);
        posicionJuegoDetectado=randomEntero;
        ctx.reply("TITULO: "+dataParseada.listaVideojuegos[posicionJuegoDetectado].titulo+"\n\nGÉNERO: "+dataParseada.listaVideojuegos[posicionJuegoDetectado].genero
        +"\n\nAÑO: "+dataParseada.listaVideojuegos[posicionJuegoDetectado].año+"\n\nEDAD RECOMENDADA: "+dataParseada.listaVideojuegos[posicionJuegoDetectado].edadRecomendada+
        "\n\nDESCRIPCIÓN: "+dataParseada.listaVideojuegos[posicionJuegoDetectado].descripcionDelJuego+"\n\nPLATAFORMA: "+dataParseada.listaVideojuegos[posicionJuegoDetectado].plataforma);
        banderaPregunta=6;
        imagenJuego=dataParseada.listaVideojuegos[posicionJuegoDetectado].imagen; //almacenar ruta de la imagen
        ctx.replyWithPhoto({ source: imagenJuego });
        ctx.reply("¿Quieres ver un avance del videojuego?(S/N)");
        banderaDeCompartirLista=false;
        contadorVideojuegos++;
      }//concluye ELSE  
}

//las funciones s/n que vienen acompañadas de las funciones en si que devuelven los mensajes, son para evaluar
//el siguiente mensaje, si es S, N o si es otro mensaje que no sea alguno de esos, para seguir una estructura
//de menu principal.
function snEnviarAvanceJuego(){
  switch(mensajeRecibidoMinusculas){
    case "s": enviarAvanceJuego();
      break;

    case "n":  ctx.reply("¿Quieres otra recomendación de otro videojuego? (S/N)");
      banderaPregunta=1;
      break;
  
    default:
      ctx.reply("Por favor. Escribe bien. ¿Quieres ver un avance del videojuego? (S/N)");
      break;
  }
}

function enviarAvanceJuego(){
  idDelVideojuego=dataParseada.listaVideojuegos[posicionJuegoDetectado].id;
  nombreVideo="avance"+idDelVideojuego;
  nombreVideo=nombreVideo.toString();
  elVideo = 'trailersjuegos/'+nombreVideo+'.mp4';

  fs.readFile(elVideo, (err, videoData) => {
      if(err){
          ctx.reply('Error al detectar el video en pc o video no disponible para este juego.');
        }else {
          ctx.reply("Enviando avance...");
          ctx.replyWithVideo({source:videoData});
      }
  }); //fin readFile que envia el video
  ctx.reply("¿Quieres otra recomendación de otro videojuego? (S/N)");
  banderaPregunta=1;
}


function snFuncionjuegos(){
  switch(mensajeRecibidoMinusculas){//inicio switch
    case "s": recomiendaJuegos();
      break;

    case "n": ctx.reply("Regresando al menu principal... ");
      banderaPregunta=0;
      contadorVideojuegos=0; //reiniciar contador
      mensajeInicial();
      break;
    
    default:
      ctx.reply("Por favor. Escribe bien. ¿Quieres otra recomendación de videojuego? (S/N)");
      break;
  }//fin switch
}

function snMandarListaJuegos(){
  switch(mensajeRecibidoMinusculas){//inicio switch
    case "s":
      for(let i=0;i<listaVideojuegosCantidad;i++){
        nombreJuegoMostrar=dataParseada.listaVideojuegos[i].titulo;
        construirListaJuegosMostrar=construirListaJuegosMostrar+"\n"+nombreJuegoMostrar;
      }
      ctx.reply(construirListaJuegosMostrar);
      ctx.reply("Escribe el nombre de un videojuego así como viene en la lista para leer su información.\nEscribe 'cancelar' para regresar al menu principal");
      banderaPregunta=8;
      break;

    case "n": ctx.reply("¿Quieres otra recomendación de otro videojuego? (S/N)");
      banderaPregunta=1;
      break;
    
    default:
      ctx.reply("Por favor. Escribe bien. ¿Quieres ver la lista completa de videojuegos? (S/N)");
      break;
  }//fin switch
}

function leerJuegoEscrito(){//eee
  banderaJuegoDetectado=false; //reiniciar para la proxima vez que se introduzca otro nombredejuego
//EL siguiente for, evalua el mensaje recibido si es identico a el titulo de un videojuego de la lista.
  for(i=0;i<listaVideojuegosCantidad;i++){//for inicia
    if(mensajeRecibido.toString()==dataParseada.listaVideojuegos[i].titulo){
      posicionJuegoDetectado=i;
      banderaJuegoDetectado=true;
      break; //detener for en el juego que se detecto
    }
  }//for concluye

  //¿Se encontró un juego idéntico a la lista?
  if(banderaJuegoDetectado==true){
        ctx.reply("TITULO: "+dataParseada.listaVideojuegos[posicionJuegoDetectado].titulo+"\n\nGÉNERO: "+dataParseada.listaVideojuegos[posicionJuegoDetectado].genero
        +"\n\nAÑO: "+dataParseada.listaVideojuegos[posicionJuegoDetectado].año+"\n\nEDAD RECOMENDADA: "+dataParseada.listaVideojuegos[posicionJuegoDetectado].edadRecomendada+
        "\n\nDESCRIPCIÓN: "+dataParseada.listaVideojuegos[posicionJuegoDetectado].descripcionDelJuego+"\n\nPLATAFORMA: "+dataParseada.listaVideojuegos[posicionJuegoDetectado].plataforma);
        banderaPregunta=6;
        imagenJuego=dataParseada.listaVideojuegos[posicionJuegoDetectado].imagen; //almacenar ruta de la imagen
        ctx.replyWithPhoto({ source: imagenJuego });
        ctx.reply("¿Quieres ver un avance del videojuego?(S/N)");
        contadorVideojuegos++;
  }
  //No se encontró el juego, ¿entonces el usuario escribió 'cancelar?
  else if(mensajeRecibidoMinusculas=="cancelar"){
    ctx.reply("Regresando al menu principal...");
    banderaPregunta=0;
    contadorVideojuegos=0; //reiniciar contador
    mensajeInicial();
  }//Entonces el usuario no escribió correctamente un mensaje...
  else{
    ctx.reply("Por favor, escribe bien. Escribe un videojuego de la lista correctamente.\nEscribe 'cancelar' para regresar al menú principal.");
  }

}//eee


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
  ctx.reply("Los clips divertidos contienen lenguaje vulgar. Para esto, puedes elegir ver los videos sin censura/con censura. ¿Como prefieres verlo?\n\n(SC=Sin censura/CS=Con censura)\n\nCancelar=Volver al menú principal");
  banderaPregunta=4;
}

function menuClipDivertido(){
  switch(mensajeRecibidoMinusculas){
    case "sc":  ctx.reply("MODO SIN CENSURA");
      clipSinCensura();
      break;
    
    case "cs":  ctx.reply("MODO FAMILY FRIENDLY");
      clipConCensura();
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
  mensajeAleatorio(cantidadClipsSinCensura); //generar video aleatorio estableciendo como tope la cantidad de clips por el momento
  nombreVideo="clipsc"+randomEntero;
  nombreVideo=nombreVideo.toString();
  elVideo = 'clipsSC/'+nombreVideo+'.mp4';

  fs.readFile(elVideo, (err, videoData) => {
      if(err){
          console.error('Error al leer el archivo de video:', err);
          ctx.reply('Error al detectar el video en pc.');
        }else {
          ctx.reply("Enviando clip...");
          ctx.replyWithVideo({source:videoData});
      }
  }); //fin readFile que envia el video
  ctx.reply("¿Quieres otro clip? (S/N)");
  banderaPregunta=5;
  banderaVideoSinCensura=true;
}

function clipConCensura(){
  mensajeAleatorio(cantidadClipsConCensura); //generar video aleatorio estableciendo como tope la cantidad de clips por el momento
  nombreVideo="clipcc"+randomEntero;
  nombreVideo=nombreVideo.toString();
  elVideo = 'clipsCC/'+nombreVideo+'.mp4';

  fs.readFile(elVideo, (err, videoData) => {
      if(err){
          console.error('Error al leer el archivo de video:', err);
          ctx.reply('Error al detectar el video en pc.');
        }else {
          ctx.reply("Enviando clip...");
          ctx.replyWithVideo({source:videoData});
      }
  }); //fin readFile que envia el video
  ctx.reply("¿Quieres otro clip? (S/N)");
  banderaPregunta=5;
  banderaVideoSinCensura=false;
}

function snClipDivertido(){
  if(banderaVideoSinCensura==true){ //el flujo aqui varia si se envió anteriormente un video SC o CS
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
  }else{//inicio else de filtro de censura
    switch(mensajeRecibidoMinusculas){
      case "s": clipConCensura();
        break;

      case "n": ctx.reply("Regresando al menu principal...");
                banderaVideoSinCensura=false;
                banderaPregunta=0;
                mensajeInicial();
        break;

      default: ctx.reply("Por favor, escribe bien. ¿Quieres otro clip? (S/N)");
        break;
    }
  }//fin else de filtro de video
}//fin funcion de SI/NO de clipDivertido



function adivinaPelicula(){
  ctx.reply("Selecciona una temática. Escribe solamente el número. Para regresar al menú principal escribe 'cancelar'\n1. Star Wars");
  banderaPregunta=9;
}

function elegirTematica(){
  switch(mensajeRecibidoMinusculas){
    case "1": 
    tematicaSeleccionada="STAR WARS";
    banderaPregunta=10;
    ctx.reply("Seleccionaste la temática de: "+tematicaSeleccionada+". Vamos a ver que tan buena memoria tienes para recordar las frases de algunas películas de la saga. ¿Estás listo?\n(S/N)");
      break;

    case "cancelar": 
    ctx.reply("Regresando al menú principal...");
    banderaPregunta=0;
    mensajeInicial();
    tematicaSeleccionada="";
      break;

    default: 
    ctx.reply("Por favor, escribe bien.");
    adivinaPelicula();
      break;
  }
}

function snEmpezarJuego(){
  switch(mensajeRecibidoMinusculas){
    case "s":
      ctx.reply("Aceptaste jugar con la temática de: "+tematicaSeleccionada+"\nSi quieres salir del juego, solo escribe 'cancelar'");
      generarPreguntasJuego();
      juegoComenzado();
      break;

    case "n":
      adivinaPelicula();
      break;

    default:
      ctx.reply("Por favor, escribe bien. ¿Quieres jugar con la temática de: "+tematicaSeleccionada+"? (S/N)");
      break;
  }
}

function generarPreguntasJuego(){//generarPreguntas
  swFrases=dataParseada.frasesdestarwars; //almacenar todo lo que hay en el objeto frasesdestarwars del JSON, que son distintos objetos con distintas frases
  swFrasesCantidad=swFrases.length; //obtener longitud de todos los objetos dentro de frasesdestarwars del JSON
  
  switch(tematicaSeleccionada){//switch
    case "STAR WARS":
    //for que construye los array de acuerdo a lo introducido en el JSON y los almacena en un objeto
    for(let i=0;i<swFrasesCantidad;i++){ //meter en un array todas las preguntas en el mismo orden.
      arrayFrases.splice(i,0,swFrases[i].frase); //en metodo splice los parametros son (posicion, cuantos quitar, valor a introducir)
      arrayPelicula.splice(i,0,swFrases[i].pelicula);
      arrayEscenas.splice(i,0,swFrases[i].escena); //?
      objetoPreguntasOrdenadas[arrayFrases[i]]=[arrayPelicula[i]];
    }
    paresClaveValorDelObjeto = Object.entries(objetoPreguntasOrdenadas); //meter en un array los pares clave y valor del objeto preguntasOrdenadas
    
    //FOR QUE CONSTRUIRÁ UN ARRAY CON PREGUNTAS ALEATORIAS 'SIN REPETIR' LA MISMA PREGUNTA EN OTRA POSICIÓN.
    cantidadPreguntasDeJuego=5;
    for(let i=0;i<cantidadPreguntasDeJuego;i++){ //Generamos 10 preguntas

      //Generamos un numero aleatorio valido entre la cantidad de objetos de frasesdestarwars(JSON)
      mensajeAleatorio(swFrasesCantidad); 
      arrayPreguntasDesordenadas.splice(i,0,paresClaveValorDelObjeto[randomEntero]);
      arrayEscenasElegidas.splice(i,0,arrayEscenas[randomEntero]);
      //console.log("iteracion "+i+" arrayPreguntasDesordenadas: "+arrayPreguntasDesordenadas);
      paresClaveValorDelObjeto.splice(randomEntero,1); //eliminar dicha posición, para que no lo vuelva a generar.
      arrayEscenas.splice(randomEntero,1);             //ekiminar dicha posición, para que no lo vuelva a generar.

      swFrasesCantidad--; //decrementar el valor del parametro del generador aleatorio, porque como eliminamos 
      //una posición del array, no sigue teniendo el mismo largo que el parametro.
    }



    break;
   //siguientes cases del switch aqui enseguida
  }//switch
  
}//generarPreguntas



function juegoComenzado(){//inicio funcion juegoComenzado
  
  n++;
  numeroDePreguntaJuegoAdivina++; //1...2...3...
  console.log("variable parametroPosicionPregunta antes de incrementar: "+parametroPosicionPregunta);
  parametroPosicionPregunta++;
  console.log("variable parametroPosicionPregunta despues de incrementar: "+parametroPosicionPregunta);
  
  ctx.reply("NIVEL "+numeroDePreguntaJuegoAdivina+" de "+cantidadPreguntasDeJuego+".\n¿De donde proviene el siguiente dialogo?\n\n"+arrayPreguntasDesordenadas[parametroPosicionPregunta][0]+"\n\n1. Star Wars: La amenaza fantasma\n2. Star Wars: El ataque de los clones. \n3. Star Wars: La venganza de los sith. \n4. Star Wars: Una nueva esperanza.\n5. Star Wars: El imperio contraataca.\n6. Star Wars: El regreso del jedi.\n7. Obi-Wan Kenobi");

  
  banderaPregunta=12;
  
  //[posicion de las preguntas aleatorias [frase,pelicula] ]
  almacenarPeliculaSW=arrayPreguntasDesordenadas[parametroPosicionPregunta][1];
  almacenarPeliculaSWbien=almacenarPeliculaSW.toString(); //forzar a string para no tener problemas al comparar
  

  //Asignar la respuesta correcta...
  switch(almacenarPeliculaSWbien){
  case "Star Wars: La amenaza fantasma":
    respuestaCorrecta="1";
    break;
  case "Star Wars: El ataque de los clones":
    respuestaCorrecta="2";
    break;
  case "Star Wars: La venganza de los sith":
    respuestaCorrecta="3";
    break;
  case "Star Wars: Una nueva esperanza":
    respuestaCorrecta="4";
    break;
  case "Star Wars: El imperio contraataca":
    respuestaCorrecta="5";
    break;
  case "Star Wars: El regreso del Jedi":
    respuestaCorrecta="6";
    break;
  case "Obi-Wan Kenobi":
    respuestaCorrecta="7";
    break;
  }
  
}//concluye funcionJuegoComenzado

function leerRespuestaJuegoComenzado(){//inicio funcion leerRespuestaJuegoComenzado

//funciones creadas para no repetir código.
function evaluaRespuesta(){
  if(mensajeRecibidoMinusculas==respuestaCorrecta){
    puntuacion++;
    ctx.reply("¡SI! ¡ACERTASTE!\nLA RESPUESTA CORRECTA ES: "+almacenarPeliculaSWbien+"\nPuntuación total: ("+puntuacion+"/"+cantidadPreguntasDeJuego+").");
  
  }else{
    ctx.reply("¡NO! ¡INCORRECTO!\nLA RESPUESTA CORRECTA ES: "+almacenarPeliculaSWbien+"\nPuntuación total: ("+puntuacion+"/"+cantidadPreguntasDeJuego+").\nEnviando escena...");
    enviaEscenaPelicula();
  }
}

//-----------------------------------------------------------------------------------------------------
function enviaEscenaPelicula(){
  tituloEscena="escena"+arrayEscenasElegidas[n];
  tituloEscena=tituloEscena.toString();
  elVideo = 'escenasdestarwars/'+tituloEscena+'.mp4';

  fs.readFile(elVideo, (err, videoData) => {
      if(err){
          ctx.reply('Error al detectar el video en pc o video no disponible.');
        }else {
          ctx.replyWithVideo({source:videoData});
      }
  });
}
//-------------------------------------------------------------------------------------------------------

function finDelJuego(){
  if(numeroDePreguntaJuegoAdivina==cantidadPreguntasDeJuego){ //para considerar la ultima pregunta, antes de saltar a esta instruccion
    mostrarResultadosJuego();
  }else{
    juegoComenzado();
  }
}


  switch(mensajeRecibidoMinusculas){//switch que compara si la respuesta es correcta
    case "1":
      evaluaRespuesta();
      finDelJuego();
      break;

    case "2":
      evaluaRespuesta();
      finDelJuego();
      break;

    case "3":
      evaluaRespuesta();
      finDelJuego();
      break;

    case "4":
      evaluaRespuesta();
      finDelJuego();
      break;

    case "5":
      evaluaRespuesta();
      finDelJuego();
      break;
      
    case "6":
      evaluaRespuesta();
      finDelJuego();
      break;

    case "7":
      evaluaRespuesta();
      finDelJuego();
      break;

    case "cancelar":
      ctx.reply("Regresando al menú principal...");
      numeroDePreguntaJuegoAdivina=0;
      parametroPosicionPregunta=-1;
      banderaPregunta=0;
      tematicaSeleccionada="";
      puntuacion=0;
      mensajeInicial();
      n=-1;
      reiniciarArraysJuegos();
      break;

    default: ctx.reply("Por favor. Introduce un número válido o escribe 'cancelar' para salir del juego.");
      break;            
  }//concluye switch que compara respuesta si es correcta

}//conluye funcion leerRespuestaJuegoComenzado

function mostrarResultadosJuego(){
  ctx.reply("JUEGO CONCLUIDO.\n\nTEMÁTICA: "+tematicaSeleccionada+".\n\nPUNTUACIÓN: ["+puntuacion+"/"+cantidadPreguntasDeJuego+"]\n\n¿Volver a jugar? (S/N)");
  banderaPregunta=13;
  numeroDePreguntaJuegoAdivina=0;
  parametroPosicionPregunta=-1;
  tematicaSeleccionada="";
  puntuacion=0;
  tituloEscena="";
  n=-1;
  reiniciarArraysJuegos();//eliminar todos los elementos del array y dejarlos vacios por si usuario vuelve a jugar
}

function reiniciarArraysJuegos(){
  paresClaveValorDelObjeto.splice(0,paresClaveValorDelObjeto.length);
  arrayPreguntasDesordenadas.splice(0,arrayPreguntasDesordenadas.length);
  arrayEscenasElegidas.splice(0,arrayEscenasElegidas.length);
  arrayEscenas.splice(0,arrayEscenas.length);
}

function snVolverAJugar(){
  switch(mensajeRecibidoMinusculas){
    case "s": 
      adivinaPelicula();
      break;

    case "n": 
      ctx.reply("Regresando al menú principal...");
      banderaPregunta=0;
      mensajeInicial();
      break;

    default: ctx.reply("Por favor, escribe bien. ¿Quieres volver a jugar? (S/N)");
      break;
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




// ESTA LINEA ES LA QUE ME HIZO VER LA INFO DEL MENSAJE ctx.deleteMessage(message_d,idChat);
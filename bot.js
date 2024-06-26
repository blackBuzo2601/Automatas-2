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
var jsonUsuariosData=fs.readFileSync('infoUsuarios.json','utf-8');
var jsonUsuariosDataParseada= JSON.parse(jsonUsuariosData);
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
var rutaCarpeta;
var banderaVideoSinCensura=false;
var imagenJuego="";
var imagenJuegoActual="";
var videoJuegoActual="";
var nombreVideo="";
var inicioEraJuego="";
var finEraJuego="";
var arrayJuegosEras=[];
var diferenciaAños=0;
var banderaPorEra=false; //Esta bandera, cambiara el flujo de la funcion snEnviarAvance()

var idDelVideojuego="00";
var cantidadClipsSinCensura=4;
var cantidadClipsConCensura=4;
var contadorVideojuegos=0;
var nombreJuegoMostrar="";
var construirListaJuegosMostrar="";
var construirListaJuegosMostrar2="";
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
var arrayProvisionalNoPosibleSW=[]; //este array almacenará todos los numeros que puede introducir el usuario como cantidad de preguntas para jugar
var arrayProvisionalNoPosibleDB=[]; //mismo caso que arriba pero para dragon ball
var contarEquivocaciones=0;
var respuestaCorrecta="";
var paresClaveValorDelObjeto="";
var parametroPosicionPregunta=-1; //para que empiece en 0...1...2...3...
var puntuacion=0;
var cantidadPreguntasDeJuego=0;
var almacenarPeliculaSW="";
var almacenarPeliculaSWbien="";
var almacenarPeliculaDB="";
var parametroAlmacenarPeliculaBien="";
var almacenarPeliculaDBbien="";
var tituloEscena="";
var n=-1; //para las escenas de las peliculas, ya que la primera empieza con 0
var numeroIntroducido=""; //variable que almacenará la cantidad que introduzca el usuario para las preguntas
var tematicaSeleccionadaCantidad=0;


//LAS SIGUIENTES CONSTANTES ALMACENAN LA CANTIDAD DE OBJETOS QUE HAY EN CADA CLAVE DEL archivo arreglojuegos.JSON
//Estas serán util para poder implementar una función para escoger un mensaje aleatorio estableciendo un tope maximo
//que será la cantidad que hay. De esta manera si hay 21 mensajes diferentes, el metodo random devolvera entre 1 y 21.
const listaVideojuegosCantidad = dataParseada.listaVideojuegos.length;
var listaVideojuegosCantidadDivision=listaVideojuegosCantidad;
const mensajesSalidaCantidad = dataParseada.mensajesSalida.length;                         
const mensajesMensajeRepetidoCantidad = dataParseada.mensajesMensajeRepetido.length;      
const mensajesConsejosPersonalesCantidad = dataParseada.mensajesConsejosPersonales.length; 
const mensajesBlacklistCantidad = dataParseada.mensajesBlacklist.length;

//Almacenar informacion de usuarios en log
const infoUsuarios = "infoUsuarios.json"; //nombre de archivo log
var idUsuario="";
var primerNombreUser="";
var ultimoNombreUser="";
var infoUserParaAlmacenar="";
var cantidadUsuariosRegistrados=0;
//var nuevoObjetoUsuario={} //almacenar informacion de usuarios para agregarlas al infoUsuarios.json

const swFrases=dataParseada.frasesdestarwars; 
var swFrasesCantidad=swFrases.length; //variable porque la iremos decrementando para no repetir misma frase
const dbFrases=dataParseada.frasesdedragonball;
var dbFrasesCantidad=dbFrases.length; //variable porque la iremos decrementando para no repetir misma frase

///------------------------------------------AREA DE LA MAGIA DEL BOT----------------------------------------------
//ctx (context) hace referencia a los datos que se usan en un chat

bot.on('message', (ctx) => { //INICIO de metodo .on del objeto BOT


/*INICIO DE ESTRUCTURA PARA ALMACENAR USUARIOS (EN PAUSA) 
//Almacenar información en archivo  log
idUsuario=ctx.message.from.id;
primerNombreUser=ctx.message.from.first_name;
ultimoNombreUser=ctx.message.from.last_name;
infoUserParaAlmacenar=+idUsuario+"\n"+primerNombreUser+"\n"+ultimoNombreUser+"\n";
cantidadUsuariosRegistrados=jsonUsuariosDataParseada.usuarios.length;

//verificar si el usuario está registrado
for(let i=0;i<cantidadUsuariosRegistrados;i++){ //iterar la cantidad de usuarios que hay en infoUsuarios.json para comprobar si está registrado
  if(idUsuario==jsonUsuariosDataParseada.usuarios[i].idDelUsuario){
    console.log("Usuario Registrado");
  }else{//inicio else :)
    nuevoObjetoUsuario = {
      "idDelUsuario": idUsuario,
      "primerNombre": primerNombreUser,
      "apellidos": ultimoNombreUser
    }
    jsonUsuariosDataParseada.push(nuevoObjetoUsuario);
  }//concluye else :)
}//concluye for que evalua si el usuario está registrado


fs.appendFile(infoUsuarios, infoUserParaAlmacenar, (err) => {
  if (err) {
      console.error('Error al almacenar en infoUsuarios.log', err);
  }
});


//dataParseada.listaVideojuegos[posicionJuegoDetectado].titulo
/////////////////////////////////////////////////////////////////////////////////////////

CONCLUYE ESTRUCTURA PARA ALMACENAR USUARIOS (EN PAUSA)*/

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
console.log("\nMensaje recibido: "+mensajeRecibido); 
console.log("Primer nombre: "+ctx.message.from.first_name+"\nApellidos: "+ctx.message.from.last_name+"\nID: "+ctx.message.from.id); 

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

        case 14: establecerCantidadPreguntas();
          break;

        case 15: establecerEraJuegos();
          break;

        case 16: mostrarJuegosPorEra();
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
  
  ctx.reply("<b>MENÚ PRINCIPAL</b>\nEl camino así es. Soy El Mandaloriano. Por favor, escribe como mensaje alguna de las siguientes opciones. No importa si está en mayusculas o minusculas, solo escríbelo bien: \n\n<b>RECOMENDAR VIDEOJUEGO</b>\n<b>CONSEJO PERSONAL</b>\n<b>ACERCA DE ELIAN</b>\n<b>CLIP DIVERTIDO</b>\n<b>ADIVINA LA FRASE</b>\n\nEspero ser de ayuda :)", {parse_mode: "HTML"});
}

function detectorDeClaves(){ //inicio funcion detectorDeClaves
  switch(mensajeRecibidoMinusculas){
    case "recomendar videojuego": preguntaSortearJuegos();
        break;  
    
    case "consejo personal": consejosPersonales();
        break;   

    case "acerca de elian": infoGeneral();
        break;

    case "clip divertido": clipDivertido();
        break;

    case "adivina la frase" : adivinaPelicula();
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

function preguntaSortearJuegos(){//inicia funcion preguntaSortearJuegos
  ctx.reply("Te puedo recomendar los videjuegos por era como también puedo hacerlo aleatoriamente. Para regresar al menú principal escribe 'cancelar'.\nElige una opción indicando el número por favor:\n\n1. Era Retro\n\n2. Era Medio Moderna\n\n3. Era Moderna\n\n4. Recomendar aleatoriamente");
  banderaPregunta=15;
}//concluye funcion preguntaSortearJuegos


//banderaPregunta=15
function establecerEraJuegos(){//inicia funcion establecerEraJuegos
  switch(mensajeRecibidoMinusculas){
    case "1": 
    inicioEraJuego=1996;   //este par de variables se colocan aquí, con el propósito de que si así lo desea, el usuario
    finEraJuego=2000;     //puede establecer cuales son sus propios topes de años para establecer las Eras de los juegos.
    recomiendaJuegosPorEra();
      break;

    case "2":
      inicioEraJuego=2001;
      finEraJuego=2010;
      recomiendaJuegosPorEra();
      break;

    case "3":
      inicioEraJuego=2011;
      finEraJuego=2020;
      recomiendaJuegosPorEra();
      break;

    case "4": recomiendaJuegos();
      break;
    
    case "cancelar": 
    ctx.reply("Regresando al menú principal...");
    banderaPregunta=0;
    mensajeInicial();  
      break;

    default: ctx.reply("Por favor, introduce un número válido.\nTe puedo recomendar los videjuegos por era como también puedo hacerlo aleatoriamente. Elige una opción indicando el número por favor:\n\n1. Era Retro\n\n2. Era Medio Moderna\n\n3. Era Moderna\n\n4. Recomendar aleatoriamente");
      break;
  }
}//concluye funcion establecerEraJuegos

function recomiendaJuegos(){
      if(contadorVideojuegos>=5 && banderaDeCompartirLista==false){
        ctx.reply("Ya me has pedido que te recomiende videojuegos "+(contadorVideojuegos)+" veces. ¿No quieres que mejor te comparta la lista y tu eliges el juego? <b>(S/N)</b>",{parse_mode:"HTML"});
        banderaPregunta=7;
        banderaDeCompartirLista=true;
      }else{//inicia ELSE de si se llega al 7mo videojuego a recomendar
        mensajeAleatorio(listaVideojuegosCantidad);
        posicionJuegoDetectado=randomEntero; 
        ctx.reply("<b>TITULO:</b> "+dataParseada.listaVideojuegos[posicionJuegoDetectado].titulo+"\n\n<b>GÉNERO:</b> "+dataParseada.listaVideojuegos[posicionJuegoDetectado].genero
        +"\n\n<b>AÑO DE LANZAMIENTO:</b> "+dataParseada.listaVideojuegos[posicionJuegoDetectado].año+"\n\n<b>EDAD RECOMENDADA:</b> "+dataParseada.listaVideojuegos[posicionJuegoDetectado].edadRecomendada+
        "\n\n<b>DESCRIPCIÓN GENERAL:</b> "+dataParseada.listaVideojuegos[posicionJuegoDetectado].descripcionDelJuego+"\n\n<b>PLATAFORMA:</b> "+dataParseada.listaVideojuegos[posicionJuegoDetectado].plataforma,{parse_mode: "HTML"});
        banderaPregunta=6;
        imagenJuego=dataParseada.listaVideojuegos[posicionJuegoDetectado].imagen; //almacenar ruta de la imagen
        ctx.replyWithPhoto({ source: imagenJuego });
        ctx.reply("¿Quieres ver un avance del videojuego? <b>(S/N)</b>", {parse_mode:"HTML"});
        banderaDeCompartirLista=false;
        contadorVideojuegos++;
      }//concluye ELSE  
}

function recomiendaJuegosPorEra(){ //INICIO funcion recomiendaJuegosPorEra
banderaPorEra=true;
diferenciaAños=finEraJuego-inicioEraJuego;
arrayJuegosEras=[]; //reiniciar arra
console.log("mostrando arrayJuegosEras al inicio de la funcion: "+arrayJuegosEras.length);
    for (let i=0;i<=diferenciaAños;i++){//inicio for principal para sortear juegos por era       

        for(let e=0;e<listaVideojuegosCantidad;e++){//inicio for subprincipal
              if(dataParseada.listaVideojuegos[e].año==inicioEraJuego.toString()){
                arrayJuegosEras.push(dataParseada.listaVideojuegos[e]);
              }
        }//concluye for subprincipal
        inicioEraJuego++;
      }//concluye for principal para sortear juegos por era
      console.log("mostrando arrayJuegosEras al fin de la funcion: "+arrayJuegosEras.length);
      recomendarJuegoIndividual();
}//CONCLUYE funcion recomiendaJuegosPorEra

//Cuando se selecciona una era, se usa esta función para generar los juegos de dicha era.
function recomendarJuegoIndividual(){
  if(arrayJuegosEras.length==0){ //comprobar si no se vació el array, es decir, no puede seguir recomendando juegos
    ctx.reply("Esos son todos los juegos correspondientes a esta era.\nRegresando al menú principal...");
    banderaPorEra=false;
    banderaPregunta=0;
    contadorVideojuegos=0; //reiniciar contador
    mensajeInicial();
  }else{//ELSE X
  mensajeAleatorio(arrayJuegosEras.length); //generar No. aleatorio en el rango de la cantidad de juegos de dicha epoca
  posicionJuegoDetectado=randomEntero; //el numero aleatorio generado en la funcion anterior, almacenarlo en la variable
  console.log("NUMERO ALEATORIO GENERADO: "+posicionJuegoDetectado);
  for(let b=0;b<arrayJuegosEras.length;b++){
    console.log(arrayJuegosEras[b].titulo); //ver el array completo para ver que coincida con la posición
  }
  console.log("JUEGO QUE DEBE MOSTRAR: "+arrayJuegosEras[posicionJuegoDetectado].titulo);
  ctx.reply("<b>TITULO:</b> "+arrayJuegosEras[posicionJuegoDetectado].titulo+"\n\n<b>GÉNERO:</b> "+arrayJuegosEras[posicionJuegoDetectado].genero
  +"\n\n<b>AÑO DE LANZAMIENTO:</b> "+arrayJuegosEras[posicionJuegoDetectado].año+"\n\n<b>EDAD RECOMENDADA:</b> "+arrayJuegosEras[posicionJuegoDetectado].edadRecomendada+
  "\n\n<b>DESCRIPCIÓN GENERAL:</b> "+arrayJuegosEras[posicionJuegoDetectado].descripcionDelJuego+"\n\n<b>PLATAFORMA:</b> "+arrayJuegosEras[posicionJuegoDetectado].plataforma,{parse_mode: "HTML"});
  imagenJuegoActual=arrayJuegosEras[posicionJuegoDetectado].imagen; //almacenar ruta del juego actual
  imagenJuegoActual=imagenJuegoActual.toString(); //convertir ruta a string
  console.log("variable imagenJuegoActual luego de pasar a string: "+imagenJuegoActual);
  imagenJuego=imagenJuegoActual; //almacenar ruta de la imagen
  imagenJuego=imagenJuego.toString();
  console.log("variable imagenjuego luego de pasar a string: "+imagenJuego);
  ctx.replyWithPhoto({ source: imagenJuego });

  idDelVideojuego=arrayJuegosEras[posicionJuegoDetectado].id; //almacenar el ID PERO en el array generado, sigue buscarlo en el JSON
  ctx.reply("¿Quieres ver un avance del videojuego? <b>(S/N)</b>", {parse_mode:"HTML"});
  banderaPregunta=6; //para preguntar si quiere ver el avance del juego

  console.log("juego que se va borrar del array: "+arrayJuegosEras[posicionJuegoDetectado].titulo);
  arrayJuegosEras.splice(posicionJuegoDetectado,1); //eliminar dicha posición, para que no lo vuelva a generar
  
  for(let i=0;i<arrayJuegosEras.length;i++){
    console.log("Juego: "+arrayJuegosEras[i].titulo);
  }
  console.log("Tamaño del array despues de borrar la posición: "+arrayJuegosEras.length);
  }//ELSE X
  

}//fin funcion recomendarJuegoIndividual()

/*las funciones s/n que vienen acompañadas de las funciones en si que devuelven los mensajes, son para evaluar
el siguiente mensaje, si es S, N o si es otro mensaje que no sea alguno de esos, para seguir una estructura
de menu principal.*/

//banderaPregunta=6
function snEnviarAvanceJuego(){
  switch(mensajeRecibidoMinusculas){
    case "s": enviarAvanceJuego();
      break;

    case "n":  ctx.reply("¿Quieres otra recomendación de videojuego? <b>(S/N)</b>",{parse_mode:"HTML"});
      banderaPregunta=1;
      break;
  
    default:
      ctx.reply("Por favor, escribe bien ¿Quieres ver un avance del videojuego? <b>(S/N)</b>",{parse_mode:"HTML"});
      break;
  }
}

//111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111
function enviarAvanceJuego(){//inicia funcion enviarAvanceJuego

  if(banderaPorEra==true){ //si se esta refiriendo a un juego individual de una era en particular
  
    videoJuegoActual="avance"+idDelVideojuego;
    videoJuegoActual=videoJuegoActual.toString();
    elVideo= "trailersjuegos/"+videoJuegoActual+".mp4";

    fs.readFile(elVideo, (err, videoData) => {
      if(err){
          ctx.reply('Error al detectar el video en pc o video no disponible para este juego.');
        }else {
          ctx.reply("<b>Enviando avance...</b>",{parse_mode:"HTML"});
          ctx.replyWithVideo({source:videoData});
      }
    }); //fin readFile que envia el video
    ctx.reply("¿Quieres otra recomendación de videojuego? <b>(S/N)</b>",{parse_mode:"HTML"});
    banderaPregunta=1;

//--------------------------------------------------------------------------------------------------------
  }else{//si se trata de videojuegos en general (aleatorio)
    idDelVideojuego=dataParseada.listaVideojuegos[posicionJuegoDetectado].id;
    nombreVideo="avance"+idDelVideojuego;
    nombreVideo=nombreVideo.toString();
    elVideo = 'trailersjuegos/'+nombreVideo+'.mp4';
  
    fs.readFile(elVideo, (err, videoData) => {
        if(err){
            ctx.reply('Error al detectar el video en pc o video no disponible para este juego.');
          }else {
            ctx.reply("<b>Enviando avance...</b>",{parse_mode:"HTML"});
            ctx.replyWithVideo({source:videoData});
        }
    }); //fin readFile que envia el video
    ctx.reply("¿Quieres otra recomendación de videojuego? <b>(S/N)</b>",{parse_mode:"HTML"});
    banderaPregunta=1;
  }

}//concluye funcion enviarAvanceJuego
//111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111


//banderaPregunta=1
function snFuncionjuegos(){
  switch(mensajeRecibidoMinusculas){//inicio switch
    case "s": 
    if(banderaPorEra==true){
      recomendarJuegoIndividual();
    }else{
      recomiendaJuegos();
    }
      break;

    case "n": ctx.reply("Regresando al menu principal... ");
      banderaPorEra=false;
      banderaPregunta=0;
      contadorVideojuegos=0; //reiniciar contador
      mensajeInicial();
      break;
    
    default:
      ctx.reply("Por favor. Escribe bien. ¿Quieres otra recomendación de videojuego? <b>(S/N)</b>",{parse_mode:"HTML"});
      break;
  }//fin switch
}

//banderaPregunta=7
function snMandarListaJuegos(){
  switch(mensajeRecibidoMinusculas){//inicio switch
    case "s":
      listaVideojuegosCantidadDivision=(listaVideojuegosCantidadDivision/2); //30
      for(let i=0;i<listaVideojuegosCantidadDivision;i++){ //0--29
        nombreJuegoMostrar=dataParseada.listaVideojuegos[i].titulo;
        construirListaJuegosMostrar=construirListaJuegosMostrar+"\n"+nombreJuegoMostrar;
      }
      for(let i=listaVideojuegosCantidadDivision;i<listaVideojuegosCantidad;i++){ //30--60 
        nombreJuegoMostrar=dataParseada.listaVideojuegos[i].titulo;
        construirListaJuegosMostrar2=construirListaJuegosMostrar2+"\n"+nombreJuegoMostrar;
      }
      ctx.reply(construirListaJuegosMostrar);
      ctx.reply(construirListaJuegosMostrar2);
      construirListaJuegosMostrar="";
      construirListaJuegosMostrar2="";
      ctx.reply("Escribe el nombre de un videojuego así como viene en la lista para leer su información.\nEscribe '<b>cancelar</b>' para regresar al menu principal",{parse_mode:"HTML"});
      banderaPregunta=8;
      break;

    case "n": ctx.reply("¿Quieres otra recomendación de videojuego? <b>(S/N)</b>",{parse_mode:"HTML"});
      banderaPregunta=1;
      break;
    
    default:
      ctx.reply("Por favor. Escribe bien. ¿Quieres ver la lista completa de videojuegos? <b>(S/N)</b>",{parse_mode:"HTML"});
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
        ctx.reply("<b>TITULO:</b> "+dataParseada.listaVideojuegos[posicionJuegoDetectado].titulo+"\n\n<b>GÉNERO:</b> "+dataParseada.listaVideojuegos[posicionJuegoDetectado].genero
        +"\n\n<b>AÑO DE LANZAMIENTO:</b> "+dataParseada.listaVideojuegos[posicionJuegoDetectado].año+"\n\n<b>EDAD RECOMENDADA:</b> "+dataParseada.listaVideojuegos[posicionJuegoDetectado].edadRecomendada+
        "\n\n<b>DESCRIPCIÓN GENERAL:</b> "+dataParseada.listaVideojuegos[posicionJuegoDetectado].descripcionDelJuego+"\n\n<b>PLATAFORMA:</b> "+dataParseada.listaVideojuegos[posicionJuegoDetectado].plataforma,{parse_mode: "HTML"});
        banderaPregunta=6;
        imagenJuego=dataParseada.listaVideojuegos[posicionJuegoDetectado].imagen; //almacenar ruta de la imagen
        ctx.replyWithPhoto({ source: imagenJuego });
        ctx.reply("¿Quieres ver un avance del videojuego?<b>(S/N)</b>",{parse_mode:"HTML"});
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
    ctx.reply("Por favor, escribe bien. Escribe un videojuego de la lista correctamente.\nEscribe '<b>cancelar</b>' para regresar al menú principal.",{parse_mode:"HTML"});
  }

}//eee


function consejosPersonales(){
  mensajeAleatorio(mensajesConsejosPersonalesCantidad);
  ctx.reply(dataParseada.mensajesConsejosPersonales[randomEntero].mensaje+"\n\n¿Quieres otro consejo? <b>(S/N)</b>",{parse_mode:"HTML"});
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
      ctx.reply("Por favor. Escribe bien. ¿Quieres otro consejo personal? <b>(S/N)</b>",{parse_mode:"HTML"});
      break;
  }//fin switch
}

function infoGeneral(){
  ctx.reply("<b>INFORMACIÓN GENERAL DE MI CREADOR</b>\n\n<b>Nombre:</b> Buzo Zamora Elian\n<b>Fecha de nacimiento:</b> 26/01/2002\n<b>Nacionalidad:</b> Mexicana\n<b>Sexo:</b> Masculino\n<b>Ciudad de nacimiento:</b> Ensenada\n<b>Estado Civil:</b> Soltero\n\n¿Quieres algo más? <b>Escribe cualquier cosa</b> para regresar al menú principal.", {parse_mode: "HTML"});
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
  ctx.reply("Los clips divertidos contienen <b>lenguaje vulgar</b>. Para esto, puedes elegir ver los videos <b>sin censura/con censura</b>. ¿Como prefieres verlo?\n\n(<b>SC</b>=Sin censura/<b>CS</b>=Con censura)\n\n<b>Cancelar</b>=Volver al menú principal",{parse_mode:"HTML"});
  banderaPregunta=4;
}

function menuClipDivertido(){
  switch(mensajeRecibidoMinusculas){
    case "sc":  ctx.reply("<b>MODO SIN CENSURA</b>",{parse_mode:"HTML"});
      clipSinCensura();
      break;
    
    case "cs":  ctx.reply("<b>MODO FAMILY FRIENDLY</b>",{parse_mode:"HTML"});
      clipConCensura();
      break;

    case "cancelar":
      ctx.reply("Regresando al menú principal...");
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
          ctx.reply("<b>Enviando clip...</b>",{parse_mode:"HTML"});
          ctx.replyWithVideo({source:videoData});
      }
  }); //fin readFile que envia el video
  ctx.reply("¿Quieres otro clip? <b>(S/N)</b>",{parse_mode:"HTML"});
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
          ctx.reply("<b>Enviando clip...</b>",{parse_mode:"HTML"});
          ctx.replyWithVideo({source:videoData});
      }
  }); //fin readFile que envia el video
  ctx.reply("¿Quieres otro clip? <b>(S/N)</b>",{parse_mode:"HTML"});
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

      default: ctx.reply("Por favor, escribe bien. ¿Quieres otro clip? <b>(S/N)</b>",{parse_mode:"HTML"});
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

      default: ctx.reply("Por favor, escribe bien. ¿Quieres otro clip? <b>(S/N)</b>",{parse_mode:"HTML"});
        break;
    }
  }//fin else de filtro de video
}//fin funcion de SI/NO de clipDivertido



function adivinaPelicula(){
  ctx.reply("Selecciona una temática. <b>Escribe solamente el número</b>. Para regresar al menú principal escribe '<b>cancelar</b>'\n\n\n1. <b>STAR WARS</b>\n\n2. <b>DRAGON BALL</b>",{parse_mode:"HTML"});
  banderaPregunta=9;
}

//banderaPregunta=9
function elegirTematica(){
  swFrasesCantidad=swFrases.length; //reiniciar variables
  dbFrasesCantidad=dbFrases.length;

  switch(mensajeRecibidoMinusculas){
    case "1": 
    tematicaSeleccionada="STAR WARS";
    ctx.reply("Seleccionaste la temática de: <b>"+tematicaSeleccionada+"</b>.\nPor favor. <b>Establece la cantidad de preguntas para el juego</b>. Elige un valor entre <b>1 y "+(swFrasesCantidad)+" </b>.\nEscribe '<b>regresar</b>' para ver el menú de temáticas o '<b>cancelar</b>' para ir al menú principal.",{parse_mode:"HTML"});
    banderaPregunta=14;
      break;

    case "2":
    tematicaSeleccionada="DRAGON BALL";
    ctx.reply("Seleccionaste la temática de: <b>"+tematicaSeleccionada+"</b>.\nPor favor. <b>Establece la cantidad de preguntas para el juego</b>. Elige un valor entre <b>1 y "+(dbFrasesCantidad)+" </b>.\nEscribe '<b>regresar</b>' para ver el menú de temáticas o '<b>cancelar</b>' para ir al menú principal.",{parse_mode:"HTML"});
    banderaPregunta=14;
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

//banderaPregunta=14
function establecerCantidadPreguntas(){//inicio funcion establecerCantidadPreguntas
//segun sea el caso, se establece el paraemtro para el usuario, segun haya escogido en el menu de tematica

  if(tematicaSeleccionada=="STAR WARS"){
   
    tematicaSeleccionadaCantidad=swFrasesCantidad;
    for(let i=0;i<swFrasesCantidad;i++){ //generar numeros válidos para STAR WARS
      arrayProvisionalNoPosibleSW.splice(i,0,i);  //posicion,cuantosquitar,valorintroducir
      arrayProvisionalNoPosibleSW[i].toString();  //para no tener problemas porque lo comparamos con caracteres
    }
    for(let l=0;l<arrayProvisionalNoPosibleSW.length;l++){ //comprobar si es un numero valido para casos de STAR WARS
      if(arrayProvisionalNoPosibleSW[l]==(mensajeRecibidoMinusculas)){
      numeroIntroducido=mensajeRecibidoMinusculas;
      break;
      }
    } 
  }
  else if(tematicaSeleccionada=="DRAGON BALL"){
    
    tematicaSeleccionadaCantidad=dbFrasesCantidad;
    for(let m=0;m<dbFrasesCantidad;m++){ //generar numeros válidos para DRAGON BALL
      arrayProvisionalNoPosibleDB.splice(m,0,m);  //posicion,cuantosquitar,valorintroducir
      arrayProvisionalNoPosibleDB[m].toString();  //para no tener problemas porque lo comparamos con caracteres
    }
    //comprobar si es un numero valido para casos de DRAGON BALL
    for(let n=0;n<arrayProvisionalNoPosibleDB.length;n++){ 
      if(arrayProvisionalNoPosibleDB[n]==(mensajeRecibidoMinusculas)){
        numeroIntroducido=mensajeRecibidoMinusculas;
        break;
      }
    }
  }
    
    

//-----------------------------------------------------------------------------------------------------------
//Ciclos For que construyen los números válidos a introducir para el usuario

  switch(mensajeRecibidoMinusculas){

    case numeroIntroducido:
      ctx.reply("Estableciste un juego de <b>"+numeroIntroducido+"</b> preguntas.\n<b>Temática:</b> "+tematicaSeleccionada+"\n¿Es correcto? <b>(S/N)</b>",{parse_mode:"HTML"});
      banderaPregunta=10;
      break;

    case "regresar": 
    adivinaPelicula();
      break;

    case "cancelar":
    ctx.reply("Regresando al menú principal...");
    banderaPregunta=0;
    mensajeInicial();
    tematicaSeleccionada="";
    break;

    default: ctx.reply("Por favor, escribe bien. Elige un valor entre <b>1 y "+tematicaSeleccionadaCantidad+" .</b>\nEscribe '<b>regresar</b>' para ver el menú de temáticas o '<b>cancelar</b>' para ir al menú principal.",{parse_mode:"HTML"});
      break;
  }

}//concluye funcion establecerCantidadPreguntas

//banderaPregunta=10
function snEmpezarJuego(){
  switch(mensajeRecibidoMinusculas){
    case "s":
      generarPreguntasJuego();
      juegoComenzado();
      break;

    case "n":
      adivinaPelicula();
      break;

    default:
      ctx.reply("Por favor, escribe bien.\nEstableciste un juego de <b>"+numeroIntroducido+" preguntas.</b>\n<b>Temática:</b> "+tematicaSeleccionada+"\n¿Es correcto? <b>(S/N)</b>",{parse_mode:"HTML"});
      break;
  }
}

function generarPreguntasJuego(){

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
    cantidadPreguntasDeJuego=numeroIntroducido;
    for(let i=0;i<cantidadPreguntasDeJuego;i++){ //Generamos 10 preguntas

      //Generamos un numero aleatorio valido entre la cantidad de objetos de frasesdestarwars(JSON)
      mensajeAleatorio(swFrasesCantidad); 
      arrayPreguntasDesordenadas.splice(i,0,paresClaveValorDelObjeto[randomEntero]);
      arrayEscenasElegidas.splice(i,0,arrayEscenas[randomEntero]);
     
      paresClaveValorDelObjeto.splice(randomEntero,1); //eliminar dicha posición, para que no lo vuelva a generar.
      arrayEscenas.splice(randomEntero,1);             //ekiminar dicha posición, para que no lo vuelva a generar.

      swFrasesCantidad--; //decrementar el valor del parametro del generador aleatorio, porque como eliminamos 
      //una posición del array, no sigue teniendo el mismo largo que el parametro.
    }
    break;
//--------------------------------------------------------------------------------------------------------------------
    case "DRAGON BALL": 
    for(let i=0;i<dbFrasesCantidad;i++){ 
      arrayFrases.splice(i,0,dbFrases[i].frase); 
      arrayPelicula.splice(i,0,dbFrases[i].pelicula);
      arrayEscenas.splice(i,0,dbFrases[i].escena);
      objetoPreguntasOrdenadas[arrayFrases[i]]=[arrayPelicula[i]];
    }
    paresClaveValorDelObjeto = Object.entries(objetoPreguntasOrdenadas); 
    
    cantidadPreguntasDeJuego=numeroIntroducido;
    for(let i=0;i<cantidadPreguntasDeJuego;i++){ //Generamos 10 preguntas

      //Generamos un numero aleatorio valido entre la cantidad de objetos de frasesdestarwars(JSON)
      mensajeAleatorio(dbFrasesCantidad); 
      arrayPreguntasDesordenadas.splice(i,0,paresClaveValorDelObjeto[randomEntero]);
      arrayEscenasElegidas.splice(i,0,arrayEscenas[randomEntero]);
    
      paresClaveValorDelObjeto.splice(randomEntero,1); 
      arrayEscenas.splice(randomEntero,1);           
      dbFrasesCantidad--; 
      
    }
    break;
  }//switch
  
}//generarPreguntas



function juegoComenzado(){//inicio funcion juegoComenzado
  
  switch(tematicaSeleccionada){ //INICIO SWITCH GENERAL
    case "STAR WARS":
      n++;
      numeroDePreguntaJuegoAdivina++; //1...2...3...
      parametroPosicionPregunta++;
      
      ctx.reply("NIVEL "+numeroDePreguntaJuegoAdivina+" de "+cantidadPreguntasDeJuego+".\n¿De donde proviene el siguiente dialogo?\n\n"+arrayPreguntasDesordenadas[parametroPosicionPregunta][0]+"\n\n1. Star Wars: La amenaza fantasma\n2. Star Wars: El ataque de los clones. \n3. Star Wars: La venganza de los sith. \n4. Star Wars: Una nueva esperanza.\n5. Star Wars: El imperio contraataca.\n6. Star Wars: El regreso del jedi.\n7. Obi-Wan Kenobi");
    
      banderaPregunta=12;
      
      //[posicion de las preguntas aleatorias [frase,pelicula] ]
      almacenarPeliculaSW=arrayPreguntasDesordenadas[parametroPosicionPregunta][1];
      almacenarPeliculaSWbien=almacenarPeliculaSW.toString(); //forzar a string para no tener problemas al comparar
      parametroAlmacenarPeliculaBien=almacenarPeliculaSWbien;
      console.log("respuesta "+parametroAlmacenarPeliculaBien);
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
    break;
    
//CASO PARA DRAGON BALL :)
  case "DRAGON BALL":
  n++;
  numeroDePreguntaJuegoAdivina++; //1...2...3...
  parametroPosicionPregunta++;
  
  ctx.reply("NIVEL "+numeroDePreguntaJuegoAdivina+" de "+cantidadPreguntasDeJuego+".\n¿De donde proviene el siguiente dialogo?\n\n"+arrayPreguntasDesordenadas[parametroPosicionPregunta][0]+"\n\n1. Dragon Ball Z\n2. Dragon Ball Z: La batalla de los dioses\n3. Dragon Ball Z: El poder invencible\n4. Dragon Ball Z: La batalla mas grande de este mundo esta por comenzar\n5. Dragon Ball Z: La fusion de goku y vegeta\n6. Dragon Ball Z: La resurreccion de freezer\n7. Dragon Ball Super\n");

  banderaPregunta=12;
  
  //[posicion de las preguntas aleatorias [frase,pelicula] ]
  almacenarPeliculaDB=arrayPreguntasDesordenadas[parametroPosicionPregunta][1];
  almacenarPeliculaDBbien=almacenarPeliculaDB.toString(); //forzar a string para no tener problemas al comparar
  parametroAlmacenarPeliculaBien=almacenarPeliculaDBbien;
  console.log("respuesta "+almacenarPeliculaDB);
  //Asignar la respuesta correcta...
  switch(almacenarPeliculaDBbien){
  case "Dragon Ball Z":
    respuestaCorrecta="1";
    break;
  case "Dragon Ball Z: La batalla de los dioses":
    respuestaCorrecta="2";
    break;
  case "Dragon Ball Z: El poder invencible":
    respuestaCorrecta="3";
    break;
  case "Dragon Ball Z: La batalla mas grande de este mundo esta por comenzar":
    respuestaCorrecta="4";
    break;
  case "Dragon Ball Z: La fusion de goku y vegeta":
    respuestaCorrecta="5";
    break;
  case "Dragon Ball Z: La resurreccion de freezer":
    respuestaCorrecta="6";
    break;
  case "Dragon Ball Super":
    respuestaCorrecta="7";
    break;
  }

}//CONCLUYE SWITCH GENERAL
  
}//concluye funcionJuegoComenzado

//banderaPregunta=12
function leerRespuestaJuegoComenzado(){//inicio funcion leerRespuestaJuegoComenzado

//funcion creada para no repetir código.
function evaluaRespuesta(){
  if(mensajeRecibidoMinusculas==respuestaCorrecta){
    puntuacion++;
    ctx.reply("¡SI! ¡ACERTASTE!\nLA RESPUESTA CORRECTA ES: "+parametroAlmacenarPeliculaBien+"\nPuntuación total: ("+puntuacion+"/"+cantidadPreguntasDeJuego+").");
  }else{
    ctx.reply("¡NO! ¡INCORRECTO!\nLA RESPUESTA CORRECTA ES: "+parametroAlmacenarPeliculaBien+"\nPuntuación total: ("+puntuacion+"/"+cantidadPreguntasDeJuego+").\nEnviando escena...");
    enviaEscenaPelicula();
  }
}
//otra funcion creada para no repetir código.
function enviaEscenaPelicula(){
  
  switch(tematicaSeleccionada){
    case "STAR WARS":
    rutaCarpeta='escenasdestarwars/'
    break;

    case "DRAGON BALL":
    rutaCarpeta='escenasdedragonball/'
    break;
  }
  tituloEscena="escena"+arrayEscenasElegidas[n];
  tituloEscena=tituloEscena.toString();
  elVideo = rutaCarpeta+tituloEscena+'.mp4';

  fs.readFile(elVideo, (err, videoData) => {
      if(err){
          ctx.reply('Error al detectar el video en pc o video no disponible.');
        }else {
          ctx.replyWithVideo({source:videoData});
      }
  });
}
//otra funcion mas para no repetir codigo
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
  Object.keys(objetoPreguntasOrdenadas).forEach(key => delete objetoPreguntasOrdenadas[key]);
  paresClaveValorDelObjeto = [];
}

//banderaPregunta=13
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
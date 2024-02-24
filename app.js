/*  Usamos el modulo fs de Node.js
    con require ('fs) se esta importando el modulo 
    para acceder a todas las funciones y metodos de fs. */
    const fs = require ('fs'); 
        /*readFile es un método de fs.
        UTF-8 el parámetro que indica que se desea leer el archivo en formato UTF-8. 
        (err, data) son las variables que usamos como parámetro de nuestro callBack.
        err: se utiliza para almacenar cualquier error que ocurra durante la operacion.
        data: se utiliza para almacenar los datos o el resultado de la operacion
        */ 
    
   
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
fs.readFile('arreglojuegos.json','utf8', (err, data) => {
        var infoJSON = data; //variable que almacena toda la información del archivo .JSON

        

    
    
    












        console.log("Prueba de imprimir informacion\n");
        console.log("-----------------------------------")
        console.log(infoJSON);
});//////////////////////////////////////fin del método readFILE///////////////////////////////////////////////////
    
    
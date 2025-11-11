
/* --------------------- VALORES DE ENTRADA --------------------- */ 

let cartel = prompt("¿Cuántos carteles hay?");
while (isNaN(cartel) || cartel === "") {
    alert("Error. La entrada debe ser un número.");
    cartel = prompt("¿Cuántos carteles hay?");
}
let puerta = cartel;
let escaparate = cartel;

console.log("El número de carteles es de " + cartel);
console.log("El número de puertas es de " + puerta);
console.log("El número de escaparates es de " + escaparate);


let numPuerta = prompt("¿Cuál es el número de la primera puerta?");
    while (isNaN(numPuerta) || numPuerta === "") {
        alert("Error. La entrada debe ser un número.")
        numPuerta = prompt("¿Cuál es el número de la primera puerta?");
    }
    numPuerta = Number(numPuerta)

/* --------------------- APARTADO DE CARTELES --------------------- */ 

document.write("<div id='seccion_cartel'>");
for (let i = 0; i <= cartel - 1; i++) {

    /* --------------------- Valor de entrada de cantidad de carteles --------------------- */ 

    let nombreCartel = prompt("¿Cuál es el nombre del cartel?");
    while (!isNaN(nombreCartel) && nombreCartel === "") {
        alert("Error. La entrada tiene que ser un nombre válido");
        nombreCartel = prompt("¿Cuál es el nombre del cartel?");
    }   
    console.log("Genera puerta " + numPuerta);
    console.log("El nombre del cartel es " + nombreCartel);

    /* --------------------- Detalles del cartel --------------------- */ 
    
    document.write("<div id='cartel'>");
    document.write("<p>" + nombreCartel + "</p>");

    document.write("<div id='puerta-escaparate'>");

    document.write("<div id='seccion_puerta'>");
    document.write("<p>" + numPuerta + "</p>");
    document.write("<img src='imagenes/puerta.png' alt='Imagen puerta'>");
    numPuerta += 2;
    document.write("</div>"); /* Cierre div seccion_puerta */

    document.write("<div id='seccion_escaparate'>");
    let oferta = prompt("¿De cuánto porcentaje es la oferta?");

    if (isNaN(oferta) || oferta == 0) {
        document.write("<p>No hay oferta</p>")
        console.log("No hay oferta en " + nombreCartel)
    } else {
        document.write("<p>" + oferta + "%</p>");
        console.log("La oferta en " + nombreCartel + " es de " + oferta + "%")
    }

    document.write("<img src='imagenes/escaparate.png' alt='Imagen escaparate'>");
    document.write("</div>"); /* Cierre div seccion_escaparate */

    document.write("</div>"); /* Cierre div puerta-escaparate */

    document.write("</div>"); /* Cierre div cartel */
}
document.write("</div>"); /* Cierre div seccion_cartel */

/* --------------------- VALIDAR RELOJ --------------------- */ 

let reloj = prompt("¿Qué hora es? (Formato 00:00)");
const formatoReloj = /^[0-2][0-9]:[0-5][0-9]$/; /* Formato a seguir del reloj */

while (!formatoReloj.test(reloj) || reloj === "") {
    alert("Error. La hora tiene que seguir el formato (00:00)");
    reloj = prompt("¿Qué hora es? (Formato 00:00)");
}
console.log("La hora marcada es " + reloj);


/* --------------------- APARTADO DE SEMAFORO --------------------- */ 

document.write("<div id='seccion_semaforo'>");

document.write("<div id='seccion_reloj'>");
document.write("<p>" + reloj + "</p>");
document.write("</div>"); /* Cierre div seccion_reloj */

let semaforo = prompt("¿De qué color es el semáforo?").toLowerCase();
while (semaforo !== "rojo" && semaforo !== "amarillo" && semaforo !== "verde") {
    alert("Error. La entrada debe ser un color de semáforo (rojo, amarillo, verde).")
    semaforo = prompt("¿De qué color es el semáforo?").toLowerCase();
}

switch (semaforo) {
    case "rojo":
        document.write("<img src='imagenes/rojo.png' alt='Semáforo rojo'>");
        break;
        
    case "amarillo":
        document.write("<img src='imagenes/amarillo.png' alt='Semáforo amarillo'>");
        break;

    case "verde":
        document.write("<img src='imagenes/verde.png' alt='Semáforo verde'>");
        break;

    default:
        break;
}
console.log("El semáforo es de color " + semaforo);
document.write("</div>"); /* Cierre div seccion_semaforo */

/* --------------------- APARTADO DE COCHES --------------------- */ 

let coche = (prompt("¿Cuántos coches hay?"));
while (isNaN(coche) || coche === "") {
    alert("Error. La entrada debe ser un número. ¿Cuántos coches hay?")
    coche = prompt("¿Cuántos coches hay?");
}
console.log("El número de coches es " + coche)

document.write("<div id='seccion_coche'>")
for (let i = 1; i <= coche; i++) {    
    document.write("<img src='imagenes/coche.png' alt='Imagen coche'>");
}
document.write("</div>") /* Cierre div seccion_coche */
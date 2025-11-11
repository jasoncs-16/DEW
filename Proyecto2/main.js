
// LISTA DETERMINADA DE COMPAÑIAS AEREAS
const listaAerolinea = ["binter", "iberia", "ryanair"]

// REDIRIGIR AL USUARIO A LA AEROLINEA SELECCIONADA
function getLink(webAerolinea) {
    switch (webAerolinea) {
        case "binter":
            window.location.href = listaAerolinea[0] + '.html';
            break;
            
        case "iberia":
            window.location.href = listaAerolinea[1] + '.html';
            break;
                
        case "ryanair":
            window.location.href = listaAerolinea[2] + '.html';
            break;
    }
}

// CREACION DE INSTANCIAS DE LA CLASE AVION PARA CADA AEROLINEA
class Avion {
    // APARTADO DEL CONSTRUCTOR Y SUS PROPIEDADES
    constructor(numeroFilas, numeroColumnas, nombreCompanhia, precioBase, matriz=[]) {
        this.numeroFilas = numeroFilas
        this.numeroColumnas = numeroColumnas
        this.nombreCompanhia = nombreCompanhia
        this.precioBase = precioBase
        this.matriz = matriz
    }

    // METODO RESERVAR PLAZA
    reservarPlaza() {
        let opcion = parseInt(prompt("=== Menú Reservar Asientos ===\n[1] Repetir proceso\n[2] Finalizar proceso\n\nElija la opción deseada: "))

        while (opcion >= 3 || opcion <= 0 || isNaN(opcion)) { // Validación para aceptar solo los valores ofrecidos
            alert("Error. La entrada debe ser una de las opciones ofrecidas.");
            opcion = parseInt(prompt("=== Menú Reservar Asientos ===\n[1] Repetir proceso\n[2] Finalizar proceso\n\nElija la opción deseada: "))            
        }
        if (opcion == 1) { // Reiniciar la página para repetir el proceso
            if (window.location.href.includes("binter.html")) {
                window.location.href = listaAerolinea[0] + '.html';

            } else if (window.location.href.includes("iberia.html")) {
                window.location.href = listaAerolinea[1] + '.html';

            } else if (window.location.href.includes("ryanair.html")) {
                window.location.href = listaAerolinea[2] + '.html';

            }

        } else if (opcion == 2) { // Resultados
            alert("Residente:\nPrecio Base:\nPrecio Final:")
        }
    
    }

    // METODO LIBERAR PLAZAS RESERVADAS
    liberarPlaza() {
        
    }

    // ESTRUCTURA PARA LA CREACION DEL AVION
    crearAvion() {
        console.log("Bienvenido a la página de " + this.nombreCompanhia)

        document.write("<p id='tituloAerolinea'>" + this.nombreCompanhia + "</p>")

        document.write(this.cuadroPrecio(this.precioBase))

        document.write("<table id='nuevoAvion'>")

        document.write("<tr>")

        document.write("<th colspan = " + this.numeroColumnas*0.15 + ">Business</th>")
        document.write("<th colspan = " + this.numeroColumnas*0.35 + ">Economy</th>")
        document.write("<th colspan = " + this.numeroColumnas*0.5 + ">Low-Cost</th>")

        document.write("</tr>")

        for (let i = 0; i <= this.numeroFilas; i++) {
            document.write("<tr>")
            let filaMatriz = []

            for  (let j = 0; j <= this.numeroColumnas - 1; j++) {
                if (j < this.numeroColumnas*0.15) { 
                    document.write("<td class='asiento_business'></td>")
                } else if (j < this.numeroColumnas*0.5) {
                    document.write("<td class='asiento_economy'></td>")
                } else {
                    document.write("<td class='asiento_lowcost'></td>")
                }
                filaMatriz.push(0)
            }
            this.matriz.push(filaMatriz)
            document.write("</tr>")
        }
        document.write("</table>")

        document.write("<div id='botones'>")
        document.write("<button id='botonLiberar'>Liberar asientos</button>")
        document.write("<button id='botonReserva'>Reservar asientos</button>")

        const botonReserva = document.getElementById("botonReserva")
        const botonLiberar = document.getElementById("botonLiberar")

        botonReserva.addEventListener("click", () => this.reservarPlaza())
        botonLiberar.addEventListener("click", () => this.liberarPlaza())
        document.write("</div>")

        console.log(this.matriz)  

        const asientoElegido = document.querySelectorAll("#nuevoAvion td")

        asientoElegido.forEach(td => {
            if (td.classList.contains("asiento_business")) {
                td.onclick = function() {
                    
                }
            } else if ((td.classList.contains("asiento_economy"))) {
                td.onclick = function() {
                    
                }
            } else if ((td.classList.contains("asiento_lowcost"))) {
                td.onclick = function() {
                    
                }
            }
        })
    }

    // SECCION DE CATEGORIAS DE ASIENTO Y TIPO DE RESIDENCIA
    cuadroPrecio(nuevoPrecio) {
        document.write("<div id='cuadroPrecio'>")

        document.write("<p id='p_categoria'>Categorías:</p>")
        document.write("<p>Business: " + nuevoPrecio * 1.5 + "€</p>")
        document.write("<p>Economy: " + nuevoPrecio + "€</p>")
        document.write("<p>Low-Cost: " + nuevoPrecio * 0.5 + "€</p>")

        document.write("<label>")
        document.write("<input type='radio' name='residente' value=1>")
        document.write("Residente</label>")

        document.write("<label>")
        document.write("<input type='radio' name='residente' value=0>")
        document.write("No Residente</label>")

        document.write("</div>")
        return ""
    }
}

// ASEGURAR QUE CADA INSTACIA DE AVION SE CREA EN LA URL CORRESPONDIENTE
if (window.location.href.includes("binter.html")) {
    let binter = new Avion(3,20,"Binter",150)
    binter.crearAvion()

} else if (window.location.href.includes("iberia.html")) {
    let iberia = new Avion(5,20,"Iberia",120)
    iberia.crearAvion()

} else if (window.location.href.includes("ryanair.html")) {
    let ryanair = new Avion(3,40,"Ryanair",80)
    ryanair.crearAvion()

} else {
    document.write("<p id='p_pagina_inicial'>Selecciona la aerolinea que desees: <p>")

    document.write("<h1 id='binter'>Binter</h1>")
    document.write("<h1 id='iberia'>Iberia</h1>")
    document.write("<h1 id='ryanair'>Ryanair</h1>")

    const botonBinter = document.getElementById("binter")
    const botonIberia = document.getElementById("iberia")
    const botonRyanair = document.getElementById("ryanair")

    botonBinter.addEventListener("click", () => getLink("binter"))
    botonIberia.addEventListener("click", () => getLink("iberia"))
    botonRyanair.addEventListener("click", () => getLink("ryanair"))

    console.log("Web Menu")
}


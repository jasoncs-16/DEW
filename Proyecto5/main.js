
// EVITAR QUE SE REGARGUE LA PAGINA
const formUsuario = document.querySelector("#formUsuario").addEventListener("submit", function(e) {
    e.preventDefault();
});

class usuario {
    constructor(nombre, apellidos, dni, fecNac, codPostal, email, telFijo, telMovil, iban, tarjetaCredito, contrasenha, repetirCon) {
        this.nombre = /^[A-Z][a-z]+$/
        this.apellidos = /^[A-Z][a-z]+\s[A-Z][a-z]+$/
        this.dni = /^[0-9]{8}[A-Z]$/
        this.fecNac = /^((1|2)[0-9]|3[0-1])\/(0[0-9]|1[0-2])\/[0-9]{4}$/
        this.codPostal = /^[0-9]{5}$/
        this.email = /^[a-zA-Z]*[0-9]*@(gmail|hotmail)(.com|.es)$/
        this.telFijo = /^[0-9]{9}$/
        this.telMovil = /^[0-9]{9}$/
        this.iban = /^ES[0-9]{2}\s[0-9]{4}\s[0-9]{4}\s[0-9]{2}\s[0-9]{10}$/
        this.tarjetaCredito = /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/
        this.contrasenha = /^([a-zA-Z]|[0-9]|\W){12}$/
    }
};

// LISTA DE VALORES 
const listaValores = [
    "nombre",
    "apellidos",
    "dni",
    "fecNac",
    "codPostal",
    "email",
    "telFijo",
    "telMovil",
    "iban",
    "tarjetaCredito",
    "contrasenha",
    "repetirCon"
];

// VALORES FINALES
let valoresFinales = {};

// GUARDAR LOS VALORES INTRODUCIDOS EN VALORES FINALES
function guardar() {
    // LIMPIAR VALORES FINALES POR SI SE LLEGA A COLAR ALGUN DATO
    valoresFinales = {};

    // RECORRER LISTA DE VALORES Y AGREGARLE LOS DATOS QUE INTRODUCE EL USUARIO
    for (let i = 0; i < listaValores.length; i++) {
        let input = document.querySelector("input[name='" + listaValores[i] + "']");
        let contenido = input.value;

        if (contenido == "") {
            input.className = "invalido";
        } else {
            valoresFinales[listaValores[i]] = contenido;
        }
    }   
    console.log(valoresFinales)
}

const botonGuardar = document.querySelector("#guardar");
botonGuardar.addEventListener("click", guardar);

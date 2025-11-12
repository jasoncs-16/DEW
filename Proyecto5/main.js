
// EVITAR QUE SE REGARGUE LA PAGINA
const formUsuario = document.querySelector("#formUsuario").addEventListener("submit", function(e) {
    e.preventDefault();
});

// OBJETO VALIDADORES
const validadores = {
    nombre: /^[A-Z][a-z]+$/,
    apellidos: /^[A-Z][a-z]+\s[A-Z][a-z]+$/,
    dni: /^[0-9]{8}[A-Z]$/,
    fecNac: /^((1|2)[0-9]|3[0-1])\/(0[0-9]|1[0-2])\/[0-9]{4}$/,
    codPostal: /^[0-9]{5}$/,
    email: /^[a-zA-Z]*[0-9]*@(gmail|hotmail)(.com|.es)$/,
    telFijo: /^[0-9]{9}$/,
    telMovil: /^[0-9]{9}$/,
    iban: /^ES[0-9]{2}\s[0-9]{4}\s[0-9]{4}\s[0-9]{2}\s[0-9]{10}$/,
    tarjetaCredito: /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/,
    contrasenha: /^([a-zA-Z]|[0-9]|\W){12}$/
} 

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

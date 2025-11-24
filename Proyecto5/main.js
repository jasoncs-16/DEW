
let datosValidos = false;

// EVITAR QUE SE RECARGUE LA PAGINA
const formUsuario = document.querySelector("#formUsuario").addEventListener("submit", function(e) {
    e.preventDefault();
});

// OBJETO VALIDADORES
const validadores = {
    nombre: /^[A-Z][a-z]+$/,
    apellidos: /^[A-Z][a-z]+\s[A-Z][a-z]+$/,
    dni: /^[0-9]{8}[A-Z]$/,
    fecNac: /^([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/[0-9]{4}$/,
    codPostal: /^[0-9]{5}$/,
    email: /^[a-zA-Z]*[0-9]*@(gmail|hotmail)(.com|.es)$/,
    telFijo: /^[0-9]{9}$/,
    telMovil: /^[0-9]{9}$/,
    iban: /^ES[0-9]{2}\s[0-9]{4}\s[0-9]{4}\s[0-9]{2}\s[0-9]{10}$/,
    tarjetaCredito: /^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/,
    contrasenha: /^([a-zA-Z]|[0-9]|\W){12}$/,
    repetirCon: ""
}

// AVISO DE FORMATOS
let avisoFormato;

// VALIDAR DNI
function validarDni(nuevoDni) {
    nuevoDni = nuevoDni.toUpperCase();
    if (nuevoDni.length == 9) {
        let letras = "TRWAGMYFPDXBNJZSQVHLCKE";
        let numeroDni = nuevoDni.substring(0,8);
        let resultado = "";
        if (!isNaN(numeroDni)){
            let letraDni = letras[parseInt(numeroDni) % 23];
            let dniValido = String(numeroDni) + letraDni;
            if (nuevoDni == dniValido) {
                resultado = "valido";
            } else {
                resultado = "invalido";
            }
            return resultado;
        }
    }
}

// GUARDAR LOS VALORES INTRODUCIDOS EN VALORES FINALES
function guardar() {
    // VALIDAR SI LOS INPUTS TIENEN DATOS Y SI ESTOS CUMPLEN CON LAS EXPRESIONES REGULARES
    Object.entries(validadores).forEach(([clave, valor]) => {
        let input = document.querySelector("input[name='" + clave + "']");
        let contenido = input.value;
        if (contenido != "") {
            if (clave == "repetirCon") {
                let constrasenha = document.querySelector("input[name='contrasenha']");
                if (contenido == constrasenha.value) {
                    input.className = "valido";
                } else {
                    input.className = "invalido";
                }
    
            } else if (clave == "dni") {
                input.className = validarDni(contenido);
                
            } else {
                if (!valor.test(contenido)) {
                    input.className = "invalido";
                } else {
                    input.className = "valido";
                }
            }
            
        } else {
            input.className = "invalido";
        }

    });

    // VERIFICAR SI TODOS LOS CAMPOS SON VALIDOS
    for (const clave of Object.keys(validadores)) {
        let input = document.querySelector("input[name='" + clave + "']");
        if (input.className == "invalido") {
            datosValidos = false;
            break;

        } else {
            datosValidos = true;
        }
    }
    
    if (datosValidos) {
        const datosUsuario = {}
        for (const clave of Object.keys(validadores)) {
            let input = document.querySelector("input[name='" + clave + "']");
            datosUsuario[clave] = input.value;
        }
        sessionStorage.setItem("Usuario", JSON.stringify(datosUsuario));
    }
}

// RECUPERAR LOS DATOS GUARDADOS EN EL SESSIONSTORAGE
function recuperar() {
    const usuarioGuardado = JSON.parse(sessionStorage.getItem("Usuario"));
    Object.entries(usuarioGuardado).forEach(([clave, valor]) => {
        let input = document.querySelector("input[name='" + clave + "']");
        input.value = valor;
    });
}

// VALIDAR LOS INPUTS
Object.entries(validadores).forEach(([clave, valor]) => {
    let input = document.querySelector("input[name='" + clave + "']");
    avisoFormato = input.nextElementSibling;
    input.addEventListener("input", () => {
        if (input.value == '') {
            input.classList.remove('valido', 'invalido');
            avisoFormato.hidden = true;
            return;
        }

        if (clave == "dni") {
            if (validarDni(input.value) == "valido") {
                input.classList.remove("invalido");
                input.classList.add("valido");
                avisoFormato.hidden = true;
            } else {
                input.classList.remove("valido");
                input.classList.add("invalido");
                avisoFormato.hidden = false;
            }
            
        } else if (clave == "repetirCon") {
            if (input.value == contrasenha.value) {
                input.classList.remove("invalido");
                input.classList.add("valido");
                avisoFormato.hidden = true;

            } else {
                input.classList.remove("valido");
                input.classList.add("invalido");
                avisoFormato.hidden = false;

            }

        } else if (valor.test(input.value)) {
            input.classList.remove("invalido");
            input.classList.add("valido");
            avisoFormato.hidden = true;
            
        } else {
            input.classList.remove("valido");
            input.classList.add("invalido");
            avisoFormato.hidden = false;
        }
    });
})

const botonGuardar = document.querySelector("#guardar");
const botonRecuperar = document.querySelector("#recuperar");

botonGuardar.addEventListener("click", guardar);
botonRecuperar.addEventListener("click", recuperar);
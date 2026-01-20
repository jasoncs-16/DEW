
let datosValidos = false;

// EVITAR QUE SE RECARGUE LA PAGINA
const formUsuario = document.querySelector("#formUsuario").addEventListener("submit", function(e) {
    e.preventDefault();
});

const valores = document.querySelectorAll("input");
let parrafo = document.querySelector("#mensaje");

// OBJETO VALIDADORES
const validadores = {
    nombre: /^[A-Z][a-z]+$/,
    apellidos: /^[A-Z]([a-z]|[áéíóúüñÁÉÍÓÚÜÑ])+\s[A-Z]([a-z]|[áéíóúüñÁÉÍÓÚÜÑ])+$/,
    dni: /^[0-9]{8}[A-Z]$/,
    fecNac: /^([0-2][0-9]|3[0-1])\/(0[0-9]|1[0-2])\/[0-9]{4}$/,
    codPostal: /^[0-9]{5}$/,
    email: /^[a-zA-Z]*[0-9]*@(gmail|hotmail)(.com|.es)$/,
    telFijo: /^[0-9]{9}$/,
    telMovil: /^[0-9]{9}$/,
    iban: /^ES[0-9]{22}$/,
    tarjetaCredito: /^[0-9]{16}$/,
    contrasenha: /^([a-zA-Z]|[0-9]|\W){12,}$/,
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
};

// VERIFICAR SI TODOS LOS CAMPOS SON VALIDOS
function verificarFormulario() {
    for (const clave of Object.keys(validadores)) {
        let input = document.querySelector("input[name='" + clave + "']");
        if (input.className == "invalido" || input.className == "") {
            return false;
        }
    }
    return true;
}

// FUNCION VALIDAR DATOS
function validarDatos() {
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
}

// GUARDAR LOS VALORES INTRODUCIDOS EN VALORES FINALES
function guardar() {
    validarDatos();
    parrafo.className = "";
    parrafo.innerHTML = "";

    if (verificarFormulario()) {
        const datosUsuario = {}
        for (const clave of Object.keys(validadores)) {
            let input = document.querySelector("input[name='" + clave + "']");
            datosUsuario[clave] = input.value;
        }
        sessionStorage.setItem("Usuario", JSON.stringify(datosUsuario));
        parrafo.className = "mensajeValido";
        parrafo.innerHTML = "Los datos se han guardado correctamente";
    } else {
        parrafo.className = "mensajeInvalido";
        parrafo.innerHTML = "Los datos no se han introducido correctamente";
    }
}

// RECUPERAR LOS DATOS GUARDADOS EN EL SESSIONSTORAGE
function recuperar() {
    const usuarioGuardado = JSON.parse(sessionStorage.getItem("Usuario"));
    Object.entries(usuarioGuardado).forEach(([clave, valor]) => {
        if (clave != "repetirCon") {
            let input = document.querySelector("input[name='" + clave + "']");
            input.value = valor;
        }
    });
}

// CARGAR EL USUARIO DEL OBJETO JSON
async function usuarioJson() {
    try {
        const respuesta = await fetch('./usuario.json');
        const usuarioJson = await respuesta.json();

        // SIGUE LA MISMA LOGICA DE LA FUNCION RECUPERAR
        Object.entries(usuarioJson).forEach(([clave, valor]) => {
            let input = document.querySelector("input[name=" + clave + "]");
            input.value = valor;
        });
    } catch (error) {
        console.error("Error cargando JSON:", error);
    }
}


let valoresUsuario = document.querySelectorAll("input");
    
const botonGuardar = document.querySelector("#guardar");
const botonRecuperar = document.querySelector("#recuperar");
    
botonGuardar.addEventListener("click", guardar);
botonRecuperar.addEventListener("click", recuperar);

const botonObtenerJson = document.querySelector("#obtenerJson");
botonObtenerJson.addEventListener("click", usuarioJson);

const botonPublicarPhp = document.querySelector("#publicarPhp");
const botonObtenerPhp = document.querySelector("#obtenerPhp");

botonPublicarPhp.addEventListener("click", function() {
    validarDatos();
    if (!verificarFormulario()) {
        parrafo.className = "mensajeInvalido";
        parrafo.innerHTML = "Hay algunos campos incorrectos";          
        return;
    }
    
    const valoresFormulario = {}
    Object.keys(validadores).forEach(clave => {
        let input = document.querySelector("input[name='" + clave + "']");
        valoresFormulario[clave] = input.value;
    });

    valoresFormulario.accion = "guardar";

    fetch("usuario.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(valoresFormulario)
    })
    .then(respuesta => respuesta.json())
    .then(() => { 
        parrafo.className = "mensajeValido"; 
        parrafo.innerHTML = "Los datos se han publicado correctamente"; 
    })

    .catch(error => {
        parrafo.className = "mensajeInvalido";
        parrafo.innerHTML = "No se pudo completar la operación debido a un error";            
    });
});

botonObtenerPhp.addEventListener("click", function() {
    const solicitud = {accion: "obtener"};

    fetch("usuario.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(solicitud)
    })
    .then(respuesta => respuesta.json())
    .then(datos => {
        console.log(datos)
        Object.entries(datos).forEach(([clave, valor]) => {
            let input = document.querySelector("input[name='" + clave + "']");
            input.value = valor;
        });
        parrafo.className = "mensajeValido"; 
        parrafo.innerHTML = "Datos cargados con éxito";    
    })
    .catch(error => {
        parrafo.className = "mensajeInvalido";
        parrafo.innerHTML = "Error al obtener datos";
    });
});

const botonPublicarBBDD = document.querySelector("#publicarBBDD");
const botonObtenerBBDD = document.querySelector("#obtenerBBDD");

// BOTON PARA PUBLUCAR USUARIO A LA BASE DE DATOS
botonPublicarBBDD.addEventListener("click", function() {
    validarDatos();
    parrafo.className = "";
    parrafo.innerHTML = "";
    
    if (!verificarFormulario()) {
        parrafo.className = "mensajeInvalido";
        parrafo.innerHTML = "Hay algunos campos incorrectos. Por favor, revísalos.";          
        return;
    }
    
    // RECOGER TODOS LOS VALORES DEL FORMULARIO
    const valoresFormulario = {}
    Object.keys(validadores).forEach(clave => {
        let input = document.querySelector("input[name='" + clave + "']");
        valoresFormulario[clave] = input.value;
    });

    valoresFormulario.accion = "guardar";

    // ENVIAR A bbdd.php 
    fetch("bbdd.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(valoresFormulario)
    })
    .then(respuesta => respuesta.json())
    .then(datos => { 
        console.log("Respuesta del servidor:", datos);
        
        if (datos.success) {
            parrafo.className = "mensajeValido"; 
            parrafo.innerHTML = datos.mensaje || "Los datos se han guardado en la base de datos correctamente";
        } else {
            parrafo.className = "mensajeInvalido";
            parrafo.innerHTML = datos.error || "Error al guardar en la base de datos";
        }
    })
    .catch(error => {
        parrafo.className = "mensajeInvalido";
        parrafo.innerHTML = "No se pudo conectar con la base de datos";
        console.error("Error:", error);
    });
});

// OBTENER DESDE BASE DE DATOS 
botonObtenerBBDD.addEventListener("click", function() {
    parrafo.className = "";
    parrafo.innerHTML = "";
    
    const inputDni = document.querySelector("input[name='dni']");
    const dniValue = inputDni.value.trim();
    
    if (dniValue === "") {
        parrafo.className = "mensajeInvalido";
        parrafo.innerHTML = "Debe introducir un DNI para buscar en la base de datos";
        return;
    }
    
    const solicitud = {
        accion: "obtener",
        dni: dniValue
    };

    fetch("bbdd.php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(solicitud)
    })
    .then(respuesta => respuesta.json())
    .then(datos => {
        console.log("Datos recibidos:", datos);
        
        if (datos.error) {
            parrafo.className = "mensajeInvalido";
            parrafo.innerHTML = datos.error;
            return;
        }
        
        // RELLENAR TODOS LOS CAMPOS CON LOS DATOS OBTENIDOS
        Object.entries(datos).forEach(([clave, valor]) => {
            let input = document.querySelector("input[name='" + clave + "']");
            if (input) {
                input.value = valor;
                input.className = "valido";
            }
        });
        
        parrafo.className = "mensajeValido"; 
        parrafo.innerHTML = "Datos cargados desde la base de datos con éxito";    
    })
    .catch(error => {
        parrafo.className = "mensajeInvalido";
        parrafo.innerHTML = "Error de conexión con la base de datos";
        console.error("Error:", error);
    });
});

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

        // VALIDAR DNI
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

        // VALIDAR SI SE REPITE LA CONTRASEÑA CORRECTAMENTE
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
        // VALIDAR SI SE CUMPLEN LAS EXPRESIONES REGULARES
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
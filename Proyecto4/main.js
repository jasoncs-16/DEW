let revisarAccion = false;
const formulario = document.querySelector("#arbolCarpetas");
const listaPrincipal = document.querySelector("#listaPrincipal");

// FUNCION PARAK AÑADIR DIRECTORIOS
function anhadirDirectorio() {
    // PARA QUE NO SE REPITA LA ACCION MIENTRAS ESTA EN USO
    if (revisarAccion) return;
    revisarAccion = true;

    // CREACION DE LA SUBLISTA
    const nuevaLista = document.createElement("ul");
    nuevaLista.id = "nuevaLista";

    // ELEMENTOS DE LA SUBLISTA
    const nuevaElementoLista = document.createElement("li");
    nuevaElementoLista.id = "carpeta";

    // CREACION DE DIV PARA AJUSTAR LOS ELEMENTOS
    const nuevoContenedor = document.createElement("div");
    nuevoContenedor.id = "nuevoDiv";

    // CUADRO DE TEXTO PARA LA ENTRADA DE LOS NOMBRES DE LOS NUEVOS ARCHIVOS
    const entradaNombre = document.createElement("input");
    entradaNombre.type = "text";
    entradaNombre.id = "nombre";
    entradaNombre.name = "nombre";
    entradaNombre.placeholder = "Nombre del archivo"
    entradaNombre.required = true;
    
    // CUADRO DE ELECCION PARA CREAR UNA CAPERTA O UN .TXT
    const tipoArchivo = document.createElement("select");
    tipoArchivo.name = "tipo";
    tipoArchivo.id = "tipo";
    
    const optCarpeta = document.createElement("option");
    optCarpeta.value = "nuevaCarpeta";
    optCarpeta.textContent = "Nueva Carpeta"
    
    const optTexto = document.createElement("option");
    optTexto.value = "txt";
    optTexto.textContent = ".txt"
    
    tipoArchivo.appendChild(optCarpeta);
    tipoArchivo.appendChild(optTexto);
    
    // BOTON PARA ENVIAR LOS DATOS 
    const botonEnviar = document.createElement("button");
    botonEnviar.type = "button";
    botonEnviar.id = "botonEnviar";
    botonEnviar.textContent = "Enviar";
    botonEnviar.addEventListener("click", () => {
        // VERIFICAR NOMBRE ANTES DE ENVIAR
        let nombreCompleto = entradaNombre.value;
        if (tipoArchivo.value === "txt") {
            nombreCompleto = entradaNombre.value + ".txt";
        }
        
        const todosLosNombres = document.querySelectorAll('#listaPrincipal p');
        let nombreDuplicado = false;
        for (let i = 0; i < todosLosNombres.length; i++) {
            if (todosLosNombres[i].textContent === nombreCompleto) {
                nombreDuplicado = true;
                break;
            }
        }
        
        if (nombreDuplicado) {
            revisarAccion = false;
            return;
        }
        
        enviarFormulario(entradaNombre.value, tipoArchivo.value);
        nuevoContenedor.remove()
        revisarAccion = false;
    });
    
    nuevoContenedor.appendChild(entradaNombre);
    nuevoContenedor.appendChild(tipoArchivo);
    nuevoContenedor.appendChild(botonEnviar);
    nuevaElementoLista.appendChild(nuevoContenedor);

    nuevaLista.appendChild(nuevaElementoLista);

    document.body.appendChild(nuevaLista); 
}

function enviarFormulario(nombre, tipo) {
    // CREACION DE DIV PARA AJUSTAR LOS ELEMENTOS
    const nuevoDirectorio = document.createElement("div");
    nuevoDirectorio.id = "nuevoDirectorio";

    const subDirectorio = document.createElement("div");

    const divCarpeta = document.createElement("div");
    divCarpeta.id = "divCarpeta";

    // NOMBRE DEL ARCHIVO
    const nuevoTexto = document.createElement("p");
    nuevoTexto.textContent = nombre;
    
    // FLECHA QUE INDICA UN ARCHIVO CREADO
    const imgFlecha = document.createElement("img");
    imgFlecha.src = "imagenes/flecha.png"

    const nuevaImg = document.createElement("img");

    // BOTON PARA AÑÁDIR ARCHIVOS PARA CADA CARPETA QUE SE CREE
    const nuevoBotonAnhadir = document.createElement("p");
    nuevoBotonAnhadir.id = "botonAnhadir";
    nuevoBotonAnhadir.textContent = "+";
    nuevoBotonAnhadir.addEventListener("click", anhadirDirectorio)

    nuevoDirectorio.appendChild(imgFlecha);
    subDirectorio.appendChild(nuevoTexto);
    nuevoDirectorio.appendChild(subDirectorio);

    // BOTON PARA BORRAR
    const botonBorrar = document.createElement("p");
    botonBorrar.textContent = "x";
    botonBorrar.id = "botonBorrar";
    botonBorrar.addEventListener("click", () => {
        nuevoDirectorio.remove();
    });

    // AJUSTES DE ELEMENTOS
    nuevoDirectorio.appendChild(imgFlecha);
    subDirectorio.appendChild(nuevoTexto);
    nuevoDirectorio.appendChild(subDirectorio);
    subDirectorio.appendChild(botonBorrar);
    
    if (tipo == "nuevaCarpeta") { // Si se selecciona nuevaCarpeta crea una carpeta
        subDirectorio.id = "subDirectorioCarpeta";
        nuevaImg.src = "imagenes/carpeta.png";
        divCarpeta.appendChild(nuevoTexto);
        divCarpeta.appendChild(nuevaImg);
        subDirectorio.appendChild(divCarpeta);
        subDirectorio.appendChild(nuevoBotonAnhadir);
        
    } else if (tipo == "txt") { // Si se selecciona txt crea un archivo .txt
        subDirectorio.id = "subDirectorioTxt";
        nuevaImg.src = "imagenes/archivotxt.png";
        nuevoTexto.textContent += ".txt";
        divCarpeta.appendChild(nuevoTexto);
        divCarpeta.appendChild(nuevaImg);
        subDirectorio.appendChild(divCarpeta);
    }
    listaPrincipal.appendChild(nuevoDirectorio);
}

// BOTON PARA AÑADIR ARCHIVOS PARA LA CARPETA RAIZ
const botonAnhadir = document.querySelector("#botonAnhadir");
botonAnhadir.addEventListener("click", anhadirDirectorio);
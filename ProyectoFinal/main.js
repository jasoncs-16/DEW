const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.slide');

let index = 1; // empezamos en la primera real
const DELAY = 3000;

function updateCarousel(animate = true) {
    track.style.transition = animate ? 'transform 0.5s ease-in-out' : 'none';
    track.style.transform = `translateX(-${index * 100}%)`;
}

// Posición inicial
updateCarousel(false);

// Autoplay
setInterval(() => {
    index++;
    updateCarousel();

    // Si llegamos al clon final
    if (index === slides.length - 1) {
        setTimeout(() => {
        index = 1;
        updateCarousel(false);
        }, 1000);
    }

    // Si llegamos al clon inicial (por seguridad)
    if (index === 0) {
        setTimeout(() => {
        index = slides.length - 2;
        updateCarousel(false);
        }, 1000);
    }
}, DELAY);

// Tanto el boton inicio como el logo reinician la pagina
const logoButton = document.getElementById("logo");
const homeButton = document.getElementById("homeButton");

function reload() {
    window.location.href = "index.html";
}

logoButton.addEventListener("click", reload);
homeButton.addEventListener("click", reload);

// Pasar por cada etiqueta p
const informationSection = document.querySelectorAll("#informationSection p");

// Si hay algun texto que ya se esta mostrado, esconderlo y mostrar el deseado
function showText(idText) {
    informationSection.forEach(p => {
        if (p.hidden == false) {
            p.hidden = true
        }
    });
    document.getElementById(idText).hidden = false;
}

// Objeto de todos los botones con texto escondido
const buttons = {
    aboutButton: "companyInformation",
    airfryer: "airfryerInformation",
    airfryer2: "airfryerInformation",
    colador: "coladorInformation",
    cuchillo: "cuchilloInformation",
    sarten: "sartenInformation",
    tabla: "tablaInformation",
    tabla2: "tablaInformation"
}

// Recorrer cada boton y llamar a la funcion showText
Object.entries(buttons).forEach(([buttonId, textId]) => {
    document.getElementById(buttonId).addEventListener("click", () => {
        showText(textId);
    });
});

const productButton = document.getElementById("productButton");
const productMenu = document.getElementById("productMenu");

// Al pulsar el boton Productos de la barra de navegacion, desplegar el menu
productButton.addEventListener("click", function() {
    if (productMenu.style.display == "none") { // Apunta directamente al menu desplegable para mostrarlo o no
        productMenu.style.display = "block"
    } else {
        productMenu.style.display = "none"
    }
});

// Pasar por cada elemento del menu desplegable y mostrar la infomracion de cada uno
const productsLi = {
    lista0: "airfryerInformation",
    lista1: "coladorInformation",
    lista2: "cuchilloInformation",
    lista3: "sartenInformation",
    lista4: "tablaInformation",
}

// Recorrer cada boton y llamar a la funcion showText
Object.entries(productsLi).forEach(([buttonId, textId]) => {
    document.getElementById(buttonId).addEventListener("click", () => {
        showText(textId);
    });
});

// Evitar que se recargue la pagina
const formUsuario = document.querySelector("#formUsuario").addEventListener("submit", function(e) {
    e.preventDefault();
});

// Expresiones regulares para registrarse
const validators = {
    name: /^[A-Z][a-z]+$/,
    id: /^[0-9]+$/,
    email: /^[a-zA-Z]*[0-9]*@(gmail|hotmail)(.com|.es)$/,
    bankAcc: /^[0-9]{16}$/,
    phoneNumber: /^[0-9]{9}$/,
    password: /^([a-zA-Z]|[0-9]|\W){12,}$/
}

function register() {
    Object.entries(validators).forEach(([clave, valor]) => {
        let input = document.querySelector("input[name='" + clave + "']");
        let values = input.value;
        if (!valor.test(values)) {
            input.className = "invalido";
        } else {
            input.className = "valido";
        }
    });
}

function verifyForm() {
    for (const clave of Object.keys(validadores)) {
        let input = document.querySelector("input[name='" + clave + "']");
        if (input.className == "invalido" || input.className == "") {
            return false;
        }
    }
    return true;
}

function saveUser() {
    register();

    if (verifyForm()) {
        const datosUsuario = {}
        for (const clave of Object.keys(validadores)) {
            let input = document.querySelector("input[name='" + clave + "']");
            datosUsuario[clave] = input.value;
        }
        sessionStorage.setItem("Usuario", JSON.stringify(datosUsuario));
    }
}

const registerButton = document.getElementById("userRegister");
registerButton.addEventListener("click", saveUser)

// Mostrar el carrito
const shoppingCart = document.getElementById("shoppingCart");
const shoppingCartSection = document.getElementById("shoppingCartSection");
shoppingCart.addEventListener("click", function() {
    if (shoppingCartSection.hidden == false) { // Apunta directamente al carrito para mostrarlo o no
        shoppingCartSection.hidden = true
    } else {
        shoppingCartSection.hidden = false
    }
});

const langButton = document.getElementById("langButton");
const lang = document.getElementById("lang");

// Al pulsar el boton del idioma, saldran los idiomas disponibles
langButton.addEventListener("click", function() {
    if (lang.style.display == "none") { // Apunta directamente al menu desplegable para mostrarlo o no
        lang.style.display = "block"
    } else {
        lang.style.display = "none"
    }
});
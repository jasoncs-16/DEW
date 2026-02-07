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

const userLogged = false;

// Tanto el boton inicio como el logo reinician la pagina
const logoButton = document.getElementById("logo");
const homeButton = document.getElementById("homeButton");

function reload() {
    window.location.href = "index.html";
}

logoButton.addEventListener("click", reload);
homeButton.addEventListener("click", reload);

// Pasar por cada etiqueta p de la seccion informationSection
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

// Pasar por cada elemento del menu desplegable y mostrar la informacion de cada uno
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

// Botones para mostrar formulario de registro o login
const showRegisterButton = document.getElementById("showRegister");
const showLoginButton = document.getElementById("showLogin");
const formRegister = document.getElementById("formRegister");
const formLogin = document.getElementById("formLogin");
const userSection = document.getElementById("userSection");

showRegisterButton.addEventListener("click", function() {
    formLogin.hidden = true;
    formRegister.hidden = false;
    showRegisterButton.classList.add("active");
    showLoginButton.classList.remove("active");
    
    // Ocultar mensajes
    document.getElementById("loginMessage").hidden = true;
    document.getElementById("registerMessage").hidden = true;
});

showLoginButton.addEventListener("click", function() {
    formRegister.hidden = true;
    formLogin.hidden = false;
    showLoginButton.classList.add("active");
    showRegisterButton.classList.remove("active");
    
    // Ocultar mensajes
    document.getElementById("loginMessage").hidden = true;
    document.getElementById("registerMessage").hidden = true;
});

// Expresiones regulares para registrarse
const validators = {
    name: /^[A-Z][a-z]+$/,
    id: /^[0-9]+$/,
    email: /^[a-zA-Z]*[0-9]*@(gmail|hotmail)(.com|.es)$/,
    bankAcc: /^ES[0-9]{22}$/,
    phoneNumber: /^[0-9]{9}$/,
    password: /^([a-zA-Z]|[0-9]|\W){12,}$/
}

// Funcion para validar los campos del registro
function validateRegister() {
    let isValid = true;
    Object.entries(validators).forEach(([clave, valor]) => {
        let input = document.querySelector("#formRegister input[name='" + clave + "']");
        let values = input.value;
        if (!valor.test(values)) {
            input.className = "invalido";
            isValid = false;
        } else {
            input.className = "valido";
        }
    });
    return isValid;
}

// Funcion para guardar el usuario
function saveUser() {
    const registerMessage = document.getElementById("registerMessage");
    
    if (validateRegister()) {
        const datosUsuario = {}
        for (const clave of Object.keys(validators)) {
            let input = document.querySelector("#formRegister input[name='" + clave + "']");
            datosUsuario[clave] = input.value;
        }
        sessionStorage.setItem("Usuario", JSON.stringify(datosUsuario));
        
        // Mostrar mensaje de éxito
        registerMessage.textContent = "Usuario registrado exitosamente";
        registerMessage.className = "valido";
        registerMessage.hidden = false;
        
        formRegister.reset();
        Object.values(formRegister.querySelectorAll("input")).forEach(input => {
            input.className = "";
        });
        
        // Ocultar el mensaje despues de 3 segundos
        setTimeout(() => {
            registerMessage.hidden = true;
        }, 3000);
    } else {
        // Mostrar mensaje de error
        registerMessage.textContent = "Por favor, completa todos los campos correctamente";
        registerMessage.className = "invalido";
        registerMessage.hidden = false;
        
        // Ocultar el mensaje despues de 3 segundos
        setTimeout(() => {
            registerMessage.hidden = true;
        }, 3000);
    }
}

// Funcion para iniciar sesion
function loginUser() {
    const nameInput = document.querySelector("#formLogin input[name='name']");
    const passwordInput = document.querySelector("#formLogin input[name='password']");
    const loginMessage = document.getElementById("loginMessage");
    
    const storedUser = sessionStorage.getItem("Usuario");
    
    if (storedUser) {
        const user = JSON.parse(storedUser);
        if (user.name === nameInput.value && user.password === passwordInput.value) {
            // Mostrar mensaje de exito
            loginMessage.textContent = "Inicio de sesión exitoso";
            loginMessage.className = "valido";
            loginMessage.hidden = false;
            
            formLogin.reset();
            
            // Ocultar el mensaje despues de 3 segundos
            setTimeout(() => {
                loginMessage.hidden = true;
            }, 3000);

            userLogged = true; // El usuario ha iniciado sesion
        } else {
            // Mostrar mensaje de error
            loginMessage.textContent = "Nombre o contraseña incorrectos";
            loginMessage.className = "invalido";
            loginMessage.hidden = false;
            
            // Ocultar el mensaje despues de 3 segundos
            setTimeout(() => {
                loginMessage.hidden = true;
            }, 3000);
        }
    } else {
        // Mostrar mensaje de error
        loginMessage.textContent = "No hay usuarios registrados";
        loginMessage.className = "invalido";
        loginMessage.hidden = false;
        
        // Ocultar el mensaje despues de 3 segundos
        setTimeout(() => {
            loginMessage.hidden = true;
        }, 3000);
    }
}

formRegister.addEventListener("submit", function(e) {
    e.preventDefault();
    saveUser();
});

formLogin.addEventListener("submit", function(e) {
    e.preventDefault();
    loginUser();
});

const userButton = document.getElementById("userButton");
userButton.addEventListener("click", function() {
    if (userSection.hidden == false) { // Apunta directamente al carrito para mostrarlo o no
        userSection.hidden = true
    } else {
        userSection.hidden = false
    }
})

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

// Añadir productos al carrito
const shoppingCartContent = document.getElementById("shoppingCartContent");

function addProduct(productValue) {
    // Pending
}

const newProduct = document.querySelectorAll(".addProduct");
newProduct.forEach(product => {
    product.addEventListener("click", (productValue) => {
        const values = productValue.target.value;
        addProduct(values);
    })  
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
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
    airfryer1: "airfryerInformation",
    airfryer2: "airfryerInformation",
    colador: "coladorInformation",
    cuchillo: "cuchilloInformation",
    sarten: "sartenInformation",
    tabla1: "tablaInformation",
    tabla2: "tablaInformation"
}

// Recorrer cada boton y llamar a la funcion showText
Object.entries(buttons).forEach(([buttonId, textId]) => {
    document.getElementById(buttonId).addEventListener("click", () => {
        showText(textId);
    });
});

// Mostrar el carrito
const shoppingCart = document.getElementById("shoppingCart");
const shoppingCartSection = document.getElementById("shoppingCartSection");
shoppingCart.addEventListener("click", function() {
    if (shoppingCartSection.hidden == false) {
        shoppingCartSection.hidden = true
    } else {
        shoppingCartSection.hidden = false
    }
});
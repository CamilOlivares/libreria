// Variables
const carrito = document.getElementById('carrito');
const libros = document.getElementById('lista-libros');
const listaLibros = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.getElementById('vaciar-carrito');

// Listeners
cargarEventListeners();

function cargarEventListeners() {
    // Dispara cuando se presiona "Agregar Carrito"
    libros.addEventListener('click', comprarLibro);

    // Cuando se elimina un libro del carrito
    carrito.addEventListener('click', eliminarLibro);

    // Al Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // Al cargar el documento, mostrar LocalStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

// Función que añade el libro al carrito
function comprarLibro(e) {
    e.preventDefault();

    if (e.target.classList.contains('agregar-carrito')) {
        const libro = e.target.parentElement.parentElement;
        leerDatosLibro(libro);
    }
}

// Lee los datos del libro
function leerDatosLibro(libro) {
    const infoLibro = {
        imagen: libro.querySelector('img').src,
        titulo: libro.querySelector('h4').textContent,
        precio: libro.querySelector('.precio span').textContent,
        id: libro.querySelector('a').getAttribute('data-id')
    };

    insertarLibro(infoLibro);
}

// Muestra el libro seleccionado en el carrito
function insertarLibro(libro) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${libro.imagen}" width=100>
        </td>
        <td>${libro.titulo}</td>
        <td>${libro.precio}</td>
        <td>
            <a href="#" class="borrar-libro" data-id="${libro.id}">X</a>
        </td>
    `;
    listaLibros.appendChild(row);
    guardarLibroLocalStorage(libro);
}

// Elimina el libro del carrito en el DOM
function eliminarLibro(e) {
    e.preventDefault();

    let libro,
        libroId;
    if (e.target.classList.contains('borrar-libro')) {
        e.target.parentElement.parentElement.remove();
        libro = e.target.parentElement.parentElement;
        libroId = libro.querySelector('a').getAttribute('data-id');
    }

    eliminarLibroLocalStorage(libroId);
}

// Elimina todos los libros del carrito en el DOM
function vaciarCarrito() {
    while (listaLibros.firstChild) {
        listaLibros.removeChild(listaLibros.firstChild);
    }

    // Vaciar Local Storage
    vaciarLocalStorage();

    return false;
}

// Almacena libros en el carrito a Local Storage
function guardarLibroLocalStorage(libro) {
    let libros = obtenerLibrosLocalStorage();

    // El libro seleccionado se agrega al array
    libros.push(libro);

    localStorage.setItem('libros', JSON.stringify(libros));
}

// Comprueba que haya elementos en Local Storage
function obtenerLibrosLocalStorage() {
    let librosLS;

    // Comprobamos si hay algo en Local Storage
    if (localStorage.getItem('libros') === null) {
        librosLS = [];
    } else {
        librosLS = JSON.parse(localStorage.getItem('libros'));
    }
    return librosLS;
}

// Imprime los libros de Local Storage en el carrito
function leerLocalStorage() {
    let librosLS = obtenerLibrosLocalStorage();

    librosLS.forEach(function (libro) {
        // Construir el template
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${libro.imagen}" width=100>
            </td>
            <td>${libro.titulo}</td>
            <td>${libro.precio}</td>
            <td>
                <a href="#" class="borrar-libro" data-id="${libro.id}">X</a>
            </td>
        `;
        listaLibros.appendChild(row);
    });
}

// Elimina el libro por el ID en Local Storage
function eliminarLibroLocalStorage(libroId) {
    let librosLS = obtenerLibrosLocalStorage();

    // Itera sobre el array y elimina el libro con el ID dado
    librosLS = librosLS.filter(libro => libro.id !== libroId);

    // Añade el array actualizado a Local Storage
    localStorage.setItem('libros', JSON.stringify(librosLS));
}

// Elimina todos los libros de Local Storage
function vaciarLocalStorage() {
    localStorage.clear();
}
// Variables
const carrito = document.getElementById('carrito'); // Obtiene el elemento del carrito por su ID
const libros = document.getElementById('lista-libros'); // Obtiene el elemento de la lista de libros por su ID
const listaLibros = document.querySelector('#lista-carrito tbody'); // Obtiene el tbody de la tabla del carrito
const vaciarCarritoBtn = document.getElementById('vaciar-carrito'); // Obtiene el botón para vaciar el carrito por su ID

// Listeners
cargarEventListeners(); // Llama a la función que carga los event listeners

function cargarEventListeners() {
    // Dispara cuando se presiona "Agregar Carrito"
    libros.addEventListener('click', comprarLibro); // Agrega un listener para el clic en el elemento de libros

    // Cuando se elimina un libro del carrito
    carrito.addEventListener('click', eliminarLibro); // Agrega un listener para el clic en el carrito

    // Al Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito); // Agrega un listener para el clic en el botón de vaciar carrito

    // Al cargar el documento, mostrar LocalStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage); // Llama a la función que lee el LocalStorage al cargar 
    //el documento
}

// Función que añade el libro al carrito
function comprarLibro(e) {
    e.preventDefault(); // Previene el comportamiento por defecto del evento

    if (e.target.classList.contains('agregar-carrito')) { // Verifica si el clic fue en un elemento con la clase 'agregar-carrito'
        const libro = e.target.parentElement.parentElement; // Obtiene el elemento libro correspondiente
        const stockElement = libro.querySelector('.stock'); // Obtiene el elemento que muestra el stock
        const stock = parseInt(stockElement.textContent.split(': ')[1]); // Obtiene el número de stock

        // Verifica si hay stock disponible
        if (stock > 0) {
            // Disminuye el stock
            stockElement.textContent = `Stock: ${stock - 1}`; // Actualiza el texto del stock

            // Leer los datos del libro y agregar al carrito
            leerDatosLibro(libro); // Llama a la función para leer los datos del libro y agregarlo al carrito

            // Actualiza el stock en el atributo data-stock
            libro.setAttribute('data-stock', stock - 1); // Actualiza el atributo 'data-stock' del libro
        } else {
            alert('No hay suficiente stock'); // Muestra un mensaje si no hay suficiente stock
        }
    }
}

// Lee los datos del libro
function leerDatosLibro(libro) {
    const infoLibro = {
        imagen: libro.querySelector('img').src, // Obtiene la URL de la imagen del libro
        titulo: libro.querySelector('h4').textContent, // Obtiene el título del libro
        precio: libro.querySelector('.precio span').textContent, // Obtiene el precio del libro
        id: libro.querySelector('a').getAttribute('data-id') // Obtiene el ID del libro desde un atributo de datos
    };

    insertarLibro(infoLibro); // Llama a la función para insertar el libro en el carrito
}

// Muestra el libro seleccionado en el carrito
function insertarLibro(libro) {
    const row = document.createElement('tr'); // Crea una nueva fila para la tabla
    row.innerHTML = `
        <td>
            <img src="${libro.imagen}" width=100> <!-- Muestra la imagen del libro en una celda -->
        </td>
        <td>${libro.titulo}</td> <!-- Muestra el título del libro en una celda -->
        <td>${libro.precio}</td> <!-- Muestra el precio del libro en una celda -->
        <td>
            <a href="#" class="borrar-libro" data-id="${libro.id}">X</a> <!-- Muestra un enlace para eliminar el libro con su ID -->
        </td>
    `;
    listaLibros.appendChild(row); // Añade la nueva fila a la tabla del carrito
    guardarLibroLocalStorage(libro); // Llama a la función para guardar el libro en LocalStorage
}

// Elimina el libro del carrito en el DOM
function eliminarLibro(e) {
    e.preventDefault(); // Previene el comportamiento por defecto del evento

    let libro, libroId;
    if (e.target.classList.contains('borrar-libro')) { // Verifica si el clic fue en un enlace con la clase 'borrar-libro'
        libro = e.target.parentElement.parentElement; // Obtiene la fila del libro que se quiere eliminar
        libroId = libro.querySelector('a').getAttribute('data-id'); // Obtiene el ID del libro desde un atributo de datos
        e.target.parentElement.parentElement.remove(); // Elimina la fila del libro del DOM

        // Aumenta el stock cuando se elimina del carrito
        const card = document.querySelector(`.card[data-id="${libroId}"]`); // Busca la tarjeta del libro en la lista de libros
        if (card) {
            const stockElement = card.querySelector('.stock'); // Obtiene el elemento de stock de la tarjeta
            const stock = parseInt(card.getAttribute('data-stock')); // Obtiene el stock actual desde el atributo 'data-stock'
            stockElement.textContent = `Stock: ${stock + 1}`; // Actualiza el texto del stock
            card.setAttribute('data-stock', stock + 1); // Actualiza el atributo 'data-stock' de la tarjeta
        }
    }

    eliminarLibroLocalStorage(libroId); // Llama a la función para eliminar el libro del LocalStorage
}

// Elimina todos los libros del carrito en el DOM
function vaciarCarrito() {
    while (listaLibros.firstChild) { // Mientras haya elementos en la tabla del carrito
        const libroId = listaLibros.firstChild.querySelector('a').getAttribute('data-id'); // Obtiene el ID del libro desde 
        //el primer hijo
        
        // Aumenta el stock para cada libro en el carrito
        const card = document.querySelector(`.card[data-id="${libroId}"]`); // Busca la tarjeta del libro en la lista de libros
        if (card) {
            const stockElement = card.querySelector('.stock'); // Obtiene el elemento de stock de la tarjeta
            const stock = parseInt(card.getAttribute('data-stock')); // Obtiene el stock actual desde el atributo 'data-stock'
            stockElement.textContent = `Stock: ${stock + 1}`; // Actualiza el texto del stock
            card.setAttribute('data-stock', stock + 1); // Actualiza el atributo 'data-stock' de la tarjeta
        }

        listaLibros.removeChild(listaLibros.firstChild); // Elimina el primer hijo de la tabla del carrito
    }

    // Vaciar Local Storage
    vaciarLocalStorage(); // Llama a la función para vaciar el LocalStorage

    return false; // Previene el comportamiento por defecto del enlace
}

// Almacena libros en el carrito a Local Storage
function guardarLibroLocalStorage(libro) {
    let libros = obtenerLibrosLocalStorage(); // Obtiene la lista de libros desde el LocalStorage

    // El libro seleccionado se agrega al array
    libros.push(libro); // Agrega el libro al array de libros

    localStorage.setItem('libros', JSON.stringify(libros)); // Guarda el array actualizado en LocalStorage
}

// Comprueba que haya elementos en Local Storage
function obtenerLibrosLocalStorage() {
    let librosLS;

    // Comprobamos si hay algo en Local Storage
    if (localStorage.getItem('libros') === null) { // Si no hay libros en LocalStorage
        librosLS = []; // Inicializa un array vacío
    } else {
        librosLS = JSON.parse(localStorage.getItem('libros')); // Parsear el contenido del LocalStorage en un array
    }
    return librosLS; // Devuelve el array de libros
}

// Imprime los libros de Local Storage en el carrito
function leerLocalStorage() {
    let librosLS = obtenerLibrosLocalStorage(); // Obtiene la lista de libros desde LocalStorage

    librosLS.forEach(function (libro) { // Recorre cada libro en la lista
        // Construir el template
        const row = document.createElement('tr'); // Crea una nueva fila para la tabla
        row.innerHTML = `
            <td>
                <img src="${libro.imagen}" width=100> <!-- Muestra la imagen del libro en una celda -->
            </td>
            <td>${libro.titulo}</td> <!-- Muestra el título del libro en una celda -->
            <td>${libro.precio}</td> <!-- Muestra el precio del libro en una celda -->
            <td>
                <a href="#" class="borrar-libro" data-id="${libro.id}">X</a> <!-- Muestra un enlace para eliminar el libro con su ID -->
            </td>
        `;
        listaLibros.appendChild(row); // Añade la nueva fila a la tabla del carrito
    });
}

// Elimina el libro por ID de Local Storage
function eliminarLibroLocalStorage(libroId) {
    let librosLS = obtenerLibrosLocalStorage(); // Obtiene la lista de libros desde LocalStorage

    librosLS.forEach(function (libro, index) { // Recorre cada libro en la lista
        if (libro.id === libroId) { // Si el ID del libro coincide con el ID proporcionado
            librosLS.splice(index, 1); // Elimina el libro del array
        }
    });

    localStorage.setItem('libros', JSON.stringify(librosLS)); // Guarda el array actualizado en LocalStorage
}

// Elimina todos los libros de Local Storage
function vaciarLocalStorage() {
    localStorage.clear(); // Limpia todo el LocalStorage
}

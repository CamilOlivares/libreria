// slider.js

// Espera a que todo el contenido del documento esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Selecciona todos los elementos con la clase 'oferta'
    const ofertas = document.querySelectorAll('.oferta');
    
    // Recorre cada uno de los elementos seleccionados
    ofertas.forEach(oferta => {
        // Selecciona el primer elemento <h3> o <p> dentro del elemento con clase 'oferta'
        const text = oferta.querySelector('h3, p');
        
        // Aplica una animación CSS al texto seleccionado
        text.style.animation = 'slide 10s linear infinite';
    });
});

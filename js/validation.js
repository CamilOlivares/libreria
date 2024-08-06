// Validación simple para campos requeridos
document.addEventListener('DOMContentLoaded', () => { // Espera a que el contenido del documento esté completamente cargado
    document.querySelectorAll('form').forEach(form => { // Selecciona todos los formularios en el documento y recorre cada uno
        form.addEventListener('submit', (event) => { // Añade un manejador de eventos para el evento de envío del formulario
            let valido = true; // Inicializa una variable para determinar si el formulario es válido
            form.querySelectorAll('[required]').forEach(input => { // Selecciona todos los campos requeridos dentro del formulario 
                //y los recorre
                if (!input.value.trim()) { // Verifica si el valor del campo está vacío después de eliminar espacios en blanco
                    valido = false; // Marca el formulario como no válido
                    input.classList.add('is-invalid'); // Añade una clase para indicar un campo inválido
                } else {
                    input.classList.remove('is-invalid'); // Elimina la clase si el campo es válido
                }
            });
            if (!valido) event.preventDefault(); // Si el formulario no es válido, previene el envío del formulario
        });
    });
});

<?php
session_start(); // Inicia la sesión

// Verifica si el usuario está autenticado
if (!isset($_SESSION['user_id'])) {
    header('Location: login.html'); // Redirige al login si no está autenticado
    exit(); // Detiene la ejecución del script
}

// Obtén el nombre del usuario desde la sesión
$user_name = $_SESSION['user_name']; // Almacena el nombre del usuario en una variable
?>

<!DOCTYPE html>
<html lang="es"> <!-- Define el tipo de documento como HTML5 y el idioma del contenido como español -->
<head>
  <meta charset="UTF-8"> <!-- Especifica la codificación de caracteres para el documento -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Configura la ventana gráfica para 
  asegurar que el sitio se vea bien en todos los dispositivos -->
  <title>Bienvenido</title> <!-- Define el título de la página -->
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet"> <!-- Enlace a los 
  estilos de Bootstrap desde un CDN -->
  <link rel="stylesheet" href="css/styles.css"> <!-- Enlace al archivo de estilos personalizado styles.css -->
</head>
<body>
  <div class="container"> <!-- Contenedor principal de Bootstrap -->
    <h2 class="text-center my-4">Hola, <?php echo htmlspecialchars($user_name); ?>!</h2> <!-- Encabezado de bienvenida 
    centrado con nombre del usuario, protegido contra XSS -->
    <p class="text-center">Bienvenido. ¿Qué deseas hacer?</p> <!-- Texto centrado de bienvenida -->
    <div class="text-center"> <!-- Contenedor centrado para los botones -->
      <a href="/index.html" class="btn btn-primary">Ir a Inicio</a> <!-- Botón para ir a la página de inicio -->
      <a href="logout.php" class="btn btn-secondary">Cerrar Sesión</a> <!-- Botón para cerrar sesión -->
      <a href="/carrito.html" class="btn btn-success">Ir al Carrito</a> <!-- Botón para ir al carrito -->
    </div>
  </div>
  <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script> <!-- Enlace al archivo de jQuery desde un CDN -->
  <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script> <!-- Enlace al archivo de Popper.js
   desde un CDN -->
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script> <!-- Enlace al archivo de JavaScript 
  de Bootstrap desde un CDN -->
</body>
</html>

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
<html lang="es">
<head>
    <meta charset="UTF-8"> <!-- Especifica la codificación de caracteres para el documento -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> <!-- Configura la ventana gráfica para asegurar que el sitio se vea bien en todos los dispositivos -->
    <meta http-equiv="X-UA-Compatible" content="ie=edge"> <!-- Asegura que el documento se renderice con la última versión de IE disponible -->
    <title>Bienvenido</title> <!-- Define el título de la página -->
  <link href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css" rel="stylesheet"> <!-- Enlace a los 
  estilos de Bootstrap desde un CDN -->
    <title>Carrito</title> <!-- Define el título de la página -->
    <!-- Asegúrate de que las rutas a los archivos CSS sean correctas -->
    <link rel="stylesheet" href="../css/normalize.css"> <!-- Enlace al archivo de estilos normalize.css para estandarizar estilos entre navegadores -->
    <link rel="stylesheet" href="../css/skeleton.css"> <!-- Enlace al archivo de estilos skeleton.css, un framework CSS ligero -->
    <link rel="stylesheet" href="../css/custom.css"> <!-- Enlace al archivo de estilos custom.css para estilos personalizados -->
    <link rel="stylesheet" href="../css/styles.css"> <!-- Enlace al archivo de estilos styles.css para estilos adicionales -->
</head>
<body>
    <section class="section-menu-p d-flex"> <!-- Sección para el menú principal con clases para estilos -->
        <div class="col-2 menu-principal"> <!-- Div para el menú principal ocupando 2 columnas -->
            <nav class="navegacion"> <!-- Navegación principal -->
                <a href="register.html" class="btn-modern">Registro</a> <!-- Enlace a la página de registro con una clase de botón moderno -->
                <a href="login.html" class="btn-modern">Iniciar Sesión</a> <!-- Enlace a la página de inicio de sesión con una clase de botón moderno -->
            </nav>
        </div>
    </section>

    <header id="header" class="header"> <!-- Cabecera de la página con ID y clase -->
        <div class="container"> <!-- Contenedor principal -->
            <div class="row"> <!-- Fila para la disposición de elementos -->
                <div class="four columns"> <!-- Div que ocupa 4 columnas para el logo -->
                    <img src="../img/logo.png" id="logo" alt="Logo" /> <!-- Imagen del logo con ID y texto alternativo -->
                </div>
                <div class="two columns u-pull-right"> <!-- Div que ocupa 2 columnas y se alinea a la derecha -->
                    <ul>
                        <li class="submenu"> <!-- Elemento de lista con clase de submenú -->
                            <img src="../img/cart.png" id="img-carrito" alt="Carrito de compras" /> <!-- Imagen del carrito de compras con ID y texto alternativo -->
                            <div id="carrito"> <!-- Div del carrito de compras con ID -->
                                <table id="lista-carrito" class="u-full-width"> <!-- Tabla para mostrar la lista del carrito, ocupa todo el ancho disponible -->
                                    <thead>
                                        <tr>
                                            <th>Imagen</th> <!-- Encabezado de columna para la imagen -->
                                            <th>Nombre</th> <!-- Encabezado de columna para el nombre -->
                                            <th>Precio</th> <!-- Encabezado de columna para el precio -->
                                            <th></th> <!-- Encabezado de columna vacío para acciones -->
                                        </tr>
                                    </thead>
                                    <tbody></tbody> <!-- Cuerpo de la tabla vacío inicialmente -->
                                </table>
                                <a href="#" id="vaciar-carrito" class="button u-full-width">Vaciar Carrito</a> <!-- Enlace para vaciar el carrito, ocupa todo el ancho disponible -->
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </header>

    <div class="container"> <!-- Contenedor principal de Bootstrap -->
    <h2 class="text-center my-4">Hola, <?php echo htmlspecialchars($user_name); ?>!</h2> <!-- Encabezado de bienvenida 
    centrado con nombre del usuario, protegido contra XSS -->
    <p class="text-center">Bienvenido. ¿Qué deseas hacer?</p> <!-- Texto centrado de bienvenida -->
    <div class="text-center"> <!-- Contenedor centrado para los botones -->
      <a href="/index.html" class="btn btn-primary">Ir a Inicio</a> <!-- Botón para ir a la página de inicio -->
      <a href="logout.php" class="btn btn-secondary">Cerrar Sesión</a> <!-- Botón para cerrar sesión -->
    </div>
  </div>
 
<!-- Contenido Dinmaico de Ofertas tipo Slider</p> -->
  <section class="ofertas">
        <div class="oferta">
            <h3>Oferta de la Semana</h3>
            <p>50% de Descuento los Lunes</p>
         </div>
        <div class="oferta">
             <h3>Oferta del Mes</h3>
            <p>20% En tu 2° Libro</p>
        </div>
        <div class="oferta">
            <h3>Oferta Especial</h3>
            <p>2° Libro gratis en tu Cumpleaños</p>
        </div>
  </section>
  
<!-- Contenido de Footer</p> -->
        <footer class="footer"> <!-- Pie de página con ID y clase -->
        <div class="footer-content"> <!-- Contenedor principal -->
            <h1 class="footer-title">Libreria Camilo</h1> <!-- Titulo -->
            <p class="footer-text">© 2024 Todos los derechos reservados</p> <!-- Texto de derechos reservados -->
        </div>
    </footer>


    <!-- Scripts JavaScript -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script> <!-- Enlace al archivo de jQuery desde un CDN -->
    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script> <!-- Enlace al archivo de Popper.js desde un CDN -->
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script> <!-- Enlace al archivo de JavaScript de Bootstrap desde un CDN -->
    <script src="js/app.js"></script> <!-- Enlace al archivo de script de Variables y Funciones de JavaScript -->
    <script src="js/slider.js"></script> <!-- Enlace al de script JavaScript de slider -->

  </body>
</html>

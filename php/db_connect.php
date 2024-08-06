<?php
$servername = "localhost";
$username = "root";
$password = "Firefighter3V@";
$dbname = "libreria";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
  die("Conexion fallida: " . $conn->connect_error);
}
?>
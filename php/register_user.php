<?php
include 'db_connect.php';

// Verifica si los datos POST están establecidos
if (isset($_POST['nombre'], $_POST['email'], $_POST['contraseña'], $_POST['dirección'], $_POST['teléfono'])) {
    $nombre = $_POST['nombre'];
    $email = $_POST['email'];
    $contraseña = $_POST['contraseña'];
    $dirección = $_POST['dirección'];
    $teléfono = $_POST['teléfono'];

    // Hash de la contraseña
    $contraseña_hash = password_hash($contraseña, PASSWORD_BCRYPT);

    // Preparar la consulta para evitar inyecciones SQL
    $sql = $conn->prepare("INSERT INTO USUARIOS (nombre, email, contraseña, dirección, teléfono) VALUES (?, ?, ?, ?, ?)");
    $sql->bind_param("sssss", $nombre, $email, $contraseña_hash, $dirección, $teléfono);

    if ($sql->execute()) {
        // Registro exitoso, redirigir al inicio de sesión
        header("Location: ../login.html"); // Ajusta la ruta si es necesario
        exit();
    } else {
        echo "Error: " . $sql->error;
    }

    $sql->close();
} else {
    echo "Faltan datos en el formulario.";
}

$conn->close();
?>
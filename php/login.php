<?php
include 'db_connect.php';

// Obtén los datos del formulario
$email = $_POST['email'];
$password = $_POST['password'];

// Consulta para obtener el usuario
$sql = "SELECT * FROM USUARIOS WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();
    
    // Verifica la contraseña
    if (password_verify($password, $user['contraseña'])) {
        // Inicia sesión (almacena datos en una sesión PHP)
        session_start();
        $_SESSION['user_id'] = $user['ID'];
        $_SESSION['user_name'] = $user['nombre'];
        
        // Redirige a la página de bienvenida
        header('Location: welcome.php');
        exit();
    } else {
        echo "Contraseña incorrecta";
    }
} else {
    echo "No se encontró un usuario con ese email";
}

$stmt->close();
$conn->close();
?>
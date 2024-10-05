<?php
// Incluir la configuración de la base de datos
include('db_config.php');

$conn = new mysqli($host, $username, $password, $dbname);

    // Obtener los datos del formulario
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $direccion = $_POST['direccion'];
    $telefono = $_POST['telefono'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirmPassword = $_POST['confirmPassword'];

    // Verificar que las contraseñas coincidan
    if ($password !== $confirmPassword) {
        echo "Las contraseñas no coinciden.";
        exit();
    }

    // Verificar si el email ya está registrado
    $sql = "SELECT * FROM clientes WHERE email = '$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // El correo ya existe
        echo "El correo electrónico ya está registrado.";
        exit();
    }

    // Encriptar la contraseña
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    // Intentar insertar los datos en la base de datos
    $sql = "INSERT INTO clientes (nombre, apellido, direccion, telefono, email, password, fecha_registro) 
            VALUES ('$nombre', '$apellido', '$direccion', '$telefono', '$email', '$password_hash', CURDATE())";

    if ($conn->query($sql) === TRUE) {
        // Registro exitoso
        echo "Registro exitoso. Ahora puedes <a href='iniciosesion.html'>iniciar sesión</a>.";
    } else {
        // Mostrar mensaje de error con detalles
        echo "Error en el registro: " . $conn->error;
    }

    // Cerrar la conexión
    $conn->close();

?>
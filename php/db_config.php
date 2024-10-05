<?php
// Configuración de la conexión a la base de datos
$host = 'localhost';
$dbname = 'pukllay'; // Nombre de la base de datos
$username = 'root'; // Usuario por defecto de XAMPP
$password = ''; // Contraseña vacía por defecto

// Crear la conexión a la base de datos
$conn = new mysqli($host, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "dailygo";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$json = file_get_contents('php://input');
$datosJson = json_decode($json, true);

$id = $datosJson['id'];

// sql to delete a record
$sql = "DELETE FROM clientes WHERE cod_cli=$id";

if ($conn->query($sql) === TRUE) {
    echo "Borrado";
} else {
    echo "Error deleting record: " . $conn->error;
}

$conn->close();
?>
<?php

$json = file_get_contents('php://input');
$datosJson = json_decode($json, true);

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

$dni = $datosJson['dni'];
$estado = $datosJson['estado'];

$sql = "UPDATE riders SET estado='$estado' WHERE dni_rid='$dni'";

if ($conn->query($sql) === TRUE) {
    echo "Actualizado";
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();

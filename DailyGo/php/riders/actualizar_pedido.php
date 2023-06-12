<?php

$json = file_get_contents('php://input');
$datosJson = json_decode($json, true);

$conn = mysqli_connect("localhost", "root", "", "dailygo");
mysqli_select_db($conn, "dailygo") or die("No se puede seleccionar la BD");

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$id = $datosJson['id'];
$estado = $datosJson['estado'];
$dni = $datosJson['dni'];
$sqlVen = "UPDATE ventas SET estado_ven='$estado' WHERE num_ven='$id'";

if ($conn->query($sqlVen) === TRUE) {
    if ($estado == "Completado") {
        $sqlRid = "UPDATE riders SET estado='Disponible' WHERE dni_rid='$dni'";
        if ($conn->query($sqlRid) === TRUE) {
            echo "Finalizado";
        } else {
            echo "Error updating record: " . $conn->error;
        }
    } else {
        echo "Actualizado";
    }
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();

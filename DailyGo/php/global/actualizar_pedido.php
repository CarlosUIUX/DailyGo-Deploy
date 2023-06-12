<?php
$json = file_get_contents('php://input');
$datosJson = json_decode($json, true);

$conn = mysqli_connect("localhost", "root", "", "dailygo");
mysqli_select_db($conn, "dailygo") or die("No se puede seleccionar la BD");

$id = $datosJson['id'];
$estado = $datosJson['estado'];

if (isset($datosJson['nota'])) {
    $nota = intval($datosJson['nota']);
    $sqlUpd = "UPDATE ventas SET estado_ven='$estado', valoracion=$nota WHERE num_ven=$id";
} else {
    $sqlUpd = "UPDATE ventas SET estado_ven='$estado' WHERE num_ven=$id";
}



if ($conn->query($sqlUpd) === TRUE) {
    if ($estado == 'En preparación') {
        $sqlRider = "SELECT * from riders where estado='Disponible' ORDER BY RAND() LIMIT 1";
        $dataRider = $conn->query($sqlRider);
        if ($dataRider->num_rows == 1) {
            while ($row = $dataRider->fetch_assoc()) {
                $dni = $row['DNI_RID'];
                $updRider = "UPDATE ventas SET dni_rid_ven='$dni' WHERE num_ven=$id";
                if ($conn->query($updRider) === TRUE) {
                    echo "Actualizado";
                } else {
                    echo "Error rider: " . $conn->error;
                }
            }
        } else {
            echo "Error rider: " . $conn->error;
        }
    } else {
        echo "Actualizado";
    }
} else {
    echo "Error updating record: " . $conn->error;
}

$conn->close();

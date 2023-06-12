<?php
$json = file_get_contents('php://input');

// Decodificar el JSON a un array asociativo
$data = json_decode($json, true);

if (isset($data["asunto"])) {
    $asunto = $data["asunto"];
    $descripcion = $data["descripcion"];
    $id = $data["id"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        $datos = mysqli_query($conexion, "INSERT INTO mensajes (ASU_MEN, MEN_MEN, COD_CLI_MEN) VALUES ('$asunto', '$descripcion', $id)");
        echo 'Creada';
    } catch (Exception $err) {
        echo 'Fallo en el insert';
    }
} else {
    echo 'Datos vacios';
}
?>
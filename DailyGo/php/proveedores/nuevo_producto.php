<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Verificar si se recibió el archivo y si no hubo errores
    if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
        // Obtener la información del archivo
        $nombreArchivo = $_FILES['imagen']['name'];
        $tipoArchivo = $_FILES['imagen']['type'];
        $rutaTemporal = $_FILES['imagen']['tmp_name'];
        $tamañoArchivo = $_FILES['imagen']['size'];
        $nombre = $_POST["nombre"];
        $cif = $_POST["cif"];
        $precio = $_POST["precio"];

        $conexion = mysqli_connect("localhost", "root", "", "dailygo");
        mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
        /* Lazo la consulta sobre la BD*/
        try {
            mysqli_query($conexion, "INSERT INTO productos (DEN_PROD, PU_PROD, CIF_PROV_PROD) VALUES ('$nombre', $precio, '$cif')");
            $ultimoId = $conexion->insert_id;
            // Ruta de destino para guardar la imagen
            $rutaDestino = '..\..\img_bbdd\productos\\' . $ultimoId . '.jpg';

            // Mover el archivo desde la ubicación temporal a la ubicación deseada
            move_uploaded_file($rutaTemporal, $rutaDestino);

            // La imagen se guardó correctamente
            echo 'InsertCorrecto';
        } catch (Exception $err) {
            echo $err;
        }
    }
}

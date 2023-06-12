<?php
$json = file_get_contents('php://input');

// Decodificar el JSON a un array asociativo
$data = json_decode($json, true);
if (isset($data["producIni"])) {
    $cif = $data["cif"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    $arrayProductos = [];
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        $datos = mysqli_query($conexion, "SELECT COD_PROD as codigo, DEN_PROD as nombre from productos where CIF_PROV_PROD = '$cif'");
        $numr = mysqli_num_rows($datos);
        if ($numr != 0) {
            while ($data = mysqli_fetch_assoc($datos)) {
                array_push($arrayProductos,  $data);
            }
            echo json_encode($arrayProductos);
        }
    } catch (Exception $err) {
        echo $err;
    }
} else if (isset($data["idProd"])) {
    $cif = $data["cif"];
    $idProd = $data["idProd"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    $arrayProductos = [];
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        $datos = mysqli_query($conexion, "SELECT COD_PROD as codigo, DEN_PROD as nombre, PU_PROD as precio from productos where COD_PROD = '$idProd'");
        $numr = mysqli_num_rows($datos);
        if ($numr != 0) {
            while ($data = mysqli_fetch_assoc($datos)) {
                array_push($arrayProductos,  $data);
            }
            echo json_encode($arrayProductos);
        }
    } catch (Exception $err) {
        echo $err;
    }
} else if (isset($data["nombreProducto"])) {
    $nombreProducto = $data["nombreProducto"];
    $id = $data["id"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    $arrayProductos = [];
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        mysqli_query($conexion, "UPDATE productos set DEN_PROD = '$nombreProducto' where COD_PROD = $id");
        echo 'NombreActualizado';
    } catch (Exception $err) {
        echo $err;
    }
} else if (isset($data["precioNuevo"])) {
    $precioNuevo = $data["precioNuevo"];
    $id = $data["id"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    $arrayProductos = [];
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        mysqli_query($conexion, "UPDATE productos set PU_PROD = $precioNuevo where COD_PROD = $id");
        echo 'precioActualizado';
    } catch (Exception $err) {
        echo $err;
    }
} else if (isset($data["idBorrar"])) {
    $id = $data["idBorrar"];
    $imagen = '../../img_bbdd\productos\\' . $id . '.jpg'; // Ruta completa de la imagen que deseas borrar
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    $arrayProductos = [];
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        mysqli_query($conexion, "DELETE FROM productos where COD_PROD = $id");
        echo 'ProductoBorrado';
        // Verificar si el archivo existe antes de intentar eliminarlo
        if (file_exists($imagen)) {
            // Intentar eliminar el archivo
            if (unlink($imagen)) {
                echo 'ImagenBorrada';
            } else {
                echo 'No se pudo borrar la imagen.';
            }
        } else {
            echo 'El archivo de imagen no existe.';
        }
    } catch (Exception $err) {
        echo $err;
    }
} 

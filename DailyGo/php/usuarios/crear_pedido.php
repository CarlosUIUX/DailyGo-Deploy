<?php

try {
    $json = file_get_contents('php://input');
    $datosJson = json_decode($json, true);

    $conn = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conn, "dailygo") or die("No se puede seleccionar la BD");

    $id = $datosJson['id'];
    $direccion = $datosJson['direccion'] . " " . $datosJson['piso'] . " " . $datosJson['puerta'];
    $fecha = date("d-m-Y");
    $carrito = json_decode($datosJson['carrito']);

    if (isset($datosJson['mensaje'])) {
        $mensaje = $datosJson['mensaje'];
    } else {
        $mensaje = '-';
    }

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sqlInsert = "INSERT INTO VENTAS (COD_CLI_VEN, DNI_RID_VEN, DIR_VEN, FECH_VEN, ESTADO_VEN, COM_VEN, VALORACION)
VALUES ($id, '0', '$direccion', '$fecha', 'Creado', '$mensaje', 0)";

    if ($conn->query($sqlInsert) === TRUE) {
        $lastInsertId = mysqli_insert_id($conn);

        for ($i = 0; $i < sizeof($carrito); $i++) {
            $cantidad = $carrito[$i]->cantidad;
            $prod = $carrito[$i]->id;
            $insertProducto = "INSERT INTO DETALLE_VENTAS (NUM_VEN_DET, COD_PROD_DET, CANT_DET)
            VALUES ($lastInsertId, $prod, $cantidad)";

            if ($conn->query($insertProducto) !== TRUE) {
                echo "Error";
            }
        }
        echo "Creado";
    } else {
        echo "Error";
    }
    $conn->close();
} catch (\Throwable $th) {
    echo $th;
}

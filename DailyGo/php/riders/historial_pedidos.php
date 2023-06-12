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
$fecha = $datosJson['fecha'];

if ($fecha != "") {
    $fecha=$datosJson['fecha'];
    $sql = "SELECT DISTINCT ventas.num_ven, ventas.estado_ven, ventas.fech_ven, ventas.dir_ven, proveedores.dir_prov, proveedores.razsoc, proveedores.cif_prov  FROM ventas
    INNER JOIN riders ON riders.dni_rid = ventas.dni_rid_ven
    INNER JOIN detalle_ventas ON detalle_ventas.num_ven_det = ventas.num_ven
    INNER JOIN productos ON productos.cod_prod=detalle_ventas.cod_prod_det
    INNER JOIN proveedores ON proveedores.cif_prov = productos.cif_prov_prod
    WHERE riders.dni_rid='$dni' AND ventas.fech_ven='$fecha' AND (ventas.estado_ven='Completado' OR ventas.estado_ven='Valorado' ) ORDER BY ventas.num_ven desc";
} else {
    $sql = "SELECT DISTINCT ventas.num_ven, ventas.estado_ven, ventas.fech_ven, ventas.dir_ven, proveedores.dir_prov, proveedores.razsoc, proveedores.cif_prov  FROM ventas
    INNER JOIN riders ON riders.dni_rid = ventas.dni_rid_ven
    INNER JOIN detalle_ventas ON detalle_ventas.num_ven_det = ventas.num_ven
    INNER JOIN productos ON productos.cod_prod=detalle_ventas.cod_prod_det
    INNER JOIN proveedores ON proveedores.cif_prov = productos.cif_prov_prod
    WHERE riders.dni_rid='$dni' AND (ventas.estado_ven='Completado' OR ventas.estado_ven='Valorado' ) ORDER BY ventas.num_ven desc";
}
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while ($row = $result->fetch_assoc()) {
        $array_data[]=$row;
    }
    echo json_encode($array_data);
} else {
    $arrError = array('msg' => "Sin resultados");
    echo json_encode($arrError);
}
$conn->close();

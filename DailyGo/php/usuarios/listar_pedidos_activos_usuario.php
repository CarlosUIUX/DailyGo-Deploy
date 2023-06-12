<?php
try {
    $json = file_get_contents('php://input');
    $datosJson = json_decode($json, true);

    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");

    /* Lazo la consulta sobre la BD*/
    $id = $datosJson['id'];

    if (isset($id)) {
        $datos = mysqli_query($conexion, "SELECT DISTINCT ventas.num_ven, ventas.estado_ven, ventas.com_ven, proveedores.razsoc, riders.nom_rid from ventas 
        JOIN detalle_ventas ON  detalle_ventas.num_ven_det=ventas.num_ven 
        JOIN riders ON ventas.dni_rid_ven=riders.dni_rid 
        JOIN productos ON detalle_ventas.cod_prod_det=productos.cod_prod 
        JOIN proveedores ON proveedores.cif_prov=productos.cif_prov_prod
        WHERE ventas.COD_CLI_VEN = $id 
        AND (ventas.estado_ven='Creado' OR ventas.estado_ven='En preparación' OR ventas.estado_ven='Preparado' OR ventas.estado_ven='En camino' OR ventas.estado_ven='Completado')");
    } else {
        $arrError = array('msg' => "Error");
        echo json_encode($arrError);
    }

    $numr = mysqli_num_rows($datos);
    if ($numr > 0) {
        while ($data = mysqli_fetch_assoc($datos)) {
            $idPedido = $data['num_ven'];
            $carroSQL = "SELECT detalle_ventas.cant_det, productos.cod_prod, productos.den_prod FROM detalle_ventas JOIN productos ON detalle_ventas.cod_prod_det = productos.cod_prod WHERE detalle_ventas.NUM_VEN_DET=$idPedido";
            $result = $conexion->query($carroSQL);

            $carrito = array();

            while ($row = $result->fetch_assoc()) {
                $carrito[] = $row;
            }

            $data['carro'] = $carrito;
            $array_data[] = $data;
        }

        echo json_encode($array_data);
    } else {
        $arrError = array('msg' => "Sin resultados");
        echo json_encode($arrError);
    }
} catch (\Throwable $th) {
    $arrError = array('msg' => "$th");
    echo json_encode($arrError);
    return false;
}

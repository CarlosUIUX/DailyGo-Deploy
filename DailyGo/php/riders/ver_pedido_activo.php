<?php
try {
    $json = file_get_contents('php://input');
    $datosJson = json_decode($json, true);

    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");

    /* Lazo la consulta sobre la BD*/
    $dni = $datosJson['dni'];

    $datos = mysqli_query($conexion, "SELECT DISTINCT ventas.num_ven, ventas.estado_ven, ventas.com_ven, proveedores.razsoc, proveedores.cif_prov, ventas.dir_ven, proveedores.dir_prov, proveedores.coordenadas, proveedores.cif_prov, clientes.nom_cli, clientes.ape_cli from ventas 
        JOIN detalle_ventas ON  detalle_ventas.num_ven_det=ventas.num_ven 
        JOIN riders ON ventas.dni_rid_ven=riders.dni_rid 
        JOIN productos ON detalle_ventas.cod_prod_det=productos.cod_prod 
        JOIN proveedores ON proveedores.cif_prov=productos.cif_prov_prod
        JOIN clientes ON clientes.cod_cli=ventas.cod_cli_ven
        WHERE riders.dni_rid = \"$dni\"
        AND (ventas.estado_ven='En preparación' OR ventas.estado_ven='Preparado' OR ventas.estado_ven='En camino') ORDER BY ventas.num_ven DESC LIMIT 1");

    $numr = mysqli_num_rows($datos);
    if ($numr > 0) {
        while ($data = mysqli_fetch_assoc($datos)) {
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

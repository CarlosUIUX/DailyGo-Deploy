<?php
try {
    $json = file_get_contents('php://input');
    $datosJson = json_decode($json, true);

    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    
    /* Lazo la consulta sobre la BD*/
    $id = $datosJson['id'];
    $fecha = $datosJson['fecha'];
    if($fecha == ""){
        $datos = mysqli_query($conexion, "SELECT ventas.num_ven, detalle_ventas.cant_det, ventas.FECH_VEN, ventas.ESTADO_VEN, ventas.DIR_VEN, proveedores.razsoc, productos.cod_prod, productos.den_prod FROM detalle_ventas 
        JOIN ventas ON detalle_ventas.NUM_VEN_DET = ventas.NUM_VEN 
        JOIN productos ON detalle_ventas.COD_PROD_DET = productos.COD_PROD 
        JOIN proveedores ON proveedores.CIF_PROV = productos.CIF_PROV_PROD 
        WHERE ventas.COD_CLI_VEN = $id AND (ventas.estado_ven='Valorado' OR ventas.estado_ven='Entregado' OR ventas.estado_ven='Cancelado') ORDER BY NUM_VEN DESC");
    }else{
        $datos = mysqli_query($conexion, "SELECT ventas.num_ven, detalle_ventas.cant_det, ventas.FECH_VEN, ventas.ESTADO_VEN, ventas.DIR_VEN, proveedores.razsoc, productos.cod_prod, productos.den_prod FROM detalle_ventas 
        JOIN ventas ON detalle_ventas.NUM_VEN_DET = ventas.NUM_VEN 
        JOIN productos ON detalle_ventas.COD_PROD_DET = productos.COD_PROD 
        JOIN proveedores ON proveedores.CIF_PROV = productos.CIF_PROV_PROD 
        WHERE ventas.COD_CLI_VEN = $id  AND ventas.fech_ven='$fecha' AND (ventas.estado_ven='Valorado' OR ventas.estado_ven='Entregado' OR ventas.estado_ven='Cancelado') ORDER BY NUM_VEN DESC");
    }
    
    $numr = mysqli_num_rows($datos);
    if ($numr > 0) {
        while($data=mysqli_fetch_assoc($datos)){
            $array_data[]=$data;
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

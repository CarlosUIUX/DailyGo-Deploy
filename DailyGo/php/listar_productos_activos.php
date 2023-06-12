<?php
try {
    $json = file_get_contents('php://input');
    $datosJson = json_decode($json, true);

    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    
    /* Lazo la consulta sobre la BD*/
    $id = $datosJson['id'];
    if(isset($id)){
        $datos = mysqli_query($conexion, "SELECT detalle_ventas.cant_det, productos.cod_prod, productos.den_prod FROM detalle_ventas JOIN productos ON detalle_ventas.cod_prod_det = productos.cod_prod WHERE detalle_ventas.NUM_VEN_DET=$id");
    }else{
        echo "error";
        return false;
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

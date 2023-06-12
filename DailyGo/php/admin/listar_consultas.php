<?php
try {

    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");

    $datos = mysqli_query($conexion, "select * from mensajes join clientes on clientes.cod_cli = mensajes.cod_cli_men ORDER BY mensajes.cod_men DESC");
    
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

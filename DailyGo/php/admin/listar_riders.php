<?php
try {
    $json = file_get_contents('php://input');
    $datosJson = json_decode($json, true);

    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    
    /* Lazo la consulta sobre la BD*/
    $buscar = $datosJson['buscar'];

    if($buscar == ""){
        $datos = mysqli_query($conexion, "select * from riders where DNI_RID <> '0'");
    }else{
        $datos = mysqli_query($conexion, "select * from riders where TLF_RID LIKE '$buscar%' AND DNI_RID <> '0'");
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

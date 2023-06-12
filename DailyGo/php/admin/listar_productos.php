<?php
try {
    $json = file_get_contents('php://input');
    $datosJson = json_decode($json, true);

    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    
    /* Lazo la consulta sobre la BD*/
    $buscar = $datosJson['buscar'];

    if($buscar == ""){
        $datos = mysqli_query($conexion, "select * from productos join proveedores on productos.cif_prov_prod = proveedores.cif_prov");
    }else{
        $datos = mysqli_query($conexion, "select * from productos join proveedores on productos.cif_prov_prod = proveedores.cif_prov where productos.den_prod LIKE '$buscar%'");
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

<?php
try {
    $json = file_get_contents('php://input');
    $datosJson = json_decode($json, true);

    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");

    /* Lazo la consulta sobre la BD*/
    $tiendaUsuario = $datosJson['tienda'];
    $categoria = $datosJson['categoria'];
    $orden = $datosJson['orden'];

    if ($tiendaUsuario == "") {
        if ($categoria == "") {
            if($orden == "rand"){
                $datos = mysqli_query($conexion, "select * from proveedores order by rand()");
            }else if($orden == "TIEMPO"){
                $datos = mysqli_query($conexion, "select * from proveedores order by TIEMPO ASC");
            }else{
                $datos = mysqli_query($conexion, "select * from proveedores order by VALORACIONES DESC");
            }
        } else {
            if($orden == "rand"){
                $datos = mysqli_query($conexion, "select * from proveedores where categoria='$categoria' order by rand()");
            }else if($orden == "TIEMPO"){
                $datos = mysqli_query($conexion, "select * from proveedores where categoria='$categoria' order by TIEMPO ASC");
            }else{
                $datos = mysqli_query($conexion, "select * from proveedores where categoria='$categoria' order by VALORACIONES DESC");
            }
        }
    } else {
        if ($categoria == "") {
            if($orden == "rand"){
                $datos = mysqli_query($conexion, "select * from proveedores where razsoc LIKE '$tiendaUsuario%' order by rand() LIMIT 100");
            }else if($orden == "TIEMPO"){
                $datos = mysqli_query($conexion, "select * from proveedores where razsoc LIKE '$tiendaUsuario%' order by TIEMPO ASC");
            }else{
                $datos = mysqli_query($conexion, "select * from proveedores where razsoc LIKE '$tiendaUsuario%' order by VALORACIONES DESC");
            }
        } else {
            if($orden == "rand"){
                $datos = mysqli_query($conexion, "select * from proveedores where razsoc LIKE '$tiendaUsuario%' AND categoria='$categoria' order by rand()");
            }else if($orden == "TIEMPO"){
                $datos = mysqli_query($conexion, "select * from proveedores where razsoc LIKE '$tiendaUsuario%' AND categoria='$categoria' order by TIEMPO ASC");
            }else{
                $datos = mysqli_query($conexion, "select * from proveedores where razsoc LIKE '$tiendaUsuario%' AND categoria='$categoria' order by VALORACIONES ASC");
            }
        }
    }

    $numr = mysqli_num_rows($datos);
    if ($numr > 0) {
        while ($data = mysqli_fetch_assoc($datos)) {
            $cif = $data['CIF_PROV'];
            $media = mysqli_query($conexion, "SELECT AVG(ventas.valoracion) from ventas 
            JOIN detalle_ventas ON  detalle_ventas.num_ven_det=ventas.num_ven 
            JOIN riders ON ventas.dni_rid_ven=riders.dni_rid 
            JOIN productos ON detalle_ventas.cod_prod_det=productos.cod_prod 
            JOIN proveedores ON proveedores.cif_prov=productos.cif_prov_prod
            WHERE proveedores.cif_prov='$cif' AND ventas.estado_ven='Valorado'");
            
            $sizeMedia = mysqli_num_rows($media);
            while($resMedia = mysqli_fetch_assoc($media)){
                if($sizeMedia== 1){
                    if(isset($resMedia['AVG(ventas.valoracion)'])){
                        $data['media'] = $resMedia['AVG(ventas.valoracion)'];
                        $array_data[] = $data;
                    }else{
                        $data['media'] = 0.0;
                        $array_data[] = $data;
                    }
                }else{
                    $data['media'] = 0.0;
                    $array_data[] = $data;
                }
            }
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

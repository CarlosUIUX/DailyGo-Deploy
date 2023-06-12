<?php
try {
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");

    $datos = mysqli_query($conexion, "select * from proveedores ORDER BY RAND() limit 4");

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

<?php
try {
    $json = file_get_contents('php://input');
    $datosJson = json_decode($json, true);

    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");

    /* Lazo la consulta sobre la BD*/
    $buscar = $datosJson['buscar'];
    $fecha = $datosJson['fecha'];
    $tipo = $datosJson['tipo'];

    if ($buscar == "") {
        if ($fecha == "") {
            $datos = mysqli_query($conexion, "select DISTINCT ventas.`NUM_VEN`, clientes.`NOM_CLI`, clientes.`APE_CLI`, clientes.`MAIL_CLI`, riders.`NOM_RID`, riders.`APE_RID`, riders.`MAIL_RID`, proveedores.`RAZSOC`, ventas.`FECH_VEN`, ventas.`ESTADO_VEN`, ventas.`COM_VEN`, ventas.`DIR_VEN` from ventas 
            JOIN riders ON riders.dni_rid=ventas.dni_rid_ven
            JOIN detalle_ventas ON detalle_ventas.num_ven_det=ventas.num_ven
            JOIN productos ON productos.cod_prod=detalle_ventas.cod_prod_det
            JOIN clientes ON clientes.cod_cli=ventas.cod_cli_ven
            JOIN proveedores ON proveedores.cif_prov=productos.cif_prov_prod");
        } else {
            $datos = mysqli_query($conexion, "select DISTINCT ventas.`NUM_VEN`, clientes.`NOM_CLI`, clientes.`APE_CLI`, clientes.`MAIL_CLI`, riders.`NOM_RID`, riders.`APE_RID`, riders.`MAIL_RID`, proveedores.`RAZSOC`, ventas.`FECH_VEN`, ventas.`ESTADO_VEN`, ventas.`COM_VEN`, ventas.`DIR_VEN` from ventas 
            JOIN riders ON riders.dni_rid=ventas.dni_rid_ven
            JOIN detalle_ventas ON detalle_ventas.num_ven_det=ventas.num_ven
            JOIN productos ON productos.cod_prod=detalle_ventas.cod_prod_det
            JOIN clientes ON clientes.cod_cli=ventas.cod_cli_ven
            JOIN proveedores ON proveedores.cif_prov=productos.cif_prov_prod
            WHERE ventas.fech_ven='$fecha'");
        }
    } else {
        if ($fecha == "") {
            if ($tipo == "cliente") {
                $datos = mysqli_query($conexion, "select DISTINCT ventas.`NUM_VEN`, clientes.`NOM_CLI`, clientes.`APE_CLI`, clientes.`MAIL_CLI`, riders.`NOM_RID`, riders.`APE_RID`, riders.`MAIL_RID`, proveedores.`RAZSOC`, ventas.`FECH_VEN`, ventas.`ESTADO_VEN`, ventas.`COM_VEN`, ventas.`DIR_VEN` from ventas 
                JOIN riders ON riders.dni_rid=ventas.dni_rid_ven
                JOIN detalle_ventas ON detalle_ventas.num_ven_det=ventas.num_ven
                JOIN productos ON productos.cod_prod=detalle_ventas.cod_prod_det
                JOIN clientes ON clientes.cod_cli=ventas.cod_cli_ven
                JOIN proveedores ON proveedores.cif_prov=productos.cif_prov_prod
                WHERE clientes.mail_cli LIKE '$buscar%'");
            } else if ($tipo == "rider") {
                $datos = mysqli_query($conexion, "select DISTINCT ventas.`NUM_VEN`, clientes.`NOM_CLI`, clientes.`APE_CLI`, clientes.`MAIL_CLI`, riders.`NOM_RID`, riders.`APE_RID`, riders.`MAIL_RID`, proveedores.`RAZSOC`, ventas.`FECH_VEN`, ventas.`ESTADO_VEN`, ventas.`COM_VEN`, ventas.`DIR_VEN` from ventas 
                JOIN riders ON riders.dni_rid=ventas.dni_rid_ven
                JOIN detalle_ventas ON detalle_ventas.num_ven_det=ventas.num_ven
                JOIN productos ON productos.cod_prod=detalle_ventas.cod_prod_det
                JOIN clientes ON clientes.cod_cli=ventas.cod_cli_ven
                JOIN proveedores ON proveedores.cif_prov=productos.cif_prov_prod
                WHERE riders.mail_rid LIKE '$buscar%'");
            } else if ($tipo == "proveedor") {
                $datos = mysqli_query($conexion, "select DISTINCT ventas.`NUM_VEN`, clientes.`NOM_CLI`, clientes.`APE_CLI`, clientes.`MAIL_CLI`, riders.`NOM_RID`, riders.`APE_RID`, riders.`MAIL_RID`, proveedores.`RAZSOC`, ventas.`FECH_VEN`, ventas.`ESTADO_VEN`, ventas.`COM_VEN`, ventas.`DIR_VEN` from ventas 
                JOIN riders ON riders.dni_rid=ventas.dni_rid_ven
                JOIN detalle_ventas ON detalle_ventas.num_ven_det=ventas.num_ven
                JOIN productos ON productos.cod_prod=detalle_ventas.cod_prod_det
                JOIN clientes ON clientes.cod_cli=ventas.cod_cli_ven
                JOIN proveedores ON proveedores.cif_prov=productos.cif_prov_prod
                WHERE proveedores.razsoc LIKE '$buscar%'");
            }
        } else {
            if ($tipo == "cliente") {
                $datos = mysqli_query($conexion, "select DISTINCT ventas.`NUM_VEN`, clientes.`NOM_CLI`, clientes.`APE_CLI`, clientes.`MAIL_CLI`, riders.`NOM_RID`, riders.`APE_RID`, riders.`MAIL_RID`, proveedores.`RAZSOC`, ventas.`FECH_VEN`, ventas.`ESTADO_VEN`, ventas.`COM_VEN`, ventas.`DIR_VEN` from ventas 
                JOIN riders ON riders.dni_rid=ventas.dni_rid_ven
                JOIN detalle_ventas ON detalle_ventas.num_ven_det=ventas.num_ven
                JOIN productos ON productos.cod_prod=detalle_ventas.cod_prod_det
                JOIN clientes ON clientes.cod_cli=ventas.cod_cli_ven
                JOIN proveedores ON proveedores.cif_prov=productos.cif_prov_prod
                WHERE clientes.mail_cli LIKE '$buscar%' AND ventas.fech_ven='$fecha'");
            } else if ($tipo == "rider") {
                $datos = mysqli_query($conexion, "select DISTINCT ventas.`NUM_VEN`, clientes.`NOM_CLI`, clientes.`APE_CLI`, clientes.`MAIL_CLI`, riders.`NOM_RID`, riders.`APE_RID`, riders.`MAIL_RID`, proveedores.`RAZSOC`, ventas.`FECH_VEN`, ventas.`ESTADO_VEN`, ventas.`COM_VEN`, ventas.`DIR_VEN` from ventas 
                JOIN riders ON riders.dni_rid=ventas.dni_rid_ven
                JOIN detalle_ventas ON detalle_ventas.num_ven_det=ventas.num_ven
                JOIN productos ON productos.cod_prod=detalle_ventas.cod_prod_det
                JOIN clientes ON clientes.cod_cli=ventas.cod_cli_ven
                JOIN proveedores ON proveedores.cif_prov=productos.cif_prov_prod
                WHERE riders.mail_rid LIKE '$buscar%' AND ventas.fech_ven='$fecha'");
            } else if ($tipo == "proveedor") {
                $datos = mysqli_query($conexion, "select DISTINCT ventas.`NUM_VEN`, clientes.`NOM_CLI`, clientes.`APE_CLI`, clientes.`MAIL_CLI`, riders.`NOM_RID`, riders.`APE_RID`, riders.`MAIL_RID`, proveedores.`RAZSOC`, ventas.`FECH_VEN`, ventas.`ESTADO_VEN`, ventas.`COM_VEN`, ventas.`DIR_VEN` from ventas 
                JOIN riders ON riders.dni_rid=ventas.dni_rid_ven
                JOIN detalle_ventas ON detalle_ventas.num_ven_det=ventas.num_ven
                JOIN productos ON productos.cod_prod=detalle_ventas.cod_prod_det
                JOIN clientes ON clientes.cod_cli=ventas.cod_cli_ven
                JOIN proveedores ON proveedores.cif_prov=productos.cif_prov_prod
                WHERE proveedores.razsoc LIKE '$buscar%' AND ventas.fech_ven='$fecha'");
            }
        }
    }


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

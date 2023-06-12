<?php
$json = file_get_contents('php://input');

// Decodificar el JSON a un array asociativo
$data = json_decode($json, true);

if (isset($data["razSoc"])) {
    $razSoc = $data["razSoc"];
    $cif = $data["cif"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        $datos = mysqli_query($conexion, "UPDATE proveedores SET RAZSOC = \"$razSoc\" where CIF_PROV = '$cif'");
        echo 'actualizadoRazsoc';
    } catch (Exception $err) {
        echo 'Fallo';
    }
} else if (isset($data["direccion"])) {
    $direccion = $data["direccion"];
    $cif = $data["cif"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        mysqli_query($conexion, "UPDATE proveedores SET DIR_PROV = '$direccion' where CIF_PROV = '$cif'");
        echo 'actualizadoDir';
    } catch (Exception $err) {
        echo 'Fallo';
    }
} else if (isset($data["telefono"])) {
    $telefono = $data["telefono"];
    $cif = $data["cif"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        $datos = mysqli_query($conexion, "SELECT TLF_PROV from proveedores where  CIF_PROV != '$cif' and TLF_PROV = $telefono");
        $numr = mysqli_num_rows($datos);
        if ($numr == 0) {
            mysqli_query($conexion, "UPDATE proveedores SET TLF_PROV = $telefono where CIF_PROV = '$cif'");
            echo 'actualizadoTel';
        } else {
            echo 'telExiste';
        }
    } catch (Exception $err) {
        echo 'Fallo';
    }
} else if (isset($data["contrasenaActual"])) {
    $contraActual = $data["contrasenaActual"];
    $contraNueva = $data["contrasenaNueva"];
    $cif = $data["cif"];
    $hashActual = hash('sha256', $contraActual);
    $hashNueva = hash('sha256', $contraNueva);
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        $datos = mysqli_query($conexion, "SELECT RAZSOC from proveedores where CIF_PROV = '$cif' and PW_PROV = '$hashActual'");
        $numr = mysqli_num_rows($datos);
        if ($numr != 0) {
            mysqli_query($conexion, "UPDATE proveedores SET PW_PROV = '$hashNueva' where CIF_PROV = '$cif'");
            echo 'actualizadoContra';
        } else {
            echo 'contraExiste';
        }
    } catch (Exception $err) {
        echo 'Fallo';
    }
} else if (isset($data["correo"])) {
    $correo = $data["correo"];
    $cif = $data["cif"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        $datos = mysqli_query($conexion, "SELECT tiempo from proveedores where CIF_PROV != '$cif' and MAIL_PROV = '$correo'");
        $numr = mysqli_num_rows($datos);
        if ($numr == 0) {
            mysqli_query($conexion, "UPDATE proveedores SET MAIL_PROV = '$correo' where CIF_PROV = '$cif'");
            echo 'actualizadoMail';
        } else {
            echo 'mailExiste';
        }
    } catch (Exception $err) {
        echo $err;
    }
} else if (isset($data["cat"])) {
    $categorias = [];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        $datos = mysqli_query($conexion, "SELECT DISTINCT categoria from proveedores");
        $numr = mysqli_num_rows($datos);
        if ($numr != 0) {
            while ($data = mysqli_fetch_assoc($datos)) {
                array_push($categorias,  $data);
            }
            echo json_encode($categorias);
        }
    } catch (Exception $err) {
        echo $err;
    }
} else if (isset($data["categoria"])) {
    $categoria = $data["categoria"];
    $cif = $data["cif"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        mysqli_query($conexion, "UPDATE proveedores SET categoria = '$categoria' where CIF_PROV = '$cif'");
        echo 'catCambiada';
    } catch (Exception $err) {
        echo $err;
    }
} else if (isset($data["coord"])) {
    $cif = $data["cif"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    $arrayCord = [];
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        $datos = mysqli_query($conexion, "SELECT coordenadas from proveedores where CIF_PROV = '$cif'");
        $numr = mysqli_num_rows($datos);
        if ($numr != 0) {
            while ($data = mysqli_fetch_assoc($datos)) {
                array_push($arrayCord,  $data);
            }
            echo json_encode($arrayCord);
        }
    } catch (Exception $err) {
        echo $err;
    }
} else if (isset($data["coordenadasCambiadas"])) {
    $cif = $data["cif"];
    $coordenadas = $data["coordenadasCambiadas"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    $arrayCord = [];
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        mysqli_query($conexion, "UPDATE proveedores set coordenadas = '$coordenadas' where cif_prov = '$cif'");
        echo "coordenadasCambiadas";
    } catch (Exception $err) {
        echo $err;
    }
} else if (isset($data["time"])) {
    $cif = $data["cif"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    $arrayTime = [];
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        $datos = mysqli_query($conexion, "SELECT tiempo as timeto from proveedores where CIF_PROV = '$cif'");
        $numr = mysqli_num_rows($datos);
        if ($numr != 0) {
            while ($data = mysqli_fetch_assoc($datos)) {
                array_push($arrayTime,  $data);
            }
            echo json_encode($arrayTime);
        }
    } catch (Exception $err) {
        echo $err;
    }
}else if (isset($data["tiempoCambiante"])) {
    $cif = $data["cif"];
    $tiempo = $data["tiempoCambiante"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        mysqli_query($conexion, "UPDATE proveedores set tiempo = $tiempo where cif_prov = '$cif'");
        echo "tiempoCambiado";
    } catch (Exception $err) {
        echo $err;
    }
}

<?php
$json = file_get_contents('php://input');

// Decodificar el JSON a un array asociativo
$data = json_decode($json, true);

if (isset($data["nombre"])) {
    $nombre = $data["nombre"];
    $dni = $data["dni"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        $datos = mysqli_query($conexion, "UPDATE riders SET NOM_RID = '$nombre' where DNI_RID = '$dni'");
        echo 'actualizadoNombre';
    } catch (Exception $err) {
        echo 'Fallo';
    }
} else if (isset($data["apellidos"])) {
    $apellidos = $data["apellidos"];
    $dni = $data["dni"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        $datos = mysqli_query($conexion, "UPDATE riders SET ape_rid = '$apellidos' where DNI_RID = '$dni'");
        echo 'actualizadoApe';
    } catch (Exception $err) {
        echo 'Fallo';
    }
} else if (isset($data["telefono"])) {
    $telefono = $data["telefono"];
    $dni = $data["dni"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        $datos = mysqli_query($conexion, "SELECT TLF_RID from riders where  DNI_RID != '$dni' and TLF_RID = $telefono");
        $numr = mysqli_num_rows($datos);
        if ($numr == 0) {
            mysqli_query($conexion, "UPDATE riders SET TLF_RID = $telefono where DNI_RID = '$dni'");
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
    $hashActual = hash('sha256', $contraActual);
    $hashNueva = hash('sha256', $contraNueva);
    $dni = $data["dni"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        $datos = mysqli_query($conexion, "SELECT NOM_RID from riders where DNI_RID = '$dni' and PW_RID = '$hashActual'");
        $numr = mysqli_num_rows($datos);
        if ($numr != 0) {
            mysqli_query($conexion, "UPDATE riders SET PW_RID = '$hashNueva' where DNI_RID = '$dni'");
            echo 'actualizadoContra';
        } else {
            echo 'contraExiste';
        }
    } catch (Exception $err) {
        echo 'Fallo';
    }
} else if (isset($data["correo"])) {
    $correo = $data["correo"];
    $dni = $data["dni"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        $datos = mysqli_query($conexion, "SELECT MAIL_RID from riders where DNI_RID != '$dni' and MAIL_RID = '$correo'");
        $numr = mysqli_num_rows($datos);
        if ($numr == 0) {
            mysqli_query($conexion, "UPDATE riders SET MAIL_RID = '$correo' where DNI_RID = '$dni'");
            echo 'actualizadoMail';
        } else {
            echo 'mailExiste';
        }
    } catch (Exception $err) {
        echo 'Fallo';
    }
}

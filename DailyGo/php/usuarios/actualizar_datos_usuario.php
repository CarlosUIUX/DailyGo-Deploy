<?php
$json = file_get_contents('php://input');

// Decodificar el JSON a un array asociativo
$data = json_decode($json, true);

if (isset($data["nombre"])) {
    $nombre = $data["nombre"];
    $id = $data["id"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        mysqli_query($conexion, "UPDATE clientes SET nom_cli = '$nombre' where cod_cli = $id");
        echo 'actualizadoNombre';
    } catch (Exception $err) {
        echo $err;
    }
} else if (isset($data["apellidos"])) {
    $nombre = $data["apellidos"];
    $id = $data["id"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        $datos = mysqli_query($conexion, "UPDATE clientes SET ape_cli = '$nombre' where cod_cli = $id");
        echo 'actualizadoApe';
    } catch (Exception $err) {
        echo 'Fallo';
    }
} else if (isset($data["telefono"])) {
    $telefono = $data["telefono"];
    $id = $data["id"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        $datos = mysqli_query($conexion, "SELECT TLF_CLI from clientes where  cod_cli != $id and TLF_CLI = '$telefono'");
        $numr = mysqli_num_rows($datos);
        if ($numr == 0) {
            mysqli_query($conexion, "UPDATE clientes SET tlf_cli = '$telefono' where cod_cli = $id");
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
    $id = $data["id"];
    $hashActual = hash('sha256', $contraActual);
    $hashNueva = hash('sha256', $contraNueva);

    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        $datos = mysqli_query($conexion, "SELECT nom_cli from clientes where cod_cli = $id and pw_cli = '$hashActual'");
        $numr = mysqli_num_rows($datos);
        if ($numr != 0) {
            mysqli_query($conexion, "UPDATE clientes SET pw_cli = '$hashNueva' where cod_cli = $id");
            echo 'actualizadoContra';
        } else {
            echo 'contraExiste';
        }
    } catch (Exception $err) {
        echo 'Fallo';
    }
} else if (isset($data["correo"])) {
    $correo = $data["correo"];
    $id = $data["id"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    try {
        $datos = mysqli_query($conexion, "SELECT mail_cli from clientes where cod_cli != $id and mail_cli = '$correo'");
        $numr = mysqli_num_rows($datos);
        if ($numr == 0) {
            mysqli_query($conexion, "UPDATE clientes SET mail_cli = '$correo' where cod_cli = $id");
            echo 'actualizadoMail';
        } else {
            echo 'mailExiste';
        }
    } catch (Exception $err) {
        echo 'Fallo';
    }
}

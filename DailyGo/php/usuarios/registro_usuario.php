<?php
if (isset($_POST["correoExistente"])) {
    $correo = $_POST["correoExistente"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    $datos = mysqli_query($conexion, "SELECT * FROM clientes where MAIL_CLI = '$correo'");
    $numr = mysqli_num_rows($datos);
    if ($numr == 0) {
        echo 'no existe';
    } else {
        echo 'existe';
    }
} else if (isset($_POST["telefonoExistente"])) {
    $telefono = $_POST["telefonoExistente"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    $datos = mysqli_query($conexion, "SELECT * FROM clientes where TLF_CLI = '$telefono' ");
    $numr = mysqli_num_rows($datos);
    if ($numr == 0) {
        echo 'no existe';
    } else {
        echo 'existe';
    }
} else {
    $telefono = $_POST["telefono"];
    $correo = $_POST["correo"];
    $nombre = $_POST["nombre"];
    $apellidos = $_POST["apellidos"];
    $contra = $_POST["contrasena"];
    $hash = hash('sha256', $contra);
    try {
        $conexion = mysqli_connect("localhost", "root", "", "dailygo");
        mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
        /* Lazo la consulta sobre la BD*/
        $datos = mysqli_query($conexion, "INSERT INTO clientes (NOM_CLI, APE_CLI, TLF_CLI, MAIL_CLI, PW_CLI) VALUES ('$nombre', '$apellidos', $telefono, '$correo', '$hash')");
        echo 'creado';
    } catch (Exception $err) {
        echo $err;
    }
}

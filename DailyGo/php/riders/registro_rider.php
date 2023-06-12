<?php
if (isset($_POST["dniComprobar"])) {
    $dni = $_POST["dniComprobar"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    $datos = mysqli_query($conexion, "SELECT * FROM riders where DNI_RID = '$dni'");
    $numr = mysqli_num_rows($datos);
    if ($numr == 0) {
        echo 'no existe';
    } else {
        echo 'existe';
    }
} else if (isset($_POST["correoComprobar"])) {
    $correo = $_POST["correoComprobar"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    $datos = mysqli_query($conexion, "SELECT * FROM riders where MAIL_RID = '$correo' ");
    $numr = mysqli_num_rows($datos);
    if ($numr == 0) {
        echo 'no existe';
    } else {
        echo 'existe';
    }
} else if (isset($_POST["telefonoComprobar"])) {
    $telefono = $_POST["telefonoComprobar"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    $datos = mysqli_query($conexion, "SELECT * FROM riders where TLF_RID = $telefono ");
    $numr = mysqli_num_rows($datos);
    if ($numr == 0) {
        echo 'no existe';
    } else {
        echo 'existe';
    }
} else {
    $nombre = $_POST["nombre"];
    $apellidos = $_POST["apellidos"];
    $correo = $_POST["correo"];
    $contrasena = $_POST["contrasena"];
    $dni = $_POST["dni"];
    $telefono = $_POST["telefono"];
    $hash = hash('sha256', $contrasena);

    try {
        $conexion = mysqli_connect("localhost", "root", "", "dailygo");
        mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
        /* Lazo la consulta sobre la BD*/
        $datos = mysqli_query($conexion, "INSERT INTO riders (DNI_RID, NOM_RID, APE_RID, TLF_RID, MAIL_RID, PW_RID, ESTADO) VALUES ('$dni', '$nombre', '$apellidos', $telefono, '$correo', '$hash', 'No disponible')");
        echo 'creado';
    } catch (Exception $err) {
        echo $err;
    }
}

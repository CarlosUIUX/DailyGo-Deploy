<?php
if (isset($_POST["correoExistente"])) {
    $correo = $_POST["correoExistente"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    $datos = mysqli_query($conexion, "SELECT * FROM proveedores where MAIL_PROV = '$correo'");
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
    $datos = mysqli_query($conexion, "SELECT * FROM proveedores where TLF_PROV = '$telefono' ");
    $numr = mysqli_num_rows($datos);
    if ($numr == 0) {
        echo 'no existe';
    } else {
        echo 'existe';
    }
} else if (isset($_POST["nifExistente"])) {
    $nif = $_POST["nifExistente"];
    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    /* Lazo la consulta sobre la BD*/
    $datos = mysqli_query($conexion, "SELECT * FROM proveedores where CIF_PROV = '$nif' ");
    $numr = mysqli_num_rows($datos);
    if ($numr == 0) {
        echo 'no existe';
    } else {
        echo 'existe';
    }
} else {
    $telefono = $_POST["telefono"];
    $correo = $_POST["correo"];
    $razonSocial = $_POST["razonSocial"];
    $nif = $_POST["nif"];
    $direccion = $_POST["direccion"];
    $contrasena = $_POST["contrasena"];
    $hash = hash('sha256', $contrasena);

    try {
        $conexion = mysqli_connect("localhost", "root", "", "dailygo");
        mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
        /* Lazo la consulta sobre la BD*/
        $datos = mysqli_query($conexion, "INSERT INTO proveedores (CIF_PROV, RAZSOC, DIR_PROV, TLF_PROV, MAIL_PROV, PW_PROV, CATEGORIA, TIEMPO, VALORACIONES, COORDENADAS) VALUES ('$nif', '$razonSocial', '$direccion', '$telefono', '$correo', '$hash', 'Otros', 60, 0.0, '4.50, 4.50')");
        echo 'creado';
    } catch (Exception $err) {
        echo $err;
    }
}

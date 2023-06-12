<?php
if (isset($_POST["correo"])) {
    $correo = $_POST["correo"];
    $contra = $_POST["contrasena"];
    $hash = hash('sha256', $contra);

    $conexion = mysqli_connect("localhost", "root", "", "dailygo");
    mysqli_select_db($conexion, "dailygo") or die("No se puede seleccionar la BD");
    $arrayParaJson = [];
    /* Lazo la consulta sobre la BD*/
    $datos = mysqli_query($conexion, "SELECT * FROM proveedores where MAIL_PROV = '$correo' and PW_PROV = '$hash'");
    $numr = mysqli_num_rows($datos);
    if ($numr > 0) {
        for ($i = 0; $i < $numr; $i++) {
            /* El resultado es realmente una matriz y voy cogiendo por filas con esa función*/
            $fila = mysqli_fetch_array($datos, MYSQLI_ASSOC);
            /* Uso un foreach para recorrer fila ya que es una array .*/
            foreach ($fila as $key => $value) {
                $arrayParaJson[$key][] = $value;
            }
        }
        echo json_encode($arrayParaJson);
    } else {
        echo 'False';
    }
}

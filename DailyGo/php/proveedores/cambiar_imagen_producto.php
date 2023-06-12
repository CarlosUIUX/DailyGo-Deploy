<?php 
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  // Verificar si se recibió el archivo y si no hubo errores
  if (isset($_FILES['imagen']) && $_FILES['imagen']['error'] === UPLOAD_ERR_OK) {
    // Obtener la información del archivo
    $nombreArchivo = $_FILES['imagen']['name'];
    $tipoArchivo = $_FILES['imagen']['type'];
    $rutaTemporal = $_FILES['imagen']['tmp_name'];
    $tamañoArchivo = $_FILES['imagen']['size'];
    $cif = $_POST['id'].'.jpg';
    // Ruta de destino para guardar la imagen
    $rutaDestino = '..\..\img_bbdd\productos\\'.$cif;
    // Mover el archivo desde la ubicación temporal a la ubicación deseada
    move_uploaded_file($rutaTemporal, $rutaDestino);
    // La imagen se guardó correctamente
    echo 'Imagen guardada correctamente';
  } else {
    // Error al recibir el archivo
    echo 'Error al recibir el archivo';
  }
} else {
  // Método de solicitud no válido
  echo 'Método de solicitud no válido';
}

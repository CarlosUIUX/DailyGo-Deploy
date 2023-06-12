<?php
if (isset($_POST['dni'])) {
    $dni = $_POST['dni'];
    $nombre = $_POST['nombre'];
    $apellidos = $_POST['apellidos'];
    $mail = $_POST['mail'];
    $telefono = $_POST['telefono'];
} else {
    header("Location: riders.html");
}
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DailyGo | Pedidos ultrarrápidos</title>
    <script src="../../styles/tailwind.js"></script>
    <link rel="stylesheet" href="../../styles/global.css">
    <link rel="shortcut icon" href="../../assets/svg/favicon.svg" type="image/x-icon">
</head>

<body class="font-medium text-white bg-blue-900">
    <nav class="bg-blue-800 text-white shadow-lg fixed w-full z-40">
        <div class="container mx-auto px-4">
            <div class="flex justify-between">
                <a href="inicio.html" class="flex items-center py-4 px-2">
                    <img src="../../assets/svg/logo_white.svg" alt="DailyGo">
                </a>
                <div class="hidden md:flex items-center gap-3">
                    <a href="consultas.html">Consultas</a>
                    <a href="pedidos.html">Pedidos</a>
                    <a href="proveedores.html">Proveedores</a>
                    <a href="riders.html">Riders</a>
                    <a href="clientes.html">Clientes</a>
                    <a href="productos.html">Productos</a>
                    <button id="btnCerrarSesion" class="bg-red-500 hover:bg-red-600 duration-300 rounded p-1">
                        <img src="../../assets/svg/exit.svg" width="24" alt="Cerrar sesión">
                    </button>
                </div>

                <!-- Móvil -->
                <div class="md:hidden flex items-center">
                    <button class="outline-none mobile-menu-button">
                        <svg class=" w-6 h-6" x-show="!showMenu" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <!-- Menú móvil -->
        <div class="hidden mobile-menu">
            <div class="flex flex-col justify-center items-center">
                <div class="w-full cursor-pointer text-center py-4 duration-300 hover:bg-white hover:text-blue-800 focus:text-blue-800 focus:bg-white">
                    <a href="consultas.html">Consultas</a>
                </div>
                <div class="w-full cursor-pointer text-center py-4 duration-300 hover:bg-white hover:text-blue-800 focus:text-blue-800 focus:bg-white">
                    <a href="pedidos.html">Pedidos</a>
                </div>
                <div class="w-full cursor-pointer text-center py-4 duration-300 hover:bg-white hover:text-blue-800 focus:text-blue-800 focus:bg-white">
                    <a href="proveedores.html">Proveedores</a>
                </div>
                <div class="w-full cursor-pointer text-center py-4 duration-300 hover:bg-white hover:text-blue-800 focus:text-blue-800 focus:bg-white">
                    <a href="riders.html">Riders</a>
                </div>
                <div class="w-full cursor-pointer text-center py-4 duration-300 hover:bg-white hover:text-blue-800 focus:text-blue-800 focus:bg-white">
                    <a href="clientes.html">Clientes</a>
                </div>
                <div class="w-full cursor-pointer text-center py-4 duration-300 hover:bg-white hover:text-blue-800 focus:text-blue-800 focus:bg-white">
                    <a href="riders.html">Clientes</a>
                </div>
                <div class="w-full cursor-pointer text-center py-4 duration-300 hover:bg-white hover:text-blue-800 focus:text-blue-800 focus:bg-white">
                    <button id="btnCerrarSesion" class="bg-red-500 hover:bg-red-600 duration-300 rounded px-3 py-2">Cerrar sesión</button>
                </div>
            </div>
        </div>
    </nav>

    <section class="lg:py-24 md:py-16 py-12">
        <div class="container mx-auto p-5 lg:p-0 md:p-5">
            <div class="flex gap-2 text-sm mb-3 text-blue-100">
                <a href="riders.html" class="underline">Gestión de riders</a>
                <p>> Modificar rider</p>
            </div>
            <h3 class="font-bold">Modificar rider</h3>
            <hr class="my-5">
            <div id="msgCorrecto" class="hidden">
                <p class="mt-10 bg-green-200 text-green-700 text-center py-3 rounded w-full px-2">
                    Se ha actualizado la información correctamente
                </p>
            </div>

            <div class="mt-10 flex gap-8 flex-wrap">
                <input type="hidden" id="dni" value="<?php echo $dni ?>">
                <form class="flex flex-col">
                    <label for="nombre" class="text-sm mb-3">Nombre:</label>
                    <div class="flex gap-2">
                        <input type="text" name="nombre" id="nombre" value="<?php echo $nombre ?>" class="w-fit p-2 rounded bg-blue-800 border border-blue-500 duration-300 focus:border-blue-200">
                        <input type="button" id="btnNombre" value="✅" class="p-2 cursor-pointer bg-green-500 rounded hover:bg-green-600 duration-300">
                    </div>
                    <div class="hidden" id="msgNombre">
                        <small class="text-xs text-red-500 mt-2">Escriba un nombre válido</small>
                    </div>
                </form>
                <form class="flex flex-col">
                    <label for="apellidos" class="text-sm mb-3">Apellidos:</label>
                    <div class="flex gap-2">
                        <input type="text" name="apellidos" id="apellidos" value="<?php echo $apellidos ?>" class="w-fit p-2 rounded bg-blue-800 border border-blue-500 duration-300 focus:border-blue-200">
                        <input type="button" id="btnApellidos" value="✅" class="p-2 cursor-pointer bg-green-500 rounded hover:bg-green-600 duration-300">
                    </div>
                    <div class="hidden" id="msgApellidos">
                        <small class="text-xs text-red-500 mt-2">Escriba apelidos válidos</small>
                    </div>
                </form>
                <form class="flex flex-col">
                    <label for="mail" class="text-sm mb-3">Correo:</label>
                    <div class="flex gap-2">
                        <input type="text" name="mail" id="mail" value="<?php echo $mail ?>" class="w-fit p-2 rounded bg-blue-800 border border-blue-500 duration-300 focus:border-blue-200">
                        <input type="button" id="btnMail" value="✅" class="p-2 cursor-pointer bg-green-500 rounded hover:bg-green-600 duration-300">
                    </div>
                    <div class="hidden" id="msgCorreo">
                        <small class="text-xs text-red-500 mt-2">Escriba un correo válido</small>
                    </div>
                    <div class="hidden" id="msgCorreoExiste">
                        <small class="text-xs text-red-500 mt-2">Ese correo está en uso</small>
                    </div>
                </form>
                <form class="flex flex-col">
                    <label for="telefono" class="text-sm mb-3">Teléfono:</label>
                    <div class="flex gap-2">
                        <input type="text" name="telefono" id="telefono" value="<?php echo $telefono ?>" class="w-fit p-2 rounded bg-blue-800 border border-blue-500 duration-300 focus:border-blue-200">
                        <input type="button" id="btnTelefono" value="✅" class="p-2 cursor-pointer bg-green-500 rounded hover:bg-green-600 duration-300">
                    </div>
                    <div class="hidden" id="msgTelefono">
                        <small class="text-xs text-red-500 mt-2">Escriba un teléfono válido</small>
                    </div>
                    <div class="hidden" id="msgTelefonoExiste">
                        <small class="text-xs text-red-500 mt-2">Ese teléfono está en uso</small>
                    </div>
                </form>
            </div>
        </div>
    </section>
</body>
<script src="../../js/administrador/updates/modificar_rider.js"></script>
<script src="../../js/global/cerrar_sesion.js"></script>
<script src="../../js/administrador/gestion_sesiones.js"></script>
<script src="../../js/global/navbar.js"></script>

</html>
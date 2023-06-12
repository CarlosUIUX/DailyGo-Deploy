<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DailyGo | Pedidos ultrarrápidos</title>
    <script src="../../styles/tailwind.js"></script>
    <link rel="stylesheet" href="../../styles/global.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" integrity="sha512-c42qTSw/wPZ3/5LBzD+Bw5f7bSF2oxou6wEb+I/lqeaKV5FDIfMvvRp772y4jcJLKuGUOpbJMdg/BTl50fJYAw==" crossorigin="anonymous" referrerpolicy="no-referrer" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A==" crossorigin="" />
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=" crossorigin="" />
    <link rel="shortcut icon" href="../../assets/svg/favicon.svg" type="image/x-icon">
    <script src="../../js/usuarios/gestion_sesiones.js"></script>
</head>

<body class="font-medium text-blue-800">
    <?php
    if (isset($_REQUEST['CIF_PROV'])) {
        $cifProv = $_REQUEST['CIF_PROV'];
        $razonSocial = $_REQUEST['RAZSOC'];
        $dirProv = $_REQUEST['DIR_PROV'];
        $tlfProv = $_REQUEST['TLF_PROV'];
        $valoraciones = $_REQUEST['MEDIA'];
        $categoria = $_REQUEST['CATEGORIA'];
        $tiempo = $_REQUEST['TIEMPO'];
        $coordenadas = $_REQUEST['COORDENADAS'];
        echo "<input type='hidden' id='cifProv' value='$cifProv'>";
        echo "<input type='hidden' id='coords' value='$coordenadas'>";
        echo "<input type='hidden' id='razSoc' value='$razonSocial'>";
    } else {
        header("Location: busqueda_tiendas.php");
    }
    ?>

    <input type="hidden" name="razSoc" id="razSoc" value="<?php echo $razonSocial; ?>">

    <!--Resumen pedido PC Y TABLET-->
    <div class="hover:shadow-lg duration-300 fixed lg:flex md:flex hidden bottom-0 w-full bg-blue-800 text-white p-2 z-50">
        <div class="container mx-auto py-3 flex justify-between items-center gap-8 items-center">
            <div class="flex lg:w-3/4 md:w-4/6 gap-3 overflow-x-auto px-2" id="listCarrito">
                <!--Lista de productos en el carrito-->
            </div>
            <div class="lg:w-1/4 md:w-2/6 flex items-center lg:gap-5 md:gap-3">
                <div class="border-l pl-5">
                    <small>Total con envío:</small>
                    <p id="totalBar"></p>
                </div>
                <a id="enlacePedido" href="carrito.html" class="shrink-0 bg-yellow-400 text-blue-800 font-bold hover:bg-yellow-500 duration-300 rounded px-3 py-4 flex items-center justify-center">Pedir ahora</a>
            </div>
        </div>
    </div>

    <!--CARRITO MÓVIL-->
    <a id="btnCarrito" href="carrito.html" class="border border-1 z-50 lg:hidden md:hidden flex cursor-pointer hover:shadow-lg duration-300 fixed bottom-2 right-2 bg-blue-800 rounded-full text-white p-2">
        <div class="flex items-center bg-yellow-400 rounded-full">
            <div class="rounded-full w-12 h-12 bg-white flex items-center justify-center">
                <img src="../../assets/svg/bolsa_compra.svg" width="28">
                <p id="contadorPedidos" class="absolute text-sm mt-1.5 font-bold">0</p>
            </div>
            <p class="bg-yellow-400 text-blue-800 font-bold py-2 pl-2 pr-3 rounded-full">Pedir ahora</p>
        </div>
    </a>

    <!--NAVBAR-->
    <nav class="bg-white shadow-lg fixed w-full top-0 z-40">
        <div class="container mx-auto px-4">
            <div class="flex justify-between">
                <a href="inicio.php" class="flex items-center py-5 px-2">
                    <img src="../../assets/svg/logo.svg" alt="DailyGo" width="110">
                </a>
                <div class="hidden md:flex items-center space-x-3">
                    <a href="inicio.php#info-ayuda">Ayuda</a>
                    <a href="promociones.html">Promociones</a>
                    <a href="pedidos.html">Mis Pedidos</a>
                    <a href="perfil.html">Mi Perfil</a>
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
                <div class="w-full cursor-pointer text-center py-4 duration-300 hover:bg-blue-900 hover:text-white focus:text-white focus:bg-blue-800">
                    <a href="inicio.php#info-ayuda">Ayuda</a>
                </div>
                <div class="w-full cursor-pointer text-center py-4 duration-300 hover:bg-blue-900 hover:text-white focus:text-white focus:bg-blue-800">
                    <a href="promociones.html">Promociones</a>
                </div>
                <div class="w-full cursor-pointer text-center py-4 duration-300 hover:bg-blue-900 hover:text-white focus:text-white focus:bg-blue-800">
                    <a href="pedidos.html">Mis Pedidos</a>
                </div>
                <div class="w-full cursor-pointer text-center py-4 duration-300 hover:bg-blue-900 hover:text-white focus:text-white focus:bg-blue-800">
                    <a href="perfil.html">Mi Perfil</a>
                </div>
            </div>
        </div>
    </nav>


    <main>
        <div class="w-full h-32 lg:h-48 md:h-42" style="
        background-image: url('../../img_bbdd/fondos/<?php echo $cifProv; ?>.jpg');
        background-position: center;
        background-size: cover;
        width:100%">
        </div>

        <div class="mx-auto container mt-8 px-5">
            <p class="text-sm"><a href="busqueda_tiendas.php" class="underline">Búsqueda de tiendas</a> > <span class="font-bold"><?php echo $razonSocial ?></span></p>
            <div class="mt-5">
                <div class="flex justify-between flex-wrap gap-3">
                    <div class="flex gap-5 items-center w-fit bg-white">
                        <div class="w-32 h-32 hidden lg:flex md:flex rounded-lg border" style="
                        background-image: url('../../img_bbdd/proveedores/<?php echo $cifProv; ?>.jpg');
                        background-position: center;
                        background-size: cover;">
                        </div>
                        <div>
                            <small class="bg-indigo-700 text-white px-2 py-1 rounded-full"><?php echo $categoria; ?></small>
                            <h2 class="font-bold mt-1.5"><?php echo $razonSocial; ?></h2>
                            <div class="flex text-sm mb-2 gap-3 flex-wrap mt-2">
                                <div class="flex flex-wrap items-center gap-1.5">
                                    <img id="iconoValoracion" src="../../assets/svg/valoracion.svg" alt="restaurante" width="16">
                                    <p id="valoracion"><?php echo $valoraciones; ?></p>
                                </div>
                                <p>|</p>
                                <div class="flex flex-wrap items-center gap-1.5">
                                    <img src="../../assets/svg/tiempo.svg" alt="tiempo" width="16">
                                    <p><?php echo $tiempo; ?> min</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="map">
                        <!--MAPA DEL LOCAL-->
                    </div>
                </div>


                <hr class="my-8">
                <div class="flex lg:justify-between md:justify-between justify-center items-center flex-wrap gap-5">
                    <div class="flex gap-2 justify-center flex-wrap">
                        <input type="hidden" id="orden" value="">
                        <input type="button" value="Ordenar por precio" id="ordenPrecio" class="duration-300 rounded-full border px-3 py-1 hover:bg-blue-100/50 cursor-pointer">
                    </div>
                </div>
                <div class="container flex mt-5">
                    <div class="w-full grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-4" id="listadoProductos">
                        <!--Listado de productos-->
                    </div>
                </div>
            </div>
    </main>

    <footer class="mt-24 mb-32">
        <div class="container mx-auto lg:p-2 md:p-3 p-5">
            <img src="../../assets/svg/logo.svg" alt="DailyGo" width="128">
            <div class="grid grid-cols-4 gap-8 mt-8">
                <div class="lg:col-span-1 md:col-span-1 col-span-2 flex flex-col gap-3">
                    <p class="font-bold">Sitios</p>
                    <a href="inicio.php">Inicio</a>
                    <a href="promociones.html">Promociones</a>
                    <a href="pedidos.html">Pedidos</a>
                    <a href="perfil.html">Perfil</a>
                </div>
                <div class="lg:col-span-1 md:col-span-1 col-span-2 flex flex-col gap-3">
                    <p class="font-bold">Información</p>
                    <a href="../politica_privacidad.html" target="_blank">Política de privacidad</a>
                    <a href="../terminos_condiciones.html" target="_blank">Términos y condiciones</a>
                </div>
                <div class="lg:col-span-1 md:col-span-1 col-span-2 flex flex-col gap-3">
                    <p class="font-bold">Soporte</p>
                    <a href="inicio.php#ayuda">Ayuda</a>
                </div>
            </div>
            <hr class="my-12">
            <div class="flex flex-col lg:flex-row md:flex-row lg:justify-between md:justify-between justify-center gap-5 flex-wrap items-center">
                <small>&copy; DailyGo 2023</small>
                <div class="flex gap-3 flex-wrap lg:flex-row md:flex-row lg:justify-between md:justify-between justify-center">
                    <a href="https://www.apple.com/es/app-store/">
                        <img src="../../assets/svg/app_store_logo.svg" alt="App Store">
                    </a>
                    <a href="https://play.google.com/store/games?hl=es&gl=US&pli=1">
                        <img src="../../assets/svg/google_play_logo.svg" alt="Google Play">
                    </a>
                </div>
            </div>
        </div>
    </footer>

    <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js" integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA==" crossorigin=""></script>
    <script src="../../js/usuarios/productos_tienda.js"></script>
    <script src="../../js/usuarios/carrito.js"></script>
    <script src="../../js/global/navbar.js"></script>
</body>

</html>
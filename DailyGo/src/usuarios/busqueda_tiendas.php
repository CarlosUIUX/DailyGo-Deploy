<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DailyGo | Pedidos ultrarrápidos</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css" />
    <script src="../../styles/tailwind.js"></script>
    <link rel="stylesheet" href="../../styles/global.css">
    <link rel="shortcut icon" href="../../assets/svg/favicon.svg" type="image/x-icon">
    <script src="../../js/usuarios/gestion_sesiones.js"></script>
</head>

<body class="font-medium text-blue-800">
    <?php
        if (isset($_REQUEST['nombreTienda'])) {
            $nombreTienda = $_REQUEST['nombreTienda'];
        } else {
            $nombreTienda = "";
        }
    ?>
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
    <section class="pt-8 lg:pt-24 md:pt-16" id="hero-prductos">
        <div class="container mx-auto flex flex-col justify-center items-center p-5 lg:p-0 md:p-5">
            <form class="shadow-md relative top-10 bg-white z-10 p-5 rounded-lg flex lg:flex-row md:flex-row flex-col justify-center items-center gap-3 w-full lg:w-1/2 md:w-full">
                <input type="text" name="nombreTienda" value="<?php echo $nombreTienda?>" id="nombreTienda" class="w-full rounded-md border border-blue-100 focus:border-indigo-700 p-4 bg-blue-100/10 focus:bg-blue-100/30 duration-300" placeholder="¿Qué te apetece? Escribe el local que desees">
            </form>
        </div>
    </section>

    <section class="lg:mt-16 md:mt-8 mt-5  mx-auto container p-5 lg:p-2 md:p-5">
        <div class="flex justify-center flex-wrap gap-5 mt-5">
            <div class="swiper mySwiper">
                <div class="swiper-wrapper">
                    <input type="hidden" value="" id="categoria">
                    <div class="swiper-slide text-xs text-center flex flex-col justify-end items-center cursor-pointer" onclick="filtrarCategoria('Hamburguesa')">
                        <img src="../../assets/svg/categorias/hamburguesa.svg" alt="hamburguesa" width="54" class="mb-2.5">
                        Hamburguesa
                    </div>
                    <div class="swiper-slide text-xs text-center flex flex-col justify-end items-center cursor-pointer" onclick="filtrarCategoria('Asiática')">
                        <img src="../../assets/svg/categorias/asiatica.svg" alt="asiática" width="54" class="mb-2.5">
                        Asiática
                    </div>
                    <div class="swiper-slide text-xs text-center flex flex-col justify-end items-center cursor-pointer" onclick="filtrarCategoria('Italiana')">
                        <img src="../../assets/svg/categorias/italiana.svg" alt="Italiana" width="54" class="mb-2.5">
                        Italiana
                    </div>
                    <div class="swiper-slide text-xs text-center flex flex-col justify-end items-center cursor-pointer" onclick="filtrarCategoria('Pizza')">
                        <img src="../../assets/svg/categorias/pizza.svg" alt="Pizza" width="54" class="mb-2.5">
                        Pizza
                    </div>
                    <div class="swiper-slide text-xs text-center flex flex-col justify-end items-center cursor-pointer" onclick="filtrarCategoria('Kebab')">
                        <img src="../../assets/svg/categorias/kebab.svg" alt="Kebab" width="54" class="mb-2.5">
                        Kebab
                    </div>
                    <div class="swiper-slide text-xs text-center flex flex-col justify-end items-center cursor-pointer" onclick="filtrarCategoria('Bebida')">
                        <img src="../../assets/svg/categorias/bebida.svg" alt="Bebida" width="54" class="mb-2.5">
                        Bebida
                    </div>
                    <div class="swiper-slide text-xs text-center flex flex-col justify-end items-center cursor-pointer" onclick="filtrarCategoria('Sandwich')">
                        <img src="../../assets/svg/categorias/sandwich.svg" alt="Sandwich" width="54" class="mb-2.5">
                        Sandwich
                    </div>
                    <div class="swiper-slide text-xs text-center flex flex-col justify-end items-center cursor-pointer" onclick="filtrarCategoria('Vegana')">
                        <img src="../../assets/svg/categorias/vegana.svg" alt="Vegana" width="46" class="mb-2.5">
                        Vegana
                    </div>
                    <div class="swiper-slide text-xs text-center flex flex-col justify-end items-center cursor-pointer" onclick="filtrarCategoria('Mexicana')">
                        <img src="../../assets/svg/categorias/mexicana.svg" alt="Mexicana" width="54" class="mb-2.5">
                        Mexicana
                    </div>
                    <div class="swiper-slide text-xs text-center flex flex-col justify-end items-center cursor-pointer" onclick="filtrarCategoria('Parafarmacia')">
                        <img src="../../assets/svg/categorias/parafarmacia.svg" alt="Parafarmacia" width="54" class="mb-2.5">
                        Parafarmacia
                    </div>
                    <div class="swiper-slide text-xs text-center flex flex-col justify-end items-center cursor-pointer" onclick="filtrarCategoria('Americana')">
                        <img src="../../assets/svg/categorias/americana.svg" alt="Americana" width="54" class="mb-2.5">
                        Americana
                    </div>
                    <div class="swiper-slide text-xs text-center flex flex-col justify-end items-center cursor-pointer" onclick="filtrarCategoria('Dulce')">
                        <img src="../../assets/svg/categorias/dulce.svg" alt="Dulce" width="54" class="mb-2.5">
                        Dulce
                    </div>
                    <div class="swiper-slide text-xs text-center flex flex-col justify-end items-center cursor-pointer" onclick="filtrarCategoria('Otra')">
                        <img src="../../assets/svg/categorias/otra.svg" alt="Otra" width="54" class="mb-2.5">
                        Otra
                    </div>
                </div>
            </div>
        </div>
        <hr class="mb-5 mt-8">
        <div class="flex lg:justify-between md:justify-between justify-center items-center flex-wrap gap-5">
            <div class="flex gap-2 justify-center flex-wrap">
                <input type="hidden" id="orden" value="rand">
                <!--<input type="button" value="Ordenar por valoración" id="ordenValoracion" onclick="ordenarTiendas('VALORACIONES')" class="duration-300 rounded-full border px-3 py-1 hover:bg-blue-100/50 cursor-pointer">-->
                <input type="button" value="Ordenar por tiempo" id="ordenTiempo" onclick="ordenarTiendas('TIEMPO')" class="duration-300 rounded-full border px-3 py-1 hover:bg-blue-100/50 cursor-pointer">
            </div>
            <button id="eliminarFiltros" class="duration-300 rounded-full border border-indigo-600 px-3 py-1 hover:bg-indigo-100/50 text-indigo-600">x Limpiar filtros</button>
        </div>
        <h3 class="font-bold mb-5 mt-8" id="tituloResultados">Resultados</h3>
        <div class="grid grid-cols-4 lg:grid-cols-4 md:grid-cols-2 gap-4 mb-16" id="listadoTiendas">
            <!--LISTADO DE TIENDAS-->
        </div>
    </section>

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
                    <a href="inicio.php#info-ayuda">Ayuda</a>
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

    <script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js"></script>
    <script src="../../js/usuarios/tiendas.js"></script>
    <script src="../../js/usuarios/carrito.js"></script>
</body>

</html>
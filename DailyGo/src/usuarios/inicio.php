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
    <script src="../../js/usuarios/gestion_sesiones.js"></script>
</head>

<body class="font-medium text-blue-800 pb-36">
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
                        <svg class=" w-6 h-6" x-show="!showMenu" fill="none" stroke-linecap="round"
                            stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
        <!-- Menú móvil -->
        <div class="hidden mobile-menu">
            <div class="flex flex-col justify-center items-center">
                <div
                    class="w-full cursor-pointer text-center py-4 duration-300 hover:bg-blue-900 hover:text-white focus:text-white focus:bg-blue-800">
                    <a href="inicio.php#info-ayuda">Ayuda</a>
                </div>
                <div
                    class="w-full cursor-pointer text-center py-4 duration-300 hover:bg-blue-900 hover:text-white focus:text-white focus:bg-blue-800">
                    <a href="promociones.html">Promociones</a>
                </div>
                <div
                    class="w-full cursor-pointer text-center py-4 duration-300 hover:bg-blue-900 hover:text-white focus:text-white focus:bg-blue-800">
                    <a href="pedidos.html">Mis Pedidos</a>
                </div>
                <div
                    class="w-full cursor-pointer text-center py-4 duration-300 hover:bg-blue-900 hover:text-white focus:text-white focus:bg-blue-800">
                    <a href="perfil.html">Mi Perfil</a>
                </div>
            </div>
        </div>
    </nav>

    <section class="bg-indigo-700 pt-36 pb-36" id="hero-inicio-usuario">
        <div class="container mx-auto flex flex-col justify-center items-center p-5 lg:p-0 md:p-5">
            <h1 class="font-bold text-white text-center mb-8">Pedidos y comidas a <br class="hidden lg:block md:hidden">
                domicilio en minutos</h1>
            <form action="busqueda_tiendas.php" method="post"
                class="bg-white z-10 p-5 rounded-lg flex lg:flex-row md:flex-row flex-col justify-center items-center gap-3 w-full lg:w-1/2 md:w-full">
                <input type="text" name="nombreTienda"
                    class="w-full rounded-md border border-blue-100 focus:border-indigo-700 p-4 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
                    placeholder="¿Qué te apetece? Escribe el local que desees">
                <input type="submit" value="Buscar" class="cursor-pointer duration-300 text-white bg-indigo-700 rounded-md font-semibold hover:bg-indigo-800 p-4 lg:w-fit md:w-fit w-full">
            </form>
        </div>
    </section>

    <div class="mx-auto container relative bottom-8 lg:flex md:flex hidden">
        <div
            class="items-center mx-auto bg-white p-12 rounded-lg shadow-lg w-fit flex justify-between gap-12 flex-wrap">
            <p class="text-blue-400 lg:flex hidden">Colaboramos con:</p>
            <img src="../../assets/svg/logos_marcas/dominos.svg"
                class="shrink opacity-75 hover:opacity-100 duration-300" width="64">
            <img src="../../assets/svg/logos_marcas/goiko.svg" class="shrink opacity-75 hover:opacity-100 duration-300"
                width="42">
            <img src="../../assets/svg/logos_marcas/starbucks.svg"
                class="shrink opacity-75 hover:opacity-100 duration-300" width="64">
            <img src="../../assets/svg/logos_marcas/mc_donalds.svg"
                class="shrink opacity-75 hover:opacity-100 duration-300" width="64">
            <img src="../../assets/svg/logos_marcas/subway.svg" class="shrink opacity-75 hover:opacity-100 duration-300"
                width="96">
        </div>
    </div>

    <section class="mt-12 lg:mt-10 md:mt-8 p-5 lg:p-3 md:p-5">
        <div class="container mx-auto rounded-lg">
            <h3 class="font-bold mb-5 mt-8">Te recomendamos</h3>
            <div class="grid grid-cols-4 lg:grid-cols-4 md:grid-cols-2 gap-4 mb-16" id="listadoTiendas">
                <!--LISTADO DE TIENDAS-->
            </div>
        </div>
    </section>

    <section class="mt-12 lg:mt-10 md:mt-8 p-5 lg:p-3 md:p-5">
        <div class="container bg-blue-900 mx-auto rounded-lg">
            <div class="grid grid-cols-2 items-center justify-center gap-8">
                <div class="col-span-2 lg:col-span-1 md:col-span-1 bg-blue-900 p-8 lg:p-16 rounded-lg">
                    <h2 class="text-white font-bold">Descarga nuestra aplicación y pide desde tu teléfono</h2>
                    <div class="flex gap-3 mt-5">
                        <a href="https://www.apple.com/es/app-store/">
                            <img src="../../assets/svg/app_store_logo.svg" alt="App Store">
                        </a>
                        <a href="https://play.google.com/store/games?hl=es&gl=US&pli=1">
                            <img src="../../assets/svg/google_play_logo.svg" alt="Google Play">
                        </a>
                    </div>
                </div>
                <div class="hidden lg:block md:block col-span-2 lg:col-span-1 md:col-span-1 w-full h-full lg:rounded-r-lg"
                    id="fondo-app">
                </div>
            </div>
        </div>
    </section>

    <section class="mt-10 lg:mt-18 md:mt-16 p-5 lg:p-3 md:p-5">
        <div class="container mx-auto flex flex-col items-center">
            <div class="text-center items-center">
                <h5 class="font-bold text-indigo-700">TUS LOCALES DE SIEMPRE</h5>
                <h3 class="font-bold">Del restaurante a tu puerta</h3>
                <p class="px-0 lg:px-64 md:px-5 mt-5">Encuentra tus restaurantes favorinicio_galleryitos con los descuentos más
                    atractivos para pedir comida. Disponemos del mayor catálogo de franquicias y restaurantes locales de
                    Madrid.</p>
            </div>
            <div class="container mx-auto">
                <div class="container mx-auto px-5 py-2 lg:px-32 pt-8">
                    <div class="-m-1 flex flex-wrap md:-m-2">
                        <div class="flex w-1/2 flex-wrap">
                            <div class="w-1/2 p-1 md:p-2">
                                <img alt="gallery" class="block h-full w-full rounded-lg object-cover object-center"
                                    src="../../assets/img/inicio_gallery/1.jpg" />
                            </div>
                            <div class="w-1/2 p-1 md:p-2">
                                <img alt="gallery" class="block h-full w-full rounded-lg object-cover object-center"
                                    src="../../assets/img/inicio_gallery/2.jpg" />
                            </div>
                            <div class="w-full p-1 md:p-2">
                                <video width="100%" height="100%" controls class="rounded-lg" autoplay loop>
                                    <source src="../../assets/video/comida_inicio.mp4" type="video/mp4">
                                    Tu navegador no soporta vídeos 😢
                                </video>
                            </div>
                        </div>
                        <div class="flex w-1/2 flex-wrap">
                            <div class="w-full p-1 md:p-2">
                                <img alt="gallery" class="block h-full w-full rounded-lg object-cover object-center"
                                    src="../../assets/img/inicio_gallery/3.jpg" />
                            </div>
                            <div class="w-1/2 p-1 md:p-2">
                                <img alt="gallery" class="block h-full w-full rounded-lg object-cover object-center"
                                    src="../../assets/img/inicio_gallery/4.jpg" />
                            </div>
                            <div class="w-1/2 p-1 md:p-2">
                                <img alt="gallery" class="block h-full w-full rounded-lg object-cover object-center"
                                    src="../../assets/img/inicio_gallery/5.jpg" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <section class="mt-12 lg:mt-20 md:mt-18 p-5 lg:p-3 md:p-5" id="info-ayuda">
        <div class="container mx-auto">
            <h5 class="font-bold text-indigo-700 lg:text-left md:text-center text-center">INFORMACIÓN Y AYUDA</h5>
            <h3 class="font-bold lg:text-left md:text-center text-center">Contacta con nosotros</h3>
            <div class="grid grid-cols-2 gap-8 mt-8">
                <div
                    class="mb-5 items-center md:items-start lg:items-start col-span-2 lg:col-span-1 md:col-span-1 flex flex-col gap-5 pt-5">
                    <div class="flex gap-5"><img width="20" src="../../assets/svg/telefono.svg" alt="teléfono"> +34 604
                        34
                        23 12</div>
                    <div class="flex gap-5"><img width="20" src="../../assets/svg/correo.svg" alt="correo">
                        hello@dailygo.com</div>
                    <div class="flex gap-5"><img width="20" src="../../assets/svg/calle.svg" alt="calle"> C/ Tolosa, 2,
                        4,
                        28041 Madrid</div>
                </div>
                <form class="col-span-2 lg:col-span-1 md:col-span-1">
                    <div id="respuestaPeticion" class="mb-4">
                    </div>
                    <div class="flex flex-col mb-4">
                        <label for="asunto" class="mb-2">Asunto</label>
                        <input type="text" name="asunto" id="asunto"
                            class="rounded-md border border-blue-100 focus:border-blue-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
                            placeholder="¿Por qué contactas con nosotros?">
                        <div id="msgAsunto" class="hidden">
                            <small class="text-xs text-red-500 mt-1">Use un asunto corto y evitando caracteres
                                especiales</small>
                        </div>
                    </div>
                    <div class="flex flex-col mb-4">
                        <label for="descripcion" class="mb-2">Descripción</label>
                        <textarea name="descripcion" id="descripcion"
                            class="rounded-md border border-blue-100 focus:border-blue-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
                            rows="8"></textarea>
                        <div id="msgDescripcion" class="hidden">
                            <small class="text-xs text-red-500 mt-1"> Use una descripción detallada y evitando
                                caracteres
                                especiales</small>
                        </div>
                    </div>
                    <input type="button" id="btnEnviar"
                        class="duration-300 text-white bg-indigo-700 rounded-md mt-3 font-semibold hover:bg-indigo-800 py-2 w-full cursor-pointer"
                        value="Enviar" />
                </form>
            </div>
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
            <div
                class="flex flex-col lg:flex-row md:flex-row lg:justify-between md:justify-between justify-center gap-5 flex-wrap items-center">
                <small>&copy; DailyGo 2023</small>
                <div
                    class="flex gap-3 flex-wrap lg:flex-row md:flex-row lg:justify-between md:justify-between justify-center">
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
    <script src="../../js/usuarios/tiendas.js"></script>
    <script src="../../js/usuarios/crear_peticion.js"></script>
    <script src="../../js/global/navbar.js"></script>
    <script src="../../js/usuarios/carrito.js"></script>
    
</body>

</html>
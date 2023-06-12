window.addEventListener("DOMContentLoaded", iniciarTiendas);

const nombreTienda = document.getElementById("nombreTienda");
const ordenValoracion = document.getElementById("ordenValoracion");
//const ordenTiempo = document.getElementById("ordenTiempo");
const eliminarFiltros = document.getElementById("eliminarFiltros");
const orden = document.getElementById("orden");
const categoria = document.getElementById("categoria");
const tituloResultados = document.getElementById("tituloResultados");

function iniciarTiendas() {
    if ((filename() == "inicio.php") || (filename() == "inicio.php#info-ayuda.php")) {
        tiendasTop();
    }

    try {
        CarouselCategorias();
        buscarTiendas();
        eliminarFiltros.addEventListener("click", quitarFiltros);
        nombreTienda.addEventListener("input", buscarTiendas);
    } catch (e) {
        console.log("Página de Inicio 🏠");
    }
}

function ordenarTiendas(tipo) {
    if (orden.value == "TIEMPO") {
        ordenTiempo.setAttribute("class", "duration-300 rounded-full border px-3 py-1 hover:bg-blue-100/50 cursor-pointer");
        orden.value = "rand";
        buscarTiendas();
    } else {
        ordenTiempo.setAttribute("class", "duration-300 rounded-full border px-3 py-1 bg-blue-800 text-white hover:bg-blue-900 cursor-pointer");
        orden.value = "TIEMPO";
        buscarTiendas();
    }
}

function quitarFiltros() {
    ordenTiempo.setAttribute("class", "duration-300 rounded-full border px-3 py-1 hover:bg-blue-100/50 cursor-pointer");
    orden.value = "rand";
    categoria.value = "";
    tituloResultados.textContent = `Resultados`;
    nombreTienda.value = "";
    buscarTiendas();
}

function buscarTiendas() {
    const listadoTiendas = document.getElementById("listadoTiendas");

    const datos = {
        tienda: nombreTienda.value,
        categoria: categoria.value,
        orden: orden.value
    }

    console.log(datos);

    fetch("../../php/usuarios/listar_tiendas.php", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {

            listadoTiendas.innerHTML = "";

            if (data.length > 0) {
                data.forEach(element => {
                    listadoTiendas.appendChild(crearComponenteTienda(element));
                });
            } else {
                listadoTiendas.appendChild(crearComponenteSinResultados())
            }
        })
        .catch(error => {
            console.error("Error: No se ha podido obtener los datos de todas las tiendas -> ", error);
        });
}

function filename() {
    const rutaAbsoluta = self.location.href;
    const posicionUltimaBarra = rutaAbsoluta.lastIndexOf("/");
    const rutaRelativa = rutaAbsoluta.substring(posicionUltimaBarra + "/".length, rutaAbsoluta.length);
    return rutaRelativa;
}

function tiendasTop() {
    const listadoTiendas = document.getElementById("listadoTiendas");
    listadoTiendas.innerHTML = "";

    fetch("../../php/usuarios/tiendas_top.php", {
        method: "POST",
        body: null,
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                data.forEach(element => {
                    listadoTiendas.appendChild(crearComponenteTienda(element));
                });
            } else {
                listadoTiendas.appendChild(crearComponenteSinResultados());
            }
        })
        .catch(error => {
            console.error("Error: No se ha podido obtener los datos de todas las tiendas -> ", error);
        });
}

function CarouselCategorias() {
    try {
        const swiper = new Swiper(".mySwiper", {
            slidesPerView: 3,
            spaceBetween: 3,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 7,
                    spaceBetween: 5,
                },
                768: {
                    slidesPerView: 8,
                    spaceBetween: 5,
                },
                1024: {
                    slidesPerView: 10,
                    spaceBetween: 5,
                },
            },
        });
    } catch (e) {
        console.log("No hay swiper en está página")
    }
}

function filtrarCategoria(nombre) {
    tituloResultados.textContent = `Resultados por ${nombre}`;
    categoria.value = nombre;
    buscarTiendas();
}

function crearComponenteTienda(element) {
    let valorMedia = parseFloat(element.media).toFixed(1);
    
    const componente = document.createElement("form");
    componente.setAttribute("action", "tienda_productos.php");
    componente.setAttribute("method", "post");
    componente.style.height = "200px";
    componente.style.backgroundImage = `linear-gradient(to bottom, rgba(16, 14, 52, 0.2), rgba(16, 14, 52, 0.9)), url('../../img_bbdd/fondos/${element['CIF_PROV']}.jpg')`;
    componente.style.backgroundSize = "cover";
    componente.style.backgroundPosition = "center";
    componente.setAttribute("class", "col-span-4 lg:col-span-1 md:col-span-1 shadow-lg hover:shadow-2xl duration-300 cursor-pointer rounded-lg");

    // VALORES
    componente.appendChild(datosHiddens(element, valorMedia));

    const contenedor = document.createElement("button");
    contenedor.setAttribute("type", "submit");
    contenedor.setAttribute("class", "w-full h-full flex flex-col justify-end rounded-lg");

    const contendorTexto = document.createElement("div");
    contendorTexto.setAttribute("class", "w-full h-fit mx-auto text-center rounded-xl");

    const datosTienda = document.createElement("div");
    datosTienda.setAttribute("class", "p-5 mb-5");

    const razonSocial = document.createElement("h3");
    razonSocial.setAttribute("class", "text-white font-bold truncate");
    razonSocial.textContent = `${element['RAZSOC']}`;

    const categoria = document.createElement("small");
    categoria.setAttribute("class", "px-2 py-1 bg-indigo-700 rounded-full text-xs text-white");
    categoria.textContent = `${element['CATEGORIA']}`;

    datosTienda.appendChild(razonSocial);
    datosTienda.appendChild(categoria);

    const datosExtra = document.createElement("div");
    datosExtra.setAttribute("class", "flex flex-wrap text-sm justify-center gap-3 bg-white p-2.5 rounded-b-lg");

    const divValoracion = document.createElement("div");
    divValoracion.setAttribute("class", "flex flex-wrap items-center gap-1");

    const imgValoracion = document.createElement("img");
    imgValoracion.style.width = "16px";
    if (valorMedia >= 4) {
        imgValoracion.setAttribute("src", "../../assets/svg/valoracion_top.svg");
    } else {
        imgValoracion.setAttribute("src", "../../assets/svg/valoracion.svg");
    }

    imgValoracion.setAttribute("alt", "valoración");

    const valoracion = document.createElement("p");
    valoracion.textContent = valorMedia;
    if (valorMedia >= 4) {
        valoracion.setAttribute("class", "text-yellow-500 font-bold");
    }

    divValoracion.appendChild(imgValoracion);
    divValoracion.appendChild(valoracion);

    const divTiempo = document.createElement("div");
    divTiempo.setAttribute("class", "flex flex-wrap items-center gap-1");

    const imgTiempo = document.createElement("img");
    imgTiempo.style.width = "16px";
    imgTiempo.setAttribute("src", "../../assets/svg/tiempo.svg");
    imgTiempo.setAttribute("alt", "tiempo");

    const tiempo = document.createElement("p");
    tiempo.textContent = `${element['TIEMPO']} min`;

    divTiempo.appendChild(imgTiempo);
    divTiempo.appendChild(tiempo);

    datosExtra.appendChild(divValoracion);
    datosExtra.appendChild(divTiempo);
    contendorTexto.appendChild(datosTienda);
    contendorTexto.appendChild(datosExtra);
    contenedor.appendChild(contendorTexto);
    componente.appendChild(contenedor);

    return componente;
}

function crearComponenteSinResultados() {
    const p = document.createElement("p");
    p.textContent = "No se han encontrado resultados 😢 Busca otra tienda ¡Hay miles!";
    p.setAttribute("class", "col-span-4");
    p.style.textAlign = "center";

    return p;
}

function datosHiddens(element, media) {
    const div = document.createElement("div");
    
    const tipos = ["CIF_PROV", "RAZSOC", "DIR_PROV", "TLF_PROV", "MEDIA", "CATEGORIA", "TIEMPO", "COORDENADAS"];

    for (let i = 0; i < tipos.length; i++) {
        const nuevo = document.createElement("input");
        nuevo.setAttribute("name", tipos[i]);
        nuevo.setAttribute("type", "hidden");
        if(tipos[i] == "MEDIA"){
            nuevo.setAttribute("value", media);
        }else{
            nuevo.setAttribute("value", element[tipos[i]]);
        }
        div.appendChild(nuevo);
    }
    console.log(div);
    return div;
}
document.addEventListener('DOMContentLoaded', iniciarTienda);

const cif = document.getElementById("cifProv");
const ordenPrecio = document.getElementById("ordenPrecio");
const razSoc = document.getElementById("razSoc");
const coords = document.getElementById("coords");

function iniciarTienda() {
    mostrarMapa();
    determinarValoracion();
    mostrarProductos();
    ordenPrecio.addEventListener("click", ordenarProductos);
}

function determinarValoracion() {
    const iconoValoracion = document.getElementById("iconoValoracion");
    const valoracion = document.getElementById("valoracion");

    if (valoracion.textContent >= 4) {
        iconoValoracion.setAttribute("src", "../../assets/svg/valoracion_top.svg")
        valoracion.setAttribute("class", "font-bold text-yellow-500");
    }
}

function ordenarProductos() {
    const orden = document.getElementById("orden");
    if (orden.value == "precio") {
        ordenPrecio.setAttribute("class", "duration-300 rounded-full border px-3 py-1 hover:bg-blue-100/50 cursor-pointer");
        orden.value = "";
    } else {
        ordenPrecio.setAttribute("class", "rounded-full px-3 py-1 bg-blue-900 text-white cursor-pointer");
        orden.value = "precio";
    }

    mostrarProductos();
}

function mostrarProductos() {
    const cifProv = document.getElementById("cifProv");
    const orden = document.getElementById("orden");

    const listadoProductos = document.getElementById("listadoProductos");

    const datos = {
        cif: cifProv.value,
        orden: orden.value,
    }

    fetch("../../php/usuarios/listar_productos_tienda.php", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {

            listadoProductos.innerHTML = "";

            if (data.length > 0) {
                data.forEach(element => {
                    listadoProductos.appendChild(crearComponenteProducto(element));
                });
            } else {
                listadoProductos.appendChild(crearComponenteSinResultados());
            }

        })
        .catch(error => {
            listadoProductos.innerHTML = "";
            listadoProductos.appendChild(crearComponenteSinResultados());
            console.error("Error: No se ha podido obtener los datos de todas las tiendas -> ", error);
        });
}


function comprobarTop() {
    const valoracion = document.getElementById("valoracion");
    const iconoValoracion = document.getElementById("iconoValoracion");
    if (valoracion.textContent >= 4.0) {
        valoracion.setAttribute("class", "text-yellow-500 font-bold");
        iconoValoracion.setAttribute("src", "../../assets/svg/valoracion_top.svg");
    }
}

function crearComponenteProducto(element) {
    const componente = document.createElement("div");
    componente.setAttribute("class", "col-span-1 lg:col-span-1 md:col-span-1 antialiased text-gray-900");
    const imagen = document.createElement("div");
    imagen.setAttribute("class", "w-full rounded-lg shadow-sm border");
    imagen.style.height = "250px";
    imagen.style.backgroundImage = `url('../../img_bbdd/productos/${element['COD_PROD']}.jpg')`;
    imagen.style.backgroundSize = "cover";
    imagen.style.backgroundPosition = "bottom";

    const data = document.createElement("div");
    data.setAttribute("class", "relative px-4 -mt-12");
    const fondoData = document.createElement("div");
    fondoData.setAttribute("class", "bg-white p-5 rounded-lg shadow-lg hover:shadow-2xl duration-300 flex flex-col justify-between")

    const denominacion = document.createElement("p");
    denominacion.setAttribute("class", "font-bold mb-1");
    denominacion.textContent = element['DEN_PROD'];
    fondoData.appendChild(denominacion);


    const zonaInferior = document.createElement("div");
    zonaInferior.setAttribute("class", "flex justify-between gap-3 items-center mt-1");

    const precio = document.createElement("h4");
    precio.setAttribute("class", "font-semibold");
    precio.textContent = `${element['PU_PROD']} €`;
    zonaInferior.appendChild(precio);

    const boton = document.createElement("button");
    boton.setAttribute("class", "duration-300 text-white flex items-center justify-center bg-indigo-700 rounded-md hover:bg-indigo-800 w-10 h-10 text-xl");
    //boton.setAttribute("onclick", "addProducto(" + element['COD_PROD'] + "," + element['PU_PROD'] + ",'" + element['DEN_PROD'] + "','" + razSoc.value + ")");
    boton.setAttribute("onclick", `addProducto(${element['COD_PROD']}, ${element['PU_PROD']}, '${element['DEN_PROD']}', '${razSoc.value}')`);
    const imgBtn = document.createElement("img");
    imgBtn.setAttribute("alt", "+");
    imgBtn.setAttribute("src", "../../assets/svg/agregar.svg");
    boton.appendChild(imgBtn);
    zonaInferior.appendChild(boton);

    fondoData.appendChild(denominacion);
    fondoData.appendChild(zonaInferior);
    data.appendChild(fondoData);
    componente.appendChild(imagen);
    componente.appendChild(data);

    return componente;
}

function crearComponenteSinResultados() {
    const p = document.createElement("p");
    p.textContent = "No se han encontrado productos para esta tienda 😢";
    p.setAttribute("class", "col-span-4");
    p.style.textAlign = "center";

    return p;
}

function mostrarMapa() {
    let marker;

    let map = L.map('map').setView([40.314224, -3.7038], 16)

    //Agregar tilelAyer mapa base desde openstreetmap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap for DailyGo</a> contributors'
    }).addTo(map);

    

        let coordenadas = coords.value.split(",");
        map.flyTo(coordenadas, 16);
        
        const lat = coordenadas[0];
        const lng = coordenadas[1];


        // Eliminar cualquier marcador anterior
        if (marker) {
            map.removeLayer(marker);
        }

        // Crear un marcador y agregarlo al mapa
        marker = L.marker([lat, lng]).addTo(map);

        // Centrar el mapa en la ubicación seleccionada
        map.flyTo([lat, lng], 16);

        const chincheta = document.querySelectorAll(".leaflet-marker-pane")[0];
        const imagen = chincheta.childNodes[0];
        imagen.setAttribute("src", `../../img_bbdd/proveedores/${cifProv.value}.jpg`);
        imagen.setAttribute("id", "img_chincheta");
}
document.addEventListener("DOMContentLoaded", iniciarGestion);

function iniciarGestion() {
    verPedido();
    mostrarDatos();
    document.getElementById("btnActualizar").addEventListener("click", verPedido);
}

function mostrarDatos() {
    const zonaBtn = document.getElementById("zonaBtn");
    const estadoRider = localStorage.getItem("estado");
    const msgEstado = document.getElementById("msgEstado");
    const datosRider = document.getElementById("datosRider");
    datosRider.textContent = `${localStorage.getItem("nombre")}`
    msgEstado.textContent = estadoRider;
    if (estadoRider == "Disponible") {
        const listadoEntregar = document.getElementById("listadoEntregar");
        listadoEntregar.innerHTML = "<div class='flex flex-col justify-center items-center gap-10 text-lg'><img src='../../assets/svg/rider_ilust.svg'><p class='text-center'>Todavía no hemos encontrado ningún pedido para ti ¡No tardarán en llegar! 😀</p></div>";
        msgEstado.setAttribute("class", "px-3 py-1 mb-2 w-fit flex items-center rounded-full bg-green-600 text-white text-xs");
        zonaBtn.innerHTML = `<button class="duration-300 hover:bg-indigo-700 w-fit px-3 py-1 bg-indigo-600 font-semibold text-white rounded-md" onclick="actualizarDisponibilidad(\'No Disponible\')"> Cambiar a No Disponible </button>`;
    } else if (estadoRider == "Ocupado") {
        msgEstado.setAttribute("class", "px-3 py-1 mb-2 w-fit flex items-center rounded-full bg-orange-600 text-white text-xs");
        zonaBtn.innerHTML = "";
    } else if (estadoRider == "No Disponible") {
        const listadoEntregar = document.getElementById("listadoEntregar");
        listadoEntregar.innerHTML = "<div class='flex flex-col justify-center items-center gap-10 text-lg'><img src='../../assets/svg/rider_ilust.svg'><p class='text-center'>⚠️ Debes estar 'Disponible' para empezar a entregar pedidos</p></div>";
        msgEstado.setAttribute("class", "px-3 py-1 mb-2 w-fit flex items-center rounded-full bg-red-600 text-white text-xs");
        zonaBtn.innerHTML = `<button class="duration-300 hover:bg-indigo-700 w-fit px-3 py-1 bg-indigo-600 font-semibold text-white rounded-md" onclick="actualizarDisponibilidad(\'Disponible\')"> Cambiar a Disponible </button>`;
    }
}

function actualizarDisponibilidad(estado) {
    if (localStorage.getItem("estado") == "Ocupado") {
        verPedido();
        return false;
    }

    const datos = {
        dni: localStorage.getItem("dni"),
        estado: estado
    }

    fetch("../../php/riders/modificar_disponibilidad.php", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.text())
        .then(data => {
            if (data == "Actualizado") {
                localStorage.setItem("estado", estado);
                if (estado == "No disponible") {
                    const listadoEntregar = document.getElementById("listadoEntregar");
                    listadoEntregar.innerHTML = "<div class='flex flex-col justify-center items-center gap-10 text-lg'><img src='../../assets/svg/rider_ilust.svg'><p class='text-center'>⚠️ Debes estar 'Disponible' para empezar a entregar pedidos</p></div>"
                }
                mostrarDatos();
            } else {
                console.log(data);
            }
        })
        .catch(error => {
            console.error("Error: No se ha podido obtener los datos de todas las tiendas -> ", error);
        });
}

function verPedido() {
    if (localStorage.getItem("estado") == "No Disponible") {
        return false;
    }
    const datos = {
        dni: localStorage.getItem("dni")
    }

    fetch("../../php/riders/ver_pedido_activo.php", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            const listadoEntregar = document.getElementById("listadoEntregar");
            listadoEntregar.innerHTML = "";
            if (data.length == 1 && data.msg == undefined) {
                localStorage.setItem("estado", "Ocupado");
                listadoEntregar.appendChild(crearComponentePedido(data[0]));
                mostrarMapa();
                mostrarDatos();
            } else {
                console.log(data);
                listadoEntregar.innerHTML = "<div class='flex flex-col justify-center items-center gap-10 text-lg'><img src='../../assets/svg/rider_ilust.svg'><p class='text-center'>Todavía no hemos encontrado ningún pedido para ti ¡No tardarán en llegar! 😀</p></div>";
            }
        })
        .catch(error => {
            console.error("Error: No se ha podido obtener los datos de todas las tiendas -> ", error);
        });
}

function modificarEstado(id, estado) {
    const datos = {
        id: id,
        estado: estado,
        dni: localStorage.getItem("dni")
    }

    fetch("../../php/riders/actualizar_pedido.php", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.text())
        .then(data => {
            console.log(data);
            if(data == "Actualizado"){
                console.log(data);
                verPedido();
            }else if(data == "Finalizado"){
                localStorage.setItem("estado", "Disponible");
                mostrarDatos();
                verPedido();
            }
            mostrarDatos();
        })
        .catch(error => {
            console.error("Error: No se ha podido obtener los datos de todas las tiendas -> ", error);
        });
}

function crearComponentePedido(element) {
    console.log(element);
    const componente = document.createElement("div");
    componente.setAttribute("class", "w-full");

    const superior = document.createElement("div");
    superior.setAttribute("class", "w-full");
    if (element['estado_ven'] == "En preparación") {
        superior.innerHTML = `
        <hr class='my-5'>
        <div class='flex flex-wrap justify-between gap-3'>
            <div class='flex flex-wrap gap-3 items-center'>
                <h4 class='font-bold'>Pedido nº${element['num_ven']}</h4>
                <small class="w-fit bg-yellow-200 text-yellow-600 py-0.5 px-2.5 rounded-full">${element['estado_ven']}</small>
            </div>
        </div>
        <div class="flex flex-wrap my-3 text-indigo-700 gap-5 text-sm">
            <div class="flex gap-2 items-center"><img src="../../assets/svg/inicio_registro/proveedor.svg" class="w-4"> ${element['dir_prov']} (${element['razsoc']})</div>
            <div class="flex gap-2 items-center"><img src="../../assets/svg/inicio_registro/usuario.svg" class="w-4"> ${element['dir_ven']} (${element['nom_cli']} ${element['ape_cli']})</div>
        </div>
        <p class='bg-blue-100/25 w-fit p-2 rounded mt-4'>
        <b>Mensaje:</b> ${element['com_ven']}
        </p>
    `;
    } else if (element['estado_ven'] == "Preparado") {
        superior.innerHTML = `
        <hr class='my-5'>
        <div class='flex flex-wrap justify-between gap-3'>
            <div class='flex flex-wrap gap-3 items-center'>
                <h4 class='font-bold'>Pedido nº${element['num_ven']}</h4>
                <small class="w-fit bg-green-200 text-green-600 py-0.5 px-2.5 rounded-full">${element['estado_ven']}</small>
            </div>
            <button class="lg:w-fit md:w-fit w-full duration-300 hover:bg-indigo-700 px-3 py-2 bg-indigo-600 font-semibold text-white rounded-md" onclick="modificarEstado(${element['num_ven']}, 'En camino')">Confirmar recogida</button>
        </div>
        <div class="flex flex-wrap my-3 text-indigo-700 gap-5 text-sm">
            <div class="flex gap-2 items-center"><img src="../../assets/svg/inicio_registro/proveedor.svg" class="w-4"> ${element['dir_prov']} (${element['razsoc']})</div>
            <div class="flex gap-2 items-center"><img src="../../assets/svg/inicio_registro/usuario.svg" class="w-4"> ${element['dir_ven']} (${element['nom_cli']} ${element['ape_cli']})</div>
        </div>
        <p class='bg-blue-100/25 w-fit p-2 rounded mt-4'>
        <b>Mensaje:</b> ${element['com_ven']}
        </p>
    `;
    } else if (element['estado_ven'] == "En camino") {
        superior.innerHTML = `
        <hr class='my-5'>
        <div class='flex flex-wrap justify-between gap-3'>
            <div class='flex flex-wrap gap-3 items-center'>
                <h4 class='font-bold'>Pedido nº${element['num_ven']}</h4>
                <small class="w-fit bg-green-200 text-green-600 py-0.5 px-2.5 rounded-full">${element['estado_ven']}</small>
            </div>
            <button class="lg:w-fit md:w-fit w-full duration-300 hover:bg-indigo-700 px-3 py-2 bg-indigo-600 font-semibold text-white rounded-md" onclick="modificarEstado(${element['num_ven']}, 'Completado')">Confirmar entrega</button>
        </div>
        <div class="flex flex-wrap my-3 text-indigo-700 gap-5 text-sm">
            <div class="flex gap-2 items-center"><img src="../../assets/svg/inicio_registro/proveedor.svg" class="w-4"> ${element['dir_prov']} (${element['razsoc']})</div>
            <div class="flex gap-2 items-center"><img src="../../assets/svg/inicio_registro/usuario.svg" class="w-4"> ${element['dir_ven']} (${element['nom_cli']} ${element['ape_cli']})</div>
        </div>
        <p class='bg-blue-100/25 w-fit p-2 rounded mt-4'>
        <b>Mensaje:</b> ${element['com_ven']}
        </p>
    `;
    }

    componente.appendChild(superior);

    const mapaTienda = document.createElement("div");
    mapaTienda.innerHTML = `
    <input type='hidden' id='coords' value='${element['coordenadas']}'>
    <input type='hidden' id='cifProv' value='${element['cif_prov']}'>
    <div id="map" style='width:100% !important; height:350px !important' class="mt-5 leaflet-container leaflet-touch leaflet-fade-anim leaflet-grab leaflet-touch-drag leaflet-touch-zoom" tabindex="0" style="position: relative;"></div>
    `;
    componente.appendChild(mapaTienda);
    return componente;
}

function mostrarMapa() {
    let marker;

    let map = L.map('map').setView([40.314224, -3.7038], 16);

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
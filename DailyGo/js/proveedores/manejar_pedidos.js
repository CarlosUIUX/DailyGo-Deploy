document.addEventListener('DOMContentLoaded', iniciarProveedor);

const btnActualizar = document.getElementById("btnActualizar");


function iniciarProveedor() {
    personalizarUI();
    mostrarPedidos();
    btnActualizar.addEventListener("click", () => {
        mostrarPedidos();
    });
}

function personalizarUI() {
    try {
        // Imagen de fondo
        const hero = document.getElementById("hero-proveedor");
        const cif = localStorage.getItem("cif");
        hero.style.backgroundImage = `linear-gradient(to bottom, rgba(16, 14, 52, 0.2), rgba(16, 14, 52, 0.9)), url('../../img_bbdd/fondos/${cif}.jpg')`;
        hero.style.backgroundSize = "cover";
        hero.style.backgroundPosition = "center";
        // Nombre proveedor - razón social
        const razonProv = document.getElementById("razonProv");
        razonProv.innerHTML = localStorage.getItem("razonSocial");
        //Logo
        const logo = document.getElementById("logoProveedor");
        logo.style.backgroundImage = `url('../../img_bbdd/proveedores/${cif}.jpg')`;
        logo.style.backgroundSize = "cover";
        logo.style.backgroundPosition = "center";
    } catch (e) {
        console.log("Sin imágenes");
    }
}

function actualizarEstado(idPedido, estado) {
    const datos = {
        id: idPedido,
        estado: estado
    }
    fetch("../../php/global/actualizar_pedido.php", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.text())
        .then(data => {
            if (data == "Actualizado") {
                mostrarPedidos();
            }
        })
        .catch(error => {
            console.error("Error: No se ha podido crear la petición ->", error);
        });
}

function crearComponenteSolicitud(element) {
    const componete = document.createElement("div");
    componete.setAttribute("class", "bg-white border rounded-lg p-5");

    const superior = document.createElement("div");
    superior.setAttribute("class", "flex gap-3 justify-content-between");

    const div = document.createElement("div");
    div.setAttribute("class", "flex gap-2 items-center justify-between flex-wrap");

    const id = document.createElement("h4");
    id.textContent = `Pedido nº${element['num_ven']}`;
    id.setAttribute("class", "font-bold");
    div.appendChild(id);

    const estado = document.createElement("small");
    estado.textContent = element['estado_ven'];
    switch (element['estado_ven']) {
        case "En preparación":
            estado.setAttribute("class", "w-fit bg-yellow-200 text-yellow-600 py-0.5 px-2.5 rounded-full")
            break;
        case "Cancelado":
            estado.setAttribute("class", "w-fit bg-red-200 text-red-600 py-0.5 px-2.5 rounded-full")
            break;
        case "Preparado":
            estado.setAttribute("class", "w-fit bg-yellow-200 text-yellow-600 py-0.5 px-2.5 rounded-full")
            break;
        case "En reparto":
            estado.setAttribute("class", "w-fit bg-yellow-200 text-yellow-600 py-0.5 px-2.5 rounded-full");
            break;
        case "Entregado":
            estado.setAttribute("class", "w-fit bg-green-200 text-green-600 py-0.5 px-2.5 rounded-full");
            break;
        case "Valorado":
            estado.setAttribute("class", "w-fit bg-green-200 text-green-600 py-0.5 px-2.5 rounded-full");
            break;
        default:
            estado.setAttribute("class", "w-fit bg-yellow-200 text-yellow-600 py-0.5 px-2.5 rounded-full");
            break;
    }
    div.appendChild(estado);
    componete.appendChild(div);

    const extra = document.createElement("div");
    let rider = "";
    if (element['nom_rid'] == "Temporal") {
        rider = "(En espera)";
    } else {
        rider = element['nom_rid'];
    }
    extra.setAttribute("class", "flex my-3 text-indigo-700 gap-5 text-sm");
    extra.innerHTML = `
    <div class='flex gap-2 items-center'><img src='../../assets/svg/inicio_registro/rider.svg' class='w-4'> ${rider}</div>
    `;
    componete.appendChild(extra);

    const listadoProd = document.createElement("div");
    listadoProd.setAttribute("class", "flex flex-col gap-3 mt-8");
    element['carro'].forEach(prod => {
        listadoProd.innerHTML += `
            <div class='flex flex-wrap items-center justify-between w-full border rounded p-3 gap-5'>
                <div class='flex items-center justify-center gap-3'>
                    <div class="w-12 h-12 rounded border" style="background-image: url('../../img_bbdd/productos/${prod['cod_prod']}.jpg'); background-size: cover; background-position: center bottom;">
                    </div>
                    <p class='font-semibold'>${prod['den_prod']}</p>
                </div>
                <p>${prod['cant_det']} uds.</p>
            <div>
            `;
    });
    componete.appendChild(listadoProd);

    const info = document.createElement("div");
    info.innerHTML = `
    <hr class='w-full my-3'>
    <p class='mb-5 text-sm w-full rounded-md p-3 bg-blue-100/40'><b>Mensaje:</b> ${element['com_ven']}</p>
    `
    componete.appendChild(info);

    if (element['estado_ven'] == "Creado") {
        const btnValorar = document.createElement("div");
        btnValorar.setAttribute("class", "w-full flex flex-wrap justify-center items-center mt-5 gap-2");
        btnValorar.innerHTML = `
        <button onclick="modificarEstado(${element['num_ven']}, 'En preparación')" class="w-full duration-300 text-white bg-green-500 rounded-md font-semibold hover:bg-green-600 py-2 px-3 cursor-pointer">Aceptar</button>
        <button onclick="modificarEstado(${element['num_ven']}, 'Cancelado')" class="w-full duration-300 text-white bg-red-500 rounded-md font-semibold hover:bg-red-600 py-2 px-3 cursor-pointer">Cancelar</button>
        `;
        componete.appendChild(btnValorar);
    } else if (element['estado_ven'] == "En preparación") {
        const btnValorar = document.createElement("div");
        btnValorar.setAttribute("class", "w-full flex justify-center items-center flex-col");
        btnValorar.innerHTML = `
        <button onclick="modificarEstado(${element['num_ven']}, 'Preparado')" class="w-full duration-300 text-white bg-indigo-700 rounded-md font-semibold hover:bg-indigo-800 py-2 px-3 cursor-pointer">Pedido preparado</button>
        `;
        componete.appendChild(btnValorar);
    }

    return componete;
}



function mostrarPedidos() {
    const datos = {
        cif: localStorage.getItem('cif')
    }
    fetch("../../php/proveedores/peticiones_pedidos.php", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            const listadoPeticiones = document.getElementById("listadoPeticiones");
            const listadoPendientes = document.getElementById("listadoPendientes");
            listadoPeticiones.innerHTML = "";
            listadoPendientes.innerHTML = "";
            if (data.msg != "Sin resultados") {
                let existePet = false;
                let existePen = false;

                data.forEach(element => {
                    if (element['estado_ven'] == 'Creado') {
                        listadoPeticiones.appendChild(crearComponenteSolicitud(element));
                        existePet = true;
                    } else {
                        listadoPendientes.appendChild(crearComponenteSolicitud(element));
                        existePen = true;
                    }
                });

                if (!existePet) {
                    listadoPeticiones.innerHTML = "(No hay ningún pedido ¡Ya llegarán! 😀)";
                }

                if (!existePen) {
                    listadoPendientes.innerHTML = "(No hay pedidos pendientes por realizar)";
                }
            }else{
                listadoPeticiones.innerHTML = "(No hay ningún pedido ¡Ya llegarán! 😀)";
                listadoPendientes.innerHTML = "(No hay pedidos pendientes por realizar)";
            }
        })
        .catch(error => {
            console.error("Error: No se ha podido crear la petición ->", error);
        });
}


function modificarEstado(idPedido, estado) {
    const datos = {
        id: idPedido,
        estado: estado
    }
    fetch("../../php/global/actualizar_pedido.php", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.text())
        .then(data => {
            if (data == "Actualizado") {
                mostrarPedidos();
            } else {
                mostrarPedidos();
                console.log(data);
            }
        })
        .catch(error => {
            console.error("Error: No se ha podido crear la petición ->", error);
        });
}
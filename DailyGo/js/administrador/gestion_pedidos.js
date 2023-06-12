document.addEventListener('DOMContentLoaded', iniciarPedidos);

const listadoPedidos = document.getElementById("listadoPedidos");
const tipo = document.getElementById("tipo");
const buscar = document.getElementById("buscar");
const fecha = document.getElementById("fecha");
const ocultarPedido = document.getElementById("ocultarPedido");
const verProductos = document.getElementById("verProductos");
const limpiarCampos = document.getElementById("limpiarCampos");

function iniciarPedidos() {
    listarPedidos();
    ocultarPedido.addEventListener("click", cerrarFicha);
    tipo.addEventListener("change", cambiarFiltro);
    fecha.addEventListener("change", listarPedidos);
    buscar.addEventListener("input", listarPedidos);
    limpiarCampos.addEventListener("click", limpiarFiltrado)
}


function limpiarFiltrado(){
    buscar.value = ""
    fecha.value = ""
    listarPedidos();
}

function verFicha(id, cliente, rider, proveedor, fecha, direccion, estado, mensaje) {
    
    verProductos.setAttribute("class", "");

    const docPedido = document.getElementById("docPedido");
    docPedido.textContent = `Pedido #${id}`;
    const docProveedor = document.getElementById("docProveedor");
    docProveedor.textContent = proveedor;
    const docRider = document.getElementById("docRider");
    docRider.textContent = rider;
    const docCliente = document.getElementById("docCliente");
    docCliente.textContent = cliente;
    const docDireccion = document.getElementById("docDireccion");
    docDireccion.textContent = `${direccion} | ${fecha}`;
    const docMensaje = document.getElementById("docMensaje");
    docMensaje.textContent = mensaje;

    const docEstado = document.getElementById("docEstado");
    docEstado.textContent = estado;

    if (estado == "Completado" || estado == "Valorado") {
        docEstado.setAttribute("class", "text-sm bg-green-200 text-green-600 py-0.5 px-2.5 rounded-full");
    } else if (estado == "Cancelado") {
        docEstado.setAttribute("class", "text-sm bg-red-200 text-red-600 py-0.5 px-2.5 rounded-full");
    } else {
        docEstado.setAttribute("class", "text-sm bg-yellow-200 text-yellow-600 py-0.5 px-2.5 rounded-full");
    }

    const datos = {
        id: id
    }

    fetch("../../php/admin/ficha_productos.php", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            const docCarrito = document.getElementById("docCarrito");
            docCarrito.innerHTML = "";
            data.forEach(element => {
                docCarrito.innerHTML += `
                <div class="border p-3 rounded flex items-center gap-3">
                <div class="border border-blue-400 rounded-md w-12 h-12" style="background-image: url('../../img_bbdd/productos/${element.COD_PROD}.jpg');
                background-position: center;
                background-size: cover;">
                </div>
                <div class="flex flex-col text-sm">
                    <p>${element.DEN_PROD}</p>
                    <p class="text-blue-300">${element.CANT_DET} uds.</p>
                </div>
            </div>
                `;
            });
        })
        .catch(error => {
            console.error("Error: No se ha podido crear la petición ->", error);
        });
}

function cerrarFicha() {
    verProductos.setAttribute("class", "hidden");
}

function borrarPedido(id) {
    const datos = {
        id: id
    }

    fetch("../../php/admin/borrar_pedido.php", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.text())
        .then(data => {
            if (data == "Borrado") {
                listarPedidos();
            } else {
                console.log(data.msg);
            }
        })
        .catch(error => {
            console.error("Error: No se ha podido crear la petición ->", error);
        });
}

function cambiarFiltro() {
    if (tipo.value == "cliente") {
        buscar.setAttribute("placeholder", "Buscar por correo del cliente");
    } else if (tipo.value == "rider") {
        buscar.setAttribute("placeholder", "Buscar por correo del rider");
    } else if (tipo.value == "proveedor") {
        buscar.setAttribute("placeholder", "Buscar por razón social del proveeedor");
    }
}

function listarPedidos() {

    let valorFecha = "";
    if (fecha.value == "") {
        valorFecha = "";
    } else {
        const fechaTipo = new Date(fecha.value);
        valorFecha = `${fechaTipo.getDate().toString().padStart(2, '0')}-${(fechaTipo.getMonth() + 1).toString().padStart(2, '0')}-${fechaTipo.getFullYear()}`;
    }

    const datos = {
        buscar: buscar.value,
        tipo: tipo.value,
        fecha: valorFecha
    }

    console.log(datos);

    fetch("../../php/admin/listar_pedidos.php", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            listadoPedidos.innerHTML = "";
            if (data.msg == undefined) {
                data.forEach(element => {
                    listadoPedidos.appendChild(crearFila(element));
                });
            }

        })
        .catch(error => {
            console.error("Error: No se ha podido crear la petición ->", error);
        });
}

function crearFila(element) {
    const fila = document.createElement("tr");

    const id = document.createElement("td");
    id.setAttribute("class", "px-5 py-3 font-bold");
    id.textContent = element.NUM_VEN;
    fila.appendChild(id);

    const cliente = document.createElement("td");
    cliente.setAttribute("class", "px-5 py-3 text-sm");
    cliente.innerHTML = `
        <p>${element.NOM_CLI} ${element.APE_CLI}</p>
        <p class='text-blue-300'>${element.MAIL_CLI}</p>
    `;
    fila.appendChild(cliente);

    const rider = document.createElement("td");
    rider.setAttribute("class", "px-5 py-3 text-sm");
    rider.innerHTML = `
        <p>${element.NOM_RID} ${element.APE_RID}</p>
        <p class='text-blue-300'>${element.MAIL_RID}</p>
    `;
    fila.appendChild(rider);

    const proveedor = document.createElement("td");
    proveedor.setAttribute("class", "px-5 py-3 text-sm");
    proveedor.textContent = element.RAZSOC;
    fila.appendChild(proveedor);

    const fecha = document.createElement("td");
    fecha.setAttribute("class", "px-5 py-3 text-sm");
    fecha.textContent = element.FECH_VEN;
    fila.appendChild(fecha);

    const estado = document.createElement("td");
    estado.setAttribute("class", "px-5 py-3 text-sm");
    estado.textContent = element.ESTADO_VEN;
    fila.appendChild(estado);

    const accion = document.createElement("td");
    accion.setAttribute("class", "px-5 py-5 text-sm flex gap-3");
    accion.innerHTML = `
        <button class='text-white pl-1.5 pb-2 duration-300 bg-indigo-600 pt-2 w-5 h-5 flex justify-center items-center rounded-full hover:bg-indigo-6700 text-sm p-1 text-center' onclick="verFicha(${element.NUM_VEN}, '${element.NOM_CLI} ${element.APE_CLI}','${element.NOM_RID} ${element.APE_RID}','${element.RAZSOC}','${element.FECH_VEN}','${element.DIR_VEN}', '${element.ESTADO_VEN}', '${element.COM_VEN}')">
        <a href='pedidos.html#verProductos'>
        <svg fill="#ffffff" width="15px" height="15px" viewBox="0 -16 544 544" xmlns="http://www.w3.org/2000/svg" ><title>show</title><path d="M272 400Q205 400 151 361 96 322 64 256 96 190 151 151 205 112 272 112 336 112 392 153 448 193 480 256 448 319 392 360 336 400 272 400ZM272 352Q312 352 340 324 368 296 368 256 368 216 340 188 312 160 272 160 232 160 204 188 176 216 176 256 176 296 204 324 232 352 272 352ZM272 312Q249 312 233 296 216 279 216 256 216 233 233 217 249 200 272 200 295 200 312 217 328 233 328 256 328 279 312 296 295 312 272 312Z" /></svg>
        </button>
        </a>
        <button class='text-white pb-2 duration-300 bg-red-500 w-5 h-5 flex justify-center items-center rounded-full hover:bg-red-600 text-sm p-1 text-center' onclick='borrarPedido(${element.NUM_VEN})'>x</button>
    `;
    fila.appendChild(accion);

    return fila;
}
window.addEventListener('DOMContentLoaded', iniciarPedidos);

const fecha = document.getElementById("fecha");

function iniciarPedidos() {
    fecha.addEventListener("change", listarPedidos);
    listarPedidos();
    listarPedidosActivos();
}

function crearComponentePedido(element) {
    const componete = document.createElement("div");
    componete.setAttribute("class", "bg-white border rounded-lg p-5");

    const superior = document.createElement("div");
    superior.setAttribute("class", "flex gap-3 justify-content-between");

    const div = document.createElement("div");
    div.setAttribute("class", "flex gap-4 items-center justify-between flex-wrap");

    const id = document.createElement("h4");
    id.textContent = `Pedido nº${element['num_ven']}`;
    id.setAttribute("class", "font-bold");
    div.appendChild(id);

    const estado = document.createElement("small");
    estado.textContent = element['estado_ven'];
    switch (element['estado_ven']) {
        case "En preparación":
            estado.setAttribute("class", "bg-yellow-200 text-yellow-600 py-0.5 px-2.5 rounded-full")
            break;
        case "Cancelado":
            estado.setAttribute("class", "bg-red-200 text-red-600 py-0.5 px-2.5 rounded-full")
            break;
        case "Preparado":
            estado.setAttribute("class", "bg-yellow-200 text-yellow-600 py-0.5 px-2.5 rounded-full")
            break;
        case "En reparto":
            estado.setAttribute("class", "bg-yellow-200 text-yellow-600 py-0.5 px-2.5 rounded-full");
            break;
        case "Completado":
            estado.setAttribute("class", "bg-green-200 text-green-600 py-0.5 px-2.5 rounded-full");
            break;
        case "Valorado":
            estado.setAttribute("class", "bg-green-200 text-green-600 py-0.5 px-2.5 rounded-full");
            break;
        default:
            estado.setAttribute("class", "bg-yellow-200 text-yellow-600 py-0.5 px-2.5 rounded-full");
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
    extra.setAttribute("class", "flex flex-wrap my-3 text-indigo-700 gap-5 text-sm");
    extra.innerHTML = `
    <div class='flex gap-2 items-center'><img src='../../assets/svg/inicio_registro/proveedor.svg' class='w-4'> ${element['razsoc']}</div>
    <div class='flex gap-2 items-center'><img src='../../assets/svg/inicio_registro/rider.svg' class='w-4'> ${rider}</div>
    `;
    componete.appendChild(extra);

    if (element['estado_ven'] == "Completado") {
        const btnValorar = document.createElement("div");
        btnValorar.setAttribute("class", "w-full flex justify-center items-center flex-col");
        btnValorar.innerHTML = `
            <hr class='border w-full my-3'>
            <p class='text-center mb-5'>¡Se ha entragado tu pedido! ¿Qué nota le pones sobre 5 a este pedido? 🏅</p>
            <div class='flex gap-3 justify-center items-center text-center w-full'>
            <button onclick='valorarPedido(${element['num_ven']}, 1)' class='w-5 h-5 duration-300 rounded-full hover:text-white hover:bg-blue-800 bg-blue-100/20 border p-5 flex items-center justify-center text-center'>1</button>
            <button onclick='valorarPedido(${element['num_ven']}, 2)' class='w-5 h-5 duration-300 rounded-full hover:text-white hover:bg-blue-800 bg-blue-100/20 border p-5 flex items-center justify-center text-center'>2</button>
            <button onclick='valorarPedido(${element['num_ven']}, 3)' class='w-5 h-5 duration-300 rounded-full hover:text-white hover:bg-blue-800 bg-blue-100/20 border p-5 flex items-center justify-center text-center'>3</button>
            <button onclick='valorarPedido(${element['num_ven']}, 4)' class='w-5 h-5 duration-300 rounded-full hover:text-white hover:bg-blue-800 bg-blue-100/20 border p-5 flex items-center justify-center text-center'>4</button>
            <button onclick='valorarPedido(${element['num_ven']}, 5)' class='w-5 h-5 duration-300 rounded-full hover:text-white hover:bg-blue-800 bg-blue-100/20 border p-5 flex items-center justify-center text-center'>5</button>
            </div>
        `;
        componete.appendChild(btnValorar);
    } else {
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
    }

    return componete;
}

function valorarPedido(idPedido, nota) {
    const datos = {
        id: idPedido,
        nota: nota,
        estado: 'Valorado'
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
                listarPedidos();
                listarPedidosActivos();
            }
        })
        .catch(error => {
            console.error("Error: No se ha podido crear la petición ->", error);
        });
}

function crearComponenteFila(element) {
    const fila = document.createElement("tr");
    fila.setAttribute("class", "p-4 text-sm font-medium text-blue-800");

    const id = document.createElement("td");
    id.setAttribute("class", "p-4 text-sm font-medium text-blue-800");
    id.setAttribute("scope", "col");
    id.textContent = element['num_ven'];
    fila.appendChild(id);

    const producto = document.createElement("td");
    producto.setAttribute("class", "p-4 text-sm font-medium text-blue-800");
    producto.setAttribute("scope", "col");
    if(element['cod_prod'] == 0){
        producto.innerHTML = "-";
    }else{
        producto.innerHTML = `
        <div class='flex items-center gap-2'>
            <div class="w-12 h-12 rounded border" style="background-image: url('../../img_bbdd/productos/${element['cod_prod']}.jpg'); background-size: cover; background-position: center bottom;">
            </div>
            <div>
                <p>${element['den_prod']}</p>
                <p class="text-sm font-normal text-blue-300">${element['razsoc']}</p>
            </div>
        </div>
    `;
    }
    
    fila.appendChild(producto);

    const cantidad = document.createElement("td");
    cantidad.setAttribute("class", "p-4 text-sm font-medium text-blue-800");
    cantidad.setAttribute("scope", "col");
    cantidad.textContent = element['cant_det'];
    fila.appendChild(cantidad);

    const direccion = document.createElement("td");
    direccion.setAttribute("class", "p-4 text-sm font-medium text-blue-800");
    direccion.setAttribute("scope", "col");
    direccion.textContent = element['DIR_VEN'];
    fila.appendChild(direccion);

    const fecha = document.createElement("td");
    fecha.setAttribute("class", "p-4 text-sm font-medium text-blue-800");
    fecha.setAttribute("scope", "col");
    fecha.textContent = element['FECH_VEN'];
    fila.appendChild(fecha);

    const estado = document.createElement("td");
    estado.setAttribute("class", "p-4 text-sm font-medium text-blue-800");
    estado.setAttribute("scope", "col");
    estado.textContent = element['ESTADO_VEN'];
    fila.appendChild(estado);

    return fila;
}

// function listarPedidos() {
//     const datos = {
//         'id': localStorage.getItem("id")
//     }
//     fetch("../../php/usuarios/listar_pedidos_usuario.php", {
//         method: "POST",
//         body: JSON.stringify(datos),
//         headers: {
//             "Content-Type": "application/json"
//         }
//     })
//         .then(response => response.json())
//         .then(data => {
//             const historialPedidos = document.getElementById("historialPedidos");
//             data.forEach(element => {
//                 if (element['ESTADO_VEN'] == "Completado" || element['ESTADO_VEN'] == "Valorado") {
//                     historialPedidos.appendChild(crearComponenteFila(element));
//                 }
//             });
//         })
//         .catch(error => {
//             console.error("Error: No se ha podido crear la petición ->", error);
//         });
// }

function listarPedidos() {

    let valorFecha = "";
    if (fecha.value == "") {
        valorFecha = "";
    } else {
        const fechaTipo = new Date(fecha.value);
        valorFecha = `${fechaTipo.getDate().toString().padStart(2, '0')}-${(fechaTipo.getMonth() + 1).toString().padStart(2, '0')}-${fechaTipo.getFullYear()}`;
    }

    const datos = {
        'id': localStorage.getItem("id"),
        fecha: valorFecha
    }
    fetch("../../php/usuarios/listar_pedidos_usuario.php", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            const historialPedidos = document.getElementById("historialPedidos");
            historialPedidos.innerHTML = "";
            data.forEach(element => {
                historialPedidos.appendChild(crearComponenteFila(element));
            });
        })
        .catch(error => {
            console.error("Error: No se ha podido crear la petición ->", error);
        });
}

function listarPedidosActivos() {
    const datos = {
        'id': localStorage.getItem("id")
    }
    fetch("../../php/usuarios/listar_pedidos_activos_usuario.php", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            const pedidosActivos = document.getElementById("pedidosActivos");
            if (data.msg == 'Sin resultados') {
                pedidosActivos.innerHTML = "<p>No tienes pedidos en activo 🛍️</p>"
            } else {
                data.forEach(element => {
                    pedidosActivos.appendChild(crearComponentePedido(element));
                });
            }
        })
        .catch(error => {
            console.error("Error: No se ha podido crear la petición ->", error);
        });
}
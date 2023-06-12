document.addEventListener('DOMContentLoaded', iniciarHistorial);
const fecha = document.getElementById("fecha");
const historialPedidos = document.getElementById("historialPedidos");

function iniciarHistorial() {
    mostrarHistorial();
    fecha.addEventListener("change", mostrarHistorial);
}

function mostrarHistorial() {
    let valorFecha = "";
    if (fecha.value == "") {
        valorFecha = "";
    } else {
        const fechaTipo = new Date(fecha.value);
        valorFecha = `${fechaTipo.getDate().toString().padStart(2, '0')}-${(fechaTipo.getMonth() + 1).toString().padStart(2, '0')}-${fechaTipo.getFullYear()}`;
    }

    const datos = {
        cif: localStorage.getItem("cif"),
        fecha: valorFecha
    }


    fetch("../../php/proveedores/historial_pedidos.php", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            historialPedidos.innerHTML = "";
            if (data.length >= 1 && data.msg != "Sin resultados") {
                data.forEach(element => {
                    historialPedidos.appendChild(crearFila(element));
                });

            } else {
                const vacio = {
                    num_ven: "Sin resultados",
                    cod_prod: "-",
                    den_prod: "-",
                    cant_det: "-",
                    fech_ven: "-",
                    nom_rid: "-",
                    nom_cli: "-",
                    estado_ven: "-"
                };
                historialPedidos.appendChild(crearFila(vacio));
            }
        })
        .catch(error => {
            console.error("Error: -> ", error);
        });
}

function crearFila(data) {

    console.log(data);
    const componente = document.createElement("tr");

    const id = document.createElement("td");
    id.setAttribute("class", "p-4 text-sm font-medium text-blue-800");
    id.setAttribute("scope", "col");
    id.textContent = data['num_ven'];
    componente.appendChild(id);

    const producto = document.createElement("td");
    producto.setAttribute("class", "p-4 text-sm font-medium text-blue-800");
    producto.setAttribute("scope", "col");
    if (data['den_prod'] == "-") {
        producto.innerHTML = data['den_prod'];
    } else {
        producto.innerHTML = `
        <div class='flex items-center gap-2'>
            <div class='w-10 h-10 rounded-md border'
            style='background-image:url(../../img_bbdd/productos/${data['cod_prod']}.jpg); background-size:cover'></div>
            <p>${data['den_prod']}</p>
        </div>
    `;
    }

    componente.appendChild(producto);

    const cantidad = document.createElement("td");
    cantidad.setAttribute("class", "p-4 text-sm font-medium text-blue-800");
    cantidad.setAttribute("scope", "col");
    cantidad.textContent = data['cant_det'];
    componente.appendChild(cantidad);

    const cliente = document.createElement("td");
    cliente.setAttribute("class", "p-4 text-sm font-medium text-blue-800");
    cliente.setAttribute("scope", "col");
    cliente.textContent = data['nom_cli'];
    componente.appendChild(cliente);

    const rider = document.createElement("td");
    rider.setAttribute("class", "p-4 text-sm font-medium text-blue-800");
    rider.setAttribute("scope", "col");
    rider.textContent = data['nom_rid'];
    componente.appendChild(rider);

    const fecha = document.createElement("td");
    fecha.setAttribute("class", "p-4 text-sm font-medium text-blue-800");
    fecha.setAttribute("scope", "col");
    fecha.textContent = data['fech_ven'];
    componente.appendChild(fecha);

    const estado = document.createElement("td");
    estado.setAttribute("class", "p-4 text-sm font-medium text-blue-800");
    estado.setAttribute("scope", "col");
    estado.textContent = data['estado_ven'];
    componente.appendChild(estado);

    return componente;
}
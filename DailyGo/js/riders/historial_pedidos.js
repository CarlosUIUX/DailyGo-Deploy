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
        dni: localStorage.getItem("dni"),
        fecha: valorFecha
    }

    console.log(datos);


    fetch("../../php/riders/historial_pedidos.php", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            historialPedidos.innerHTML = "";
            if (data.length >= 1 && data.msg != "Sin resultados") {
                data.forEach(element => {
                    historialPedidos.appendChild(crearFila(element));
                });

            } else {
                const vacio = {
                    num_ven: "Sin resultados",
                    cif_prov: 0,
                    fech_ven: "-",
                    dir_ven: "-",
                    estado_ven: "-",
                    dir_prov: "-",
                    razsoc: "-"
                };
                historialPedidos.appendChild(crearFila(vacio));
            }
        })
        .catch(error => {
            console.error("Error: No se ha podido obtener los datos de todas las tiendas -> ", error);
        });
}

function crearFila(data) {
    const componente = document.createElement("tr");

    const id = document.createElement("td");
    id.setAttribute("class", "p-4 text-sm font-medium text-blue-800");
    id.setAttribute("scope", "col");
    id.textContent = data['num_ven'];
    componente.appendChild(id);

    const proveedor = document.createElement("td");
    proveedor.setAttribute("class", "p-4 text-sm font-medium text-blue-800");
    proveedor.setAttribute("scope", "col");
    if (data['cif_prov'] == 0) {
        proveedor.innerHTML = `
        <div class='flex items-center gap-2'>
            <p>${data['razsoc']}</p>
        </div>
    `;
    } else {
        proveedor.innerHTML = `
        <div class='flex items-center gap-2'>
            <div class='w-8 h-8 rounded-full border'
            style='background-image:url(../../img_bbdd/proveedores/${data['cif_prov']}.jpg); background-size:cover'></div>
            <p>${data['razsoc']}</p>
        </div>
    `;
    }

    componente.appendChild(proveedor);

    const dirprov = document.createElement("td");
    dirprov.setAttribute("class", "p-4 text-sm font-medium text-blue-800");
    dirprov.setAttribute("scope", "col");
    dirprov.textContent = data['dir_prov'];
    componente.appendChild(dirprov);

    const dirusu = document.createElement("td");
    dirusu.setAttribute("class", "p-4 text-sm font-medium text-blue-800");
    dirusu.setAttribute("scope", "col");
    dirusu.textContent = data['dir_ven'];
    componente.appendChild(dirusu);

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
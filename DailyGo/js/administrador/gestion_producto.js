document.addEventListener("DOMContentLoaded", iniciarProductos);

const buscar = document.getElementById("buscar");
const listadoProductos = document.getElementById("listadoProductos");

function iniciarProductos(){
    listarProductos();
    buscar.addEventListener("input", listarProductos);
}

function borrarProducto(id){
    const datos = {
        id: id
    }

    fetch("../../php/admin/borrar_producto.php", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.text())
        .then(data => {
            if(data == "Borrado"){
                listarProductos();
            }else{
                console.log(data.msg);
            }
        })
        .catch(error => {
            console.error("Error: No se ha podido crear la petición ->", error);
        });
}

function listarProductos(){
    const datos = {
        buscar: buscar.value
    }

    fetch("../../php/admin/listar_productos.php", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            listadoProductos.innerHTML = "";
            if(data.msg == undefined){
                data.forEach(element => {
                    listadoProductos.appendChild(crearFila(element));
                });
            }
            
        })
        .catch(error => {
            console.error("Error: No se ha podido crear la petición ->", error);
        });
}

function crearFila(element){
    const fila = document.createElement("tr");
    
    const id = document.createElement("td");
    id.setAttribute("class", "px-5 py-3 font-bold");
    id.textContent = element.COD_PROD;
    fila.appendChild(id);

    const denom = document.createElement("td");
    denom.setAttribute("class", "px-5 py-3 text-sm");
    denom.textContent = element.DEN_PROD;
    fila.appendChild(denom);

    const proveedor = document.createElement("td");
    proveedor.setAttribute("class", "px-5 py-3 text-sm");
    proveedor.innerHTML = element.RAZSOC;
    fila.appendChild(proveedor);

    const precio = document.createElement("td");
    precio.setAttribute("class", "px-5 py-3 text-sm");
    precio.textContent = `${element['PU_PROD']} €`;
    fila.appendChild(precio);

    const accion = document.createElement("td");
    accion.setAttribute("class", "px-5 py-3 text-sm");
    accion.innerHTML = `
        <button class='text-white pb-2 duration-300 bg-red-500 w-5 h-5 flex justify-center items-center rounded-full hover:bg-red-600 text-sm p-1 text-center' onclick='borrarProducto(${element.COD_PROD})'>x</button>
    `;
    fila.appendChild(accion);

    return fila;
}
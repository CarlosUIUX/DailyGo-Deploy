document.addEventListener("DOMContentLoaded", iniciarProveedores);

const buscar = document.getElementById("buscar");
const listadoClientes = document.getElementById("listadoProveeores");

function iniciarProveedores(){
    listarProveedores();
    buscar.addEventListener("input", listarProveedores);
}

function borrarProveedor(id){
    const datos = {
        id: id
    }

    fetch("../../php/admin/borrar_proveedor.php", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.text())
        .then(data => {
            if(data == "Borrado"){
                listarProveedores();
            }else{
                console.log(data.msg);
            }
        })
        .catch(error => {
            console.error("Error: No se ha podido crear la petición ->", error);
        });
}

function listarProveedores(){
    const datos = {
        buscar: buscar.value
    }

    fetch("../../php/admin/listar_proveedores.php", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            listadoProveedores.innerHTML = "";
            if(data.msg == undefined){
                data.forEach(element => {
                    listadoProveedores.appendChild(crearFila(element));
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
    id.textContent = element.CIF_PROV;
    fila.appendChild(id);

    const raz = document.createElement("td");
    raz.setAttribute("class", "px-5 py-3 text-sm");
    raz.innerHTML = `<p>${element.RAZSOC}</p><p class='text-xs text-blue-300'>${element.CATEGORIA}</p>`;
    fila.appendChild(raz);

    const direccion = document.createElement("td");
    direccion.setAttribute("class", "px-5 py-3 text-sm");
    direccion.textContent = element.DIR_PROV;
    fila.appendChild(direccion);

    const telefono = document.createElement("td");
    telefono.setAttribute("class", "px-5 py-3 text-sm");
    telefono.textContent = element.TLF_PROV;
    fila.appendChild(telefono);

    const mail = document.createElement("td");
    mail.setAttribute("class", "px-5 py-3 text-sm");
    mail.textContent = element.MAIL_PROV;
    fila.appendChild(mail);

    const accion = document.createElement("td");
    accion.setAttribute("class", "px-5 text-sm flex gap-2 pt-5");
    accion.innerHTML = `
        <form action='modificar_proveedor.php' method='post'>
            <input type='hidden' name='cif' value='${element.CIF_PROV}'>
            <input type='hidden' name='razon' value='${element.RAZSOC}'>
            <input type='hidden' name='direccion' value='${element.DIR_PROV}'>
            <input type='hidden' name='telefono' value='${element.TLF_PROV}'>
            <input type='hidden' name='mail' value='${element.MAIL_PROV}'>
            <input type='hidden' name='categoria' value='${element.CATEGORIA}'>
            <button type='submit' class='text-white duration-300 bg-yellow-500 w-5 h-5 flex justify-center items-center rounded-full hover:bg-yellow-600 text-sm p-1 text-center''>
                <img src='../../assets/svg/modificar.svg'>
            </button>
        </form>
        <button class='text-white pb-3 duration-300 bg-red-500 w-5 h-5 flex justify-center items-center rounded-full hover:bg-red-600 text-sm p-2 text-center' onclick="borrarProveedor('${element.CIF_PROV}')">x</button>
    `;
    fila.appendChild(accion);

    return fila;
}
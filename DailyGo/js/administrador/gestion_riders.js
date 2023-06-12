document.addEventListener("DOMContentLoaded", iniciarRiders);

const buscar = document.getElementById("buscar");
const listadoRiders = document.getElementById("listadoRiders");

function iniciarRiders(){
    listarRiders();
    buscar.addEventListener("input", listarRiders);
}

function borrarRider(id){
    const datos = {
        id: id
    }

    fetch("../../php/admin/borrar_rider.php", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.text())
        .then(data => {
            if(data == "Borrado"){
                listarRiders();
            }else{
                console.log(data.msg);
            }
        })
        .catch(error => {
            console.error("Error: No se ha podido crear la petición ->", error);
        });
}

function listarRiders(){
    const datos = {
        buscar: buscar.value
    }

    fetch("../../php/admin/listar_riders.php", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            listadoRiders.innerHTML = "";
            if(data.msg == undefined){
                data.forEach(element => {
                    listadoRiders.appendChild(crearFila(element));
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
    id.textContent = element.DNI_RID;
    fila.appendChild(id);

    const nombre = document.createElement("td");
    nombre.setAttribute("class", "px-5 py-3 text-sm");
    nombre.textContent = element.NOM_RID+" "+element.APE_RID;
    fila.appendChild(nombre);

    const telefono = document.createElement("td");
    telefono.setAttribute("class", "px-5 py-3 text-sm");
    telefono.innerHTML = element.TLF_RID;
    fila.appendChild(telefono);

    const mail = document.createElement("td");
    mail.setAttribute("class", "px-5 py-3 text-sm");
    mail.textContent = element.MAIL_RID;
    fila.appendChild(mail);

    const accion = document.createElement("td");
    accion.setAttribute("class", "px-5 text-sm flex gap-2 lg:pt-3 mb:pt-3 pt-8");
    accion.innerHTML = `
        <form action='modificar_rider.php' method='post'>
            <input type='hidden' name='dni' value='${element.DNI_RID}'>
            <input type='hidden' name='nombre' value='${element.NOM_RID}'>
            <input type='hidden' name='apellidos' value='${element.APE_RID}'>
            <input type='hidden' name='telefono' value='${element.TLF_RID}'>
            <input type='hidden' name='mail' value='${element.MAIL_RID}'>
            <button type='submit' class='text-white duration-300 bg-yellow-500 w-5 h-5 flex justify-center items-center rounded-full hover:bg-yellow-600 text-sm p-1 text-center''>
                <img src='../../assets/svg/modificar.svg'>
            </button>
        </form>
        <button class='text-white pb-3 duration-300 bg-red-500 w-5 h-5 flex justify-center items-center rounded-full hover:bg-red-600 text-sm p-2 text-center' onclick="borrarRider('${element.DNI_RID}')">x</button>
    `;
    fila.appendChild(accion);

    return fila;
}
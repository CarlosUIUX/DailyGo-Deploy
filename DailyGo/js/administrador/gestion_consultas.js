document.addEventListener("DOMContentLoaded", iniciarConsultas);

const listadoConsultas = document.getElementById("listadoConsultas");

function iniciarConsultas(){
    listarConsultas();
}


function listarConsultas(){
    fetch("../../php/admin/listar_consultas.php", {
        method: "POST",
        body: null,
        headers: {
            "Content-Type": "application/json"
        }
    })
        .then(response => response.json())
        .then(data => {
            listadoConsultas.innerHTML = "";
            if(data.msg == undefined){
                data.forEach(element => {
                    listadoConsultas.appendChild(crearFila(element));
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
    id.setAttribute("class", "px-5 py-3 font-bold text-sm");
    id.textContent = element.COD_MEN;
    fila.appendChild(id);

    const usuario = document.createElement("td");
    usuario.setAttribute("class", "px-5 py-3 text-sm");
    usuario.textContent = `${element.NOM_CLI} ${element.APE_CLI}`;
    fila.appendChild(usuario);

    const asunto = document.createElement("td");
    asunto.setAttribute("class", "px-5 py-3 text-sm");
    asunto.innerHTML = element.ASU_MEN;
    fila.appendChild(asunto);

    const mensaje = document.createElement("td");
    mensaje.setAttribute("class", "px-5 py-3 text-sm");
    mensaje.textContent = element.MEN_MEN;
    fila.appendChild(mensaje);

    const accion = document.createElement("td");
    accion.setAttribute("class", "px-5 py-3 text-sm");
    accion.innerHTML = `
        <a href='mailto:${element.MAIL_CLI}?subject=Soporte de técnico DailyGo | Consulta #${element.COD_MEN} | ${element.ASU_MEN}' class='text-white duration-300 bg-indigo-600 flex justify-center items-center rounded hover:bg-indigo-700 text-sm px-2 py-1 text-center'>Responder</a>
    `;
    fila.appendChild(accion);

    return fila;
}
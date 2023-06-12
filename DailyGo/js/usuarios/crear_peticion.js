const asunto = document.getElementById("asunto");
const descripcion = document.getElementById("descripcion");
const btnEnviar = document.getElementById("btnEnviar");

btnEnviar.onclick = function () {
    try {
        validarAsunto();
        validarDescripcion();
        if (validarAsunto() && validarDescripcion()) {
            datos = {
                'id': localStorage.getItem('id'),
                'asunto': asunto.value,
                'descripcion': descripcion.value,
            }
            fetch("../../php/usuarios/enviar_mensaje_usuario.php", {
                method: "POST",
                body: JSON.stringify(datos),
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => {
                    if (!response.ok) {
                        throw new Error('Error en la solicitud');
                    }
                    return response.text();
                })
            .then(data => {
                    const respuestaPeticion = document.getElementById("respuestaPeticion");
                    const avisoPeticon = document.createElement("p");
                    respuestaPeticion.innerHTML = "";
                    console.log(data)
                    if (data == "Creada") {
                        avisoPeticon.setAttribute("class", "w-full text-center rounded text-green-600 bg-green-200 py-2");
                        avisoPeticon.textContent = "Se ha creado correctamente la petición. Revisa el correo para recibir respuesta";
                        respuestaPeticion.appendChild(avisoPeticon);
                    } else {
                        avisoPeticon.setAttribute("class", "w-full text-center rounded text-red-600 bg-red-200 py-2");
                        avisoPeticon.textContent = "No se ha podido crear la petición correctamente. Inténtalo de nuevo.";
                        respuestaPeticion.appendChild(avisoPeticon);
                    }
                })
                .catch(error => {
                    console.error("Error: No se ha podido crear la petición ->", error);
                });
        }
    } catch (e) {
        const respuestaPeticion = document.getElementById("respuestaPeticion");
        const avisoPeticon = document.createElement("p");
        respuestaPeticion.innerHTML = "";
        avisoPeticon.setAttribute("class", "w-full text-center rounded text-red-600 bg-red-200 py-2");
        avisoPeticon.textContent = "No se ha podido crear la petición correctamente. Inténtalo de nuevo.";
        respuestaPeticion.appendChild(avisoPeticon);
        console.log("No se ha podido crear la petición: " + e);
    }

}

function validarAsunto() {
    try {
        const expAsunto = /^[\wñÑÁáÉéÍíÓóÚú.,:;"'¡¿\s]{5,50}$/i;
        const msgAsunto = document.getElementById("msgAsunto");
        if (expAsunto.test(asunto.value)) {
            asunto.setAttribute(
                "class",
                "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgAsunto.setAttribute("class", "hidden");

            return true;
        } else {
            asunto.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgAsunto.setAttribute("class", "flex");

            return false;
        }
    } catch (error) {
        console.log(`No se ha podido validar el asunto: ${error}`);
    }
}

function validarDescripcion() {
    try {
        const msgDescripcion = document.getElementById("msgDescripcion");
        const expDescripcion = /^[\wñÑÁáÉéÍíÓóÚú.,:;"'¡¿\s]{10,200}$/i;

        if (expDescripcion.test(descripcion.value)) {
            descripcion.setAttribute(
                "class",
                "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgDescripcion.setAttribute("class", "hidden");

            return true;
        } else {
            descripcion.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgDescripcion.setAttribute("class", "flex");

            return false;
        }
    } catch (error) {
        console.log(`No se ha podido validar la descripción: ${error}`);
    }
}


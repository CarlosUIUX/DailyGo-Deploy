document.addEventListener('DOMContentLoaded', iniciarPerfil);

const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const telefono = document.getElementById("telefono");
const mail = document.getElementById("mail");
const dni = document.getElementById("dni");

const msgNombre = document.getElementById("msgNombre");
const msgApellidos = document.getElementById("msgApellidos");
const msgTelefono = document.getElementById("msgTelefono");
const msgCorreo = document.getElementById("msgCorreo");
const msgTelefonoExiste = document.getElementById("msgTelefonoExiste");

const correctoDatos = document.getElementById("msgCorrecto");

const btnNombre = document.getElementById("btnNombre");
const btnApellidos = document.getElementById("btnApellidos");
const btnTelefono = document.getElementById("btnTelefono");
const btnMail = document.getElementById("btnMail");

//
let validacionNombre = '';
let validacionApellidos = '';
let validacionCorreo = '';
let validacionTelefono = '';

function iniciarPerfil() {
    nombre.addEventListener("input", validarNombre);
    apellidos.addEventListener("input", validarApellidos);
    telefono.addEventListener("input", validarTelefono);
    mail.addEventListener("input", validarCorreo);

    btnNombre.addEventListener("click", cambiarNombre);
    btnApellidos.addEventListener("click", cambiarApellidos);
    btnTelefono.addEventListener("click", cambiarTelefono);
    btnMail.addEventListener("click", cambiarCorreo);
}

function validarNombre() {
    const expNombre = /^([a-zA-ZáéíóúÁÉÍÓÚñÑüÜñ]{2,20}\s?)+$/;
    if (expNombre.test(nombre.value)) {
        nombre.setAttribute("class", "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        msgNombre.setAttribute("class", "hidden");
        validacionNombre = true;
    } else {
        nombre.setAttribute("class", "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        msgNombre.setAttribute("class", "flex");
        validacionNombre = false;
    }
}

function validarApellidos() {
    const expApellidos = /^([a-zA-ZáéíóúÁÉÍÓÚñÑüÜñ]{2,}\s?-?\s?){1,4}$/;
    if (expApellidos.test(apellidos.value)) {
        apellidos.setAttribute("class", "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        msgApellidos.setAttribute("class", "hidden");
        validacionApellidos = true;
    } else {
        apellidos.setAttribute("class", "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        msgApellidos.setAttribute("class", "flex");
        validacionApellidos = false;
    }
}

function validarTelefono() {
    const expTelefono = /^(6|7|8|9)\d{8}$/;
    if (expTelefono.test(telefono.value)) {
        telefono.setAttribute("class", "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        msgTelefono.setAttribute("class", "hidden");
        msgTelefonoExiste.setAttribute("class", "hidden");
        validacionTelefono = true;
    } else {
        telefono.setAttribute("class", "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        msgTelefono.setAttribute("class", "flex");
        msgTelefonoExiste.setAttribute("class", "hidden");
        validacionTelefono = false;
    }
}

function validarCorreo() {
    const expCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (expCorreo.test(mail.value)) {
        mail.setAttribute("class", "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        msgCorreo.setAttribute("class", "hidden");
        msgCorreoExiste.setAttribute("class", "hidden");
        validacionCorreo = true;

    } else {
        mail.setAttribute("class", "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        msgCorreo.setAttribute("class", "flex");
        msgCorreoExiste.setAttribute("class", "hidden");
        validacionCorreo = false;
    }
}

function actualizarDatos(ruta, datos) {
    fetch(ruta, {
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
            console.log(data)
            switch (data) {
                case "actualizadoNombre":
                    correctoDatos.setAttribute("class", "flex");
                    setTimeout(function () {
                        correctoDatos.setAttribute("class", "hidden");
                    }, 3000);
                    break;
                case "actualizadoApe":
                    correctoDatos.setAttribute("class", "flex");
                    setTimeout(function () {
                        correctoDatos.setAttribute("class", "hidden");
                    }, 3000);
                    break;
                case "actualizadoTel":
                    correctoDatos.setAttribute("class", "flex");
                    setTimeout(function () {
                        correctoDatos.setAttribute("class", "hidden");
                    }, 3000);
                    break;
                case "actualizadoMail":
                    correctoDatos.setAttribute("class", "flex");
                    setTimeout(function () {
                        correctoDatos.setAttribute("class", "hidden");
                    }, 3000);
                    break;
                case "actualizadoContra":
                    correctoContrasena.setAttribute("class", "flex");
                    setTimeout(function () {
                        correctoContrasena.setAttribute("class", "hidden");
                    }, 3000);
                    localStorage.setItem("correo", correo.value);
                    break;
                case "telExiste":
                    telefono.setAttribute("class", "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
                    msgTelefono.setAttribute("class", "hidden");
                    msgTelefonoExiste.setAttribute("class", "flex");
                    setTimeout(function () {
                        correctoDatos.setAttribute("class", "hidden");
                    }, 3000);
                    break;
                case "mailExiste":
                    mail.setAttribute("class", "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
                    msgCorreo.setAttribute("class", "hidden");
                    msgCorreoExiste.setAttribute("class", "flex");
                    setTimeout(function () {
                        correctoDatos.setAttribute("class", "hidden");
                    }, 3000);
                    break;

            }

        })
        .catch(error => {
            console.error("Error: ", error);
            return false;
        });
}

function cambiarNombre() {
    if (validacionNombre) {
        const datos = {
            'nombre': nombre.value,
            'dni': dni.value
        }
        actualizarDatos("../../php/riders/actualizar_datos_riders.php", datos);

    }
}

function cambiarApellidos() {
    if (validacionApellidos) {
        const datos = {
            'apellidos': apellidos.value,
            'dni': dni.value
        }
        actualizarDatos("../../php/riders/actualizar_datos_riders.php", datos);

    }
}

function cambiarTelefono() {
    if (validacionTelefono) {
        const datos = {
            'telefono': telefono.value,
            'dni': dni.value
        }
        actualizarDatos("../../php/riders/actualizar_datos_riders.php", datos);

    }
}

function cambiarCorreo() {
    if (validacionCorreo) {
        const datos = {
            'correo': mail.value,
            'dni': dni.value
        }
        actualizarDatos("../../php/riders/actualizar_datos_riders.php", datos);
    }
}
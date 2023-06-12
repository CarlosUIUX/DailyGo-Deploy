document.addEventListener('DOMContentLoaded', iniciarPerfil);

const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const telefono = document.getElementById("telefono");
const correo = document.getElementById("correo");
const contrasenaActual = document.getElementById("contrasena");
const contrasenaNueva = document.getElementById("contrasenaNueva");

const msgNombre = document.getElementById("msgNombre");
const msgApellidos = document.getElementById("msgApellidos");
const msgTelefono = document.getElementById("msgTelefono");
const msgCorreo = document.getElementById("msgCorreo");
const msgTelefonoExiste = document.getElementById("msgTelefonoExiste");
const msgCorreoExiste = document.getElementById("msgCorreoExiste");
const msgContrasenaNueva = document.getElementById("msgContrasenaNueva");

const correctoDatos = document.getElementById("correctoDatos");
const incorrectoDatos = document.getElementById("incorrectoDatos");

const correctoContrasena = document.getElementById("correctoContrasena");
const incorrectoContrasena = document.getElementById("incorrectoContrasena");

const btnNombre = document.getElementById("btnNombre");
const btnApellidos = document.getElementById("btnApellidos");
const btnTelefono = document.getElementById("btnTelefono");
const btnCorreo = document.getElementById("btnCorreo");
const btnContrasena = document.getElementById("btnContrasena");

//
let validacionNombre = '';
let validacionApellidos = '';
let validacionCorreo = '';
let validacionTelefono = '';
let validacionContrasenhaAntigua = '';
let validacionContrasenhaNueva = '';
let resNombre = '';

function iniciarPerfil() {
    mostrarDatos();
    nombre.addEventListener("input", validarNombre);
    apellidos.addEventListener("input", validarApellidos);
    telefono.addEventListener("input", validarTelefono);
    correo.addEventListener("input", validarCorreo);
    contrasenaNueva.addEventListener("input", validarContrasena);

    btnNombre.addEventListener("click", cambiarNombre);
    btnApellidos.addEventListener("click", cambiarApellidos);
    btnTelefono.addEventListener("click", cambiarTelefono);
    btnCorreo.addEventListener("click", cambiarCorreo);
    btnContrasena.addEventListener("click", cambiarContrasena);
}

function mostrarDatos() {
    nombre.value = localStorage.getItem("nombre");
    apellidos.value = localStorage.getItem("apellidos");
    telefono.value = localStorage.getItem("telefono");
    correo.value = localStorage.getItem("correo");
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
    const expCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/;
    if (expCorreo.test(correo.value)) {
        correo.setAttribute("class", "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        msgCorreo.setAttribute("class", "hidden");
        msgCorreoExiste.setAttribute("class", "hidden");
        validacionCorreo = true;

    } else {
        correo.setAttribute("class", "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        msgCorreo.setAttribute("class", "flex");
        msgCorreoExiste.setAttribute("class", "hidden");
        validacionCorreo = false;
    }
}

function validarContrasena() {
    const expContrasena =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d$@$!%*?&]|[^ ]){8,16}$/;
    if (expContrasena.test(contrasenaNueva.value)) {
        contrasenaNueva.setAttribute("class", "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        msgContrasenaNueva.setAttribute("class", "hidden");
        validacionContrasenhaNueva = true;
    } else {
        contrasenaNueva.setAttribute("class", "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        msgContrasenaNueva.setAttribute("class", "flex");
        validacionContrasenhaNueva = false;
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
                    localStorage.setItem("nombre", nombre.value);
                    break;
                case "actualizadoApe":
                    correctoDatos.setAttribute("class", "flex");
                    setTimeout(function () {
                        correctoDatos.setAttribute("class", "hidden");
                    }, 3000);
                    localStorage.setItem("apellidos", apellidos.value);
                    break;
                case "actualizadoTel":
                    correctoDatos.setAttribute("class", "flex");
                    setTimeout(function () {
                        correctoDatos.setAttribute("class", "hidden");
                    }, 3000);
                    localStorage.setItem("telefono", telefono.value);
                    break;
                case "actualizadoMail":
                    correctoDatos.setAttribute("class", "flex");
                    setTimeout(function () {
                        correctoDatos.setAttribute("class", "hidden");
                    }, 3000);
                    localStorage.setItem("correo", correo.value);
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
                    correo.setAttribute("class", "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
                    msgCorreo.setAttribute("class", "hidden");
                    msgCorreoExiste.setAttribute("class", "flex");
                    setTimeout(function () {
                        correctoDatos.setAttribute("class", "hidden");
                    }, 3000);
                    break;
                case "contraExiste":
                    incorrectoContrasena.setAttribute("class", "flex");
                    setTimeout(function () {
                        incorrectoContrasena.setAttribute("class", "hidden");
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
            'id': localStorage.getItem("id")
        }
        actualizarDatos("../../php/usuarios/actualizar_datos_usuario.php", datos);

    }
}

function cambiarApellidos() {
    if (validacionApellidos) {
        const datos = {
            'apellidos': apellidos.value,
            'id': localStorage.getItem("id")
        }
        actualizarDatos("../../php/usuarios/actualizar_datos_usuario.php", datos);

    }
}

function cambiarTelefono() {
    if (validacionTelefono) {
        const datos = {
            'telefono': telefono.value,
            'id': localStorage.getItem("id")
        }
        actualizarDatos("../../php/usuarios/actualizar_datos_usuario.php", datos);

    }
}

function cambiarCorreo() {
    if (validacionCorreo) {
        const datos = {
            'correo': correo.value,
            'id': localStorage.getItem("id")
        }
        actualizarDatos("../../php/usuarios/actualizar_datos_usuario.php", datos);
    }
}

function cambiarContrasena() {
    if (validacionContrasenhaNueva) {
        const datos = {
            'contrasenaActual': contrasenaActual.value,
            'contrasenaNueva': contrasenaNueva.value,
            'id': localStorage.getItem("id")
        }
        actualizarDatos("../../php/usuarios/actualizar_datos_usuario.php", datos);
    }
}
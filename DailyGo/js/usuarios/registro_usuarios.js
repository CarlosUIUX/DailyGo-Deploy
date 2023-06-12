document.addEventListener("DOMContentLoaded", iniciarEventos);


const crearCuenta = document.getElementById("crearCuenta");

// DATOS FORMULARIO
const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const telefono = document.getElementById("telefono");
const correo = document.getElementById("correo");
const contrasena = document.getElementById("contrasena");
const confirmarContrasena = document.getElementById("confirmarContrasena");
const terminos = document.getElementById("terminos");

//RESPUESTAS 
let correoComprobadoBaseDatos = ''
let correoValidado = ''
let contraValidada = ''
let nombreValidado = ''
let apellidoValidado = ''
let telefonoValidado = ''
let telefonoComprobadoBaseDatos = ''
let terminosValidados = ''

// ALERTAS FORMULARIO
const msgCorreo = document.getElementById("msgCorreo");
const msgCorreoExiste = document.getElementById("msgCorreoExiste");
const msgNombre = document.getElementById("msgNombre");
const msgApellidos = document.getElementById("msgApellidos");
const msgTelefono = document.getElementById("msgTelefono");
const msgTelefonoExiste = document.getElementById("msgTelefonoExiste");
const msgContrasena = document.getElementById("msgContrasena");
const msgConfirmarContrasena = document.getElementById(
    "msgConfirmarContrasena"
);
const msgTerminos = document.getElementById("msgTerminos");

// Peticiones HTTP POST
const xhrNuevoUsuario = new XMLHttpRequest();
const xhrCorreo = new XMLHttpRequest();
const xhrTelefono = new XMLHttpRequest();

function iniciarEventos() {
    try {
        nombre.addEventListener("input", validarNombre);
        apellidos.addEventListener("input", validarApellidos);
        telefono.addEventListener("input", validarTelefono);
        correo.addEventListener("input", validarCorreo);
        contrasena.addEventListener("input", validarContrasena);
        confirmarContrasena.addEventListener("input", validarConfirmarContrasena);
        terminos.addEventListener("click", validarTerminos);

        crearCuenta.addEventListener("click", peticionCrearUsuario);
    } catch (error) {
        console.log(
            `Los eventos no están funcionando correctamente: ${error}`
        );
    }
}

function validarCorreo() {
    try {
        const expCorreo = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (expCorreo.test(correo.value)) {
            xhrCorreo.onreadystatechange = respuestaExisteCorreo;
            xhrCorreo.open("POST", "../php/usuarios/registro_usuario.php", true);
            xhrCorreo.setRequestHeader(
                "Content-type",
                "application/x-www-form-urlencoded"
            );
            xhrCorreo.send(`correoExistente=${correo.value}`);

            correoValidado = true;
        } else {
            correo.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgCorreo.setAttribute("class", "flex");
            msgCorreoExiste.setAttribute("class", "hidden");

            correoValidado = false;
        }
    } catch (error) {
        console.log(`No se ha podido validar el correo: ${error}`);
    }
}

function respuestaExisteCorreo() {
    try {
        if (xhrCorreo.readyState == 4 && xhrCorreo.status == 200) {
            let respuestaPhp = xhrCorreo.responseText;

            if (respuestaPhp == "no existe") {
                correo.setAttribute(
                    "class",
                    "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
                );
                msgCorreoExiste.setAttribute("class", "hidden");
                msgCorreo.setAttribute("class", "hidden");
                correoComprobadoBaseDatos = true;
            } else {
                correo.setAttribute(
                    "class",
                    "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
                );
                msgCorreoExiste.setAttribute("class", "flex");
                msgCorreo.setAttribute("class", "hidden");
                correoComprobadoBaseDatos = false;
            }
        }
    } catch (error) {
        console.log(
            `No se ha obtenido respuesta de la existencia del correo: ${error}`
        );
    }
}

function validarContrasena() {
    try {
        const expContrasena =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d$@$!%*?&]|[^ ]){8,16}$/;

        if (expContrasena.test(contrasena.value)) {
            contrasena.setAttribute(
                "class",
                "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgContrasena.setAttribute("class", "hidden");
            contraValidada = true;
        } else {
            contrasena.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgContrasena.setAttribute("class", "flex");
            contraValidada = false;
        }
    } catch (error) {
        console.log(`No se ha podido validar la contraseña: ${error}`);
    }
}

function validarConfirmarContrasena() {
    try {
        const expContrasenaRep =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)([A-Za-z\d$@$!%*?&]|[^ ]){8,16}$/;

        if (
            contrasena.value === confirmarContrasena.value &&
            expContrasenaRep.test(confirmarContrasena.value)
        ) {
            confirmarContrasena.setAttribute(
                "class",
                "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgConfirmarContrasena.setAttribute("class", "hidden");
            return true;
        } else {
            confirmarContrasena.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgConfirmarContrasena.setAttribute("class", "flex");
            return false;
        }
    } catch (error) {
        console.log(
            `No se ha podido validar la confirmación de la contraseña: ${error}`
        );
    }
}

function validarNombre() {
    try {
        const expNombre = /^([a-zA-ZáéíóúÁÉÍÓÚñÑüÜñ]{2,20}\s?)+$/;

        if (expNombre.test(nombre.value)) {
            nombre.setAttribute(
                "class",
                "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgNombre.setAttribute("class", "hidden");
            nombreValidado = true;
        } else {
            nombre.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgNombre.setAttribute("class", "flex");
            nombreValidado = false;
        }
    } catch (error) {
        console.log(`No se ha podido validar el nombre: ${error}`);
    }
}

function validarApellidos() {
    try {
        const expApellidos = /^([a-zA-ZáéíóúÁÉÍÓÚñÑüÜñ]{2,}\s?-?\s?){1,4}$/;

        if (expApellidos.test(apellidos.value)) {
            apellidos.setAttribute(
                "class",
                "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgApellidos.setAttribute("class", "hidden");
            apellidoValidado = true;
        } else {
            apellidos.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgApellidos.setAttribute("class", "flex");
            apellidoValidado = false;
        }
    } catch (error) {
        console.log(`No se ha podido validar los apellidos: ${error}`);
    }
}

function validarTelefono() {
    try {
        const expTelefono = /^(6|7|8|9)\d{8}$/;

        if (expTelefono.test(telefono.value)) {
            xhrTelefono.onreadystatechange = respuestaExisteTelefono;
            xhrTelefono.open("POST", "../php/usuarios/registro_usuario.php", true);
            xhrTelefono.setRequestHeader(
                "Content-type",
                "application/x-www-form-urlencoded"
            );
            xhrTelefono.send(`telefonoExistente=${telefono.value}`);

            telefonoValidado = true;
        } else {
            telefono.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgTelefono.setAttribute("class", "flex");
            msgTelefonoExiste.setAttribute("class", "hidden");

            telefonoValidado = false;
        }
    } catch (error) {
        console.log(`No se ha podido validar el teléfono: ${error}`);
    }
}

function respuestaExisteTelefono() {
    try {
        if (xhrTelefono.readyState == 4 && xhrTelefono.status == 200) {
            let jsonTelefono = xhrTelefono.responseText;
            console.log(jsonTelefono)
            if (jsonTelefono === "no existe") {
                telefono.setAttribute(
                    "class",
                    "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
                );
                msgTelefonoExiste.setAttribute("class", "hidden");
                msgTelefono.setAttribute("class", "hidden");
                telefonoComprobadoBaseDatos = true;
            } else {
                telefono.setAttribute(
                    "class",
                    "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
                );
                msgTelefonoExiste.setAttribute("class", "flex");
                msgTelefono.setAttribute("class", "hidden");
                telefonoComprobadoBaseDatos = false;
            }
        }
    } catch (error) {
        console.log(
            `No se ha podido obtener la respuesta de la existencia del teléfono: ${error}`
        );
    }
}

function validarTerminos() {
    try {
        if (terminos.checked) {
            msgTerminos.setAttribute("class", "hidden");
            terminosValidados = true;
        } else {
            msgTerminos.setAttribute("class", "flex");
            terminosValidados = false;
        }
    } catch (error) {
        console.log(`No se ha podido validar los términos: ${error}`);
    }
}

function peticionCrearUsuario() {
    try {
        if (
            correoComprobadoBaseDatos == true &&
            correoValidado == true &&
            contraValidada == true &&
            nombreValidado == true &&
            apellidoValidado == true &&
            telefonoValidado == true &&
            telefonoComprobadoBaseDatos == true &&
            terminosValidados == true
        ) {
            xhrNuevoUsuario.onreadystatechange = respuestaCrearUsuario;
            xhrNuevoUsuario.open("POST", "../php/usuarios/registro_usuario.php", true);
            xhrNuevoUsuario.setRequestHeader(
                "Content-type",
                "application/x-www-form-urlencoded"
            );
            xhrNuevoUsuario.send(
                `nombre=${nombre.value}&apellidos=${apellidos.value}&correo=${correo.value}&contrasena=${contrasena.value}&telefono=${telefono.value}`
            );
        }
        if (correoValidado == '') {
            msgCorreo.setAttribute("class", "flex");
            msgCorreoExiste.setAttribute("class", "hidden");
        }
        if (contraValidada == '') {
            contrasena.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgContrasena.setAttribute("class", "flex");
        }
        if (nombreValidado == '') {
            nombre.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgNombre.setAttribute("class", "flex");
        } if (apellidoValidado == '') {
            apellidos.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgApellidos.setAttribute("class", "flex");
        } if (telefonoValidado == '') {
            telefono.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgTelefono.setAttribute("class", "flex");
            msgTelefonoExiste.setAttribute("class", "hidden");
        } if (terminosValidados == '') {
            msgTerminos.setAttribute("class", "flex");
        }
    } catch (error) {
        console.log(`No se ha podido solicitar crear usuario: ${error}`);
    }
}

function respuestaCrearUsuario() {
    try {
        if (xhrNuevoUsuario.readyState == 4 && xhrNuevoUsuario.status == 200) {
            let respuestaUsuario = xhrNuevoUsuario.responseText;
            console.log(respuestaUsuario)
            if (respuestaUsuario === "creado") {
                localStorage.setItem("nombre", nombre.value);
                localStorage.setItem("apellidos", apellidos.value);
                localStorage.setItem("correo", correo.value);
                localStorage.setItem("telefono", apellidos.value);
                localStorage.setItem("tipoUsuario", "usuario");
                window.location.href = "../src/index.html";
            } else {
                const errorCrear = document.getElementById("errorCrear");
                errorCrear.setAttribute("class", "flex");
            }
        }
    } catch (error) {
        console.log(
            `No se ha podido obtener respuesta de la creación del usuario: ${error}`
        );
    }
}

try {
    document.addEventListener("DOMContentLoaded", iniciarEventos);
} catch (error) {
    console.log(
        `Error del Listener a la hora de iniciar los eventos: ${error}`
    );
}

const crearCuenta = document.getElementById("crearCuenta");

// DATOS FORMULARIO
const nif = document.getElementById("nif");
const razonSocial = document.getElementById("razonSocial");
const direccion = document.getElementById("direccion");
const telefono = document.getElementById("telefono");
const correo = document.getElementById("correo");
const contrasena = document.getElementById("contrasena");
const confirmarContrasena = document.getElementById("confirmarContrasena");
const terminos = document.getElementById("terminos");

// DATOS FORMULARIO
let nifValidado = ''
let nifExistenteBaseDatos = ''
let razonSocialValidada = ''
let direccionValidada = ''
let telefonoValidado = ''
let telefonoExistenteBaseDatos = ''
let correoValidado = ''
let correoExistenteBaseDatos = ''
let contrasenaValidada = ''
let confirmarContrasenaValidada = ''
let terminosValidados = ''

// ALERTAS FORMULARIO
const msgCorreo = document.getElementById("msgCorreo");
const msgCorreoExiste = document.getElementById("msgCorreoExiste");
const msgTelefono = document.getElementById("msgTelefono");
const msgTelefonoExiste = document.getElementById("msgTelefonoExiste");
const msgContrasena = document.getElementById("msgContrasena");
const msgConfirmarContrasena = document.getElementById(
    "msgConfirmarContrasena"
);
const msgNif = document.getElementById("msgNif");
const msgNifExiste = document.getElementById("msgNifExiste");
const msgTerminos = document.getElementById("msgTerminos");
const msgDireccion = document.getElementById("msgDireccion");
const msgRazonSocial = document.getElementById("msgRazonSocial");

// Peticiones HTTP POST
const xhrNuevoUsuario = new XMLHttpRequest();
const xhrCorreo = new XMLHttpRequest();
const xhrTelefono = new XMLHttpRequest();
const xhrNif = new XMLHttpRequest();

function iniciarEventos() {
    try {
        razonSocial.addEventListener("input", validarRazonSocial);
        nif.addEventListener("input", validarNif);
        direccion.addEventListener("input", validarDireccion);
        telefono.addEventListener("input", validarTelefono);
        correo.addEventListener("input", validarCorreo);
        contrasena.addEventListener("input", validarContrasena);
        confirmarContrasena.addEventListener(
            "input",
            validarConfirmarContrasena
        );
        terminos.addEventListener("click", validarTerminos);

        crearCuenta.addEventListener("click", peticionCrearUsuario);
    } catch (error) {
        console.log(
            `Los eventos no están funcionando correctamente: ${error}`
        );
    }
}

function validarDireccion() {
    try {
        const expDireccion = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\d.',-]+$/u;

        if (expDireccion.test(direccion.value)) {
            direccion.setAttribute(
                "class",
                "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgDireccion.setAttribute("class", "hidden");
            direccionValidada = true;
        } else {
            direccion.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgDireccion.setAttribute("class", "flex");
            direccionValidada = false;
        }
    } catch (error) {
        console.log(`No se ha podido validar la dirección: ${error}`);
    }
}

function validarRazonSocial() {
    try {
        const expRazonSocial = /^[a-zA-ZñÑ\s\d.,()/-]{2,100}$/i;
        if (expRazonSocial.test(razonSocial.value)) {
            razonSocial.setAttribute(
                "class",
                "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgRazonSocial.setAttribute("class", "hidden");
            razonSocialValidada = true;
        } else {
            razonSocial.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgRazonSocial.setAttribute("class", "flex");
            razonSocialValidada = false;
        }
    } catch (error) {
        console.log(`No se ha podido validar la Razón social: ${error}`);
    }
}

function validarNif() {
    try {
        const expNif = /^[A-Z]-\d{8}$/i;

        if (expNif.test(nif.value)) {
            xhrNif.onreadystatechange = respuestaExisteNif;
            xhrNif.open("POST", "../php/proveedores/registro_proveedor.php", true);
            xhrNif.setRequestHeader(
                "Content-type",
                "application/x-www-form-urlencoded"
            );
            xhrNif.send(`nifExistente=${nif.value}`);
            nifValidado = true;
         } else {
            nif.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgNif.setAttribute("class", "flex");
            msgNifExiste.setAttribute("class", "hidden");

            nifValidado = false;
        }
    } catch (error) {
        console.log(`No se ha podido validar el NIF: ${error}`);
    }
}

function respuestaExisteNif() {
    try {
        if (xhrNif.readyState == 4 && xhrNif.status == 200) {
            let jsonNIF = xhrNif.responseText;
            console.log(jsonNIF)
            if (jsonNIF == "no existe") {
                nif.setAttribute(
                    "class",
                    "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
                );
                msgNifExiste.setAttribute("class", "hidden");
                msgNif.setAttribute("class", "hidden");
                nifExistenteBaseDatos = true;
            } else {
                nif.setAttribute(
                    "class",
                    "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
                );
                msgNifExiste.setAttribute("class", "flex");
                msgNif.setAttribute("class", "hidden");
                nifExistenteBaseDatos = false;
            }
        }
    } catch (error) {
        console.log(
            `No se ha obtenido respuesta de la existencia del NIF: ${error}`
        );
    }
}

function validarCorreo() {
    try {
        const expCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        if (expCorreo.test(correo.value) && correo.value.length <= 40) {
            xhrCorreo.onreadystatechange = respuestaExisteCorreo;
            xhrCorreo.open("POST", "../php/proveedores/registro_proveedor.php", true);
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
            let jsonCorreo = xhrCorreo.responseText;

            if (jsonCorreo === "no existe") {
                correo.setAttribute(
                    "class",
                    "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
                );
                msgCorreoExiste.setAttribute("class", "hidden");
                msgCorreo.setAttribute("class", "hidden");
                correoExistenteBaseDatos = true;
            } else {
                correo.setAttribute(
                    "class",
                    "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
                );
                msgCorreoExiste.setAttribute("class", "flex");
                msgCorreo.setAttribute("class", "hidden");
                correoExistenteBaseDatos = false;
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
            contrasenaValidada = true;
        } else {
            contrasena.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgContrasena.setAttribute("class", "flex");
            contrasenaValidada = false;
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
            confirmarContrasenaValidada = true;
        } else {
            confirmarContrasena.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgConfirmarContrasena.setAttribute("class", "flex");
            confirmarContrasenaValidada = false;
        }
    } catch (error) {
        console.log(
            `No se ha podido validar la confirmación de la contraseña: ${error}`
        );
    }
}

function validarTelefono() {
    try {
        const expTelefono = /^(6|7|8|9)\d{8}$/;

        if (expTelefono.test(telefono.value)) {
            xhrTelefono.onreadystatechange = respuestaExisteTelefono;
            xhrTelefono.open("POST", "../php/proveedores/registro_proveedor.php", true);
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

            if (jsonTelefono === "no existe") {
                telefono.setAttribute(
                    "class",
                    "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
                );
                msgTelefonoExiste.setAttribute("class", "hidden");
                msgTelefono.setAttribute("class", "hidden");
                telefonoExistenteBaseDatos = true;
            } else {
                telefono.setAttribute(
                    "class",
                    "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
                );
                msgTelefonoExiste.setAttribute("class", "flex");
                msgTelefono.setAttribute("class", "hidden");
                telefonoExistenteBaseDatos = false;
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
            terminosValidados = true
            msgTerminos.setAttribute("class", "hidden");
        } else {
            terminosValidados = false
            msgTerminos.setAttribute("class", "flex");
        }
    } catch (error) {
        console.log(`No se ha podido validar los términos: ${error}`);
    }
}

function peticionCrearUsuario() {
    try {

        if (
            nifValidado == true &&
            nifExistenteBaseDatos == true &&
            razonSocialValidada == true &&
            direccionValidada == true &&
            telefonoValidado == true &&
            telefonoExistenteBaseDatos == true &&
            correoValidado == true &&
            correoExistenteBaseDatos == true &&
            contrasenaValidada == true &&
            confirmarContrasenaValidada == true &&
            terminosValidados == true
        ) {
            xhrNuevoUsuario.onreadystatechange = respuestaCrearUsuario;
            xhrNuevoUsuario.open("POST", "../php/proveedores/registro_proveedor.php", true);
            xhrNuevoUsuario.setRequestHeader(
                "Content-type",
                "application/x-www-form-urlencoded"
            );
            xhrNuevoUsuario.send(
                `razonSocial=${razonSocial.value}&nif=${nif.value}&direccion=${direccion.value}&correo=${correo.value}&contrasena=${contrasena.value}&telefono=${telefono.value}`
            );
        } if (nifValidado == '') {
            nif.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgNif.setAttribute("class", "flex");
            msgNifExiste.setAttribute("class", "hidden");
        }
        if (razonSocialValidada == '') {
            razonSocial.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgRazonSocial.setAttribute("class", "flex");
        }
        if (direccionValidada == '') {
            direccion.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgDireccion.setAttribute("class", "flex");
        } if (telefonoValidado == '') {
            telefono.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgTelefono.setAttribute("class", "flex");
            msgTelefonoExiste.setAttribute("class", "hidden");
        } if (correoValidado == '') {
            correo.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgCorreo.setAttribute("class", "flex");
            msgCorreoExiste.setAttribute("class", "hidden");
        } if (contrasenaValidada == '') {
            contrasena.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgContrasena.setAttribute("class", "flex");
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
            let jsonCrearUsuario = xhrNuevoUsuario.responseText;
            console.log(jsonCrearUsuario)
            if (jsonCrearUsuario === "creado") {
                localStorage.setItem("razonSocial", razonSocial.value);
                localStorage.setItem("nif", nif.value);
                localStorage.setItem("correo", correo.value);
                localStorage.setItem("telefono", apellidos.value);
                localStorage.setItem("direccion", direccion.value);
                localStorage.setItem("tipoUsuario", "proveedor");
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

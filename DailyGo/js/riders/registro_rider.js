try {
    document.addEventListener("DOMContentLoaded", iniciarEventos);
} catch (error) {
    console.log(
        `Error del Listener a la hora de iniciar los eventos: ${error}`
    );
}

const crearCuenta = document.getElementById("crearCuenta");

// DATOS FORMULARIO
const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const dni = document.getElementById("dni");
const telefono = document.getElementById("telefono");
const correo = document.getElementById("correo");
const contrasena = document.getElementById("contrasena");
const confirmarContrasena = document.getElementById("confirmarContrasena");
const terminos = document.getElementById("terminos");

// ALERTAS FORMULARIO
const msgCorreo = document.getElementById("msgCorreo");
const msgCorreoExiste = document.getElementById("msgCorreoExiste");
const msgNombre = document.getElementById("msgNombre");
const msgApellidos = document.getElementById("msgApellidos");
const msgDni = document.getElementById("msgDni");
const msgDniExiste = document.getElementById("msgDniExiste");
const msgTelefono = document.getElementById("msgTelefono");
const msgTelefonoExiste = document.getElementById("msgTelefonoExiste");
const msgContrasena = document.getElementById("msgContrasena");
const msgConfirmarContrasena = document.getElementById(
    "msgConfirmarContrasena"
);
const msgTerminos = document.getElementById("msgTerminos");

//Validaciones check
let nombreVal = ''
let apellidosVal = ''
let dniVal = ''
let telefonoVal = ''
let correoVal = ''
let contrasenaVal = ''
let confirmarContrasenaVal = ''
let terminosCheck = ''

// Peticiones HTTP POST
const xhrNuevoUsuario = new XMLHttpRequest();
const xhrDNI = new XMLHttpRequest();
const xhrCorreo = new XMLHttpRequest();
const xhrTelefono = new XMLHttpRequest();

function iniciarEventos() {
    try {
        nombre.addEventListener("input", validarNombre);
        apellidos.addEventListener("input", validarApellidos);
        dni.addEventListener("input", validarDni);
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

function validarDni() {
    try {

        if (validateDNI(dni.value)) {
            xhrDNI.onreadystatechange = repuestaExisteDni;
            xhrDNI.open("POST", "../php/riders/registro_rider.php", true);
            xhrDNI.setRequestHeader(
                "Content-type",
                "application/x-www-form-urlencoded"
            );
            xhrDNI.send(`dniComprobar=${dni.value}`);

        } else {
            dni.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgDni.setAttribute("class", "flex");
            msgDniExiste.setAttribute("class", "hidden");

            dniVal = false;
        }
    } catch (error) {
        console.log(`No se ha podido validar el DNI: ${error}`);
    }
}

function validateDNI(dni) {
    var numero, let, letra;
    var expresion_regular_dni = /^[XYZ]?\d{5,8}[A-Z]$/;

    dni = dni.toUpperCase();

    if(expresion_regular_dni.test(dni) === true){
        numero = dni.substr(0,dni.length-1);
        numero = numero.replace('X', 0);
        numero = numero.replace('Y', 1);
        numero = numero.replace('Z', 2);
        let = dni.substr(dni.length-1, 1);
        numero = numero % 23;
        letra = 'TRWAGMYFPDXBNJZSQVHLCKET';
        letra = letra.substring(numero, numero+1);
        if (letra != let) {
            //alert('Dni erroneo, la letra del NIF no se corresponde');
            return false;
        }else{
            //alert('Dni correcto');
            return true;
        }
    }else{
        //alert('Dni erroneo, formato no válido');
        return false;
    }
}

function repuestaExisteDni() {
    try {
        if (xhrDNI.readyState == 4 && xhrDNI.status == 200) {
            let respuesta = xhrDNI.responseText;

            if (respuesta === "no existe") {
                dni.setAttribute(
                    "class",
                    "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
                );
                msgDniExiste.setAttribute("class", "hidden");
                msgDni.setAttribute("class", "hidden");
                dniVal = true;
            } else {
                dni.setAttribute(
                    "class",
                    "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
                );
                msgDniExiste.setAttribute("class", "flex");
                msgDni.setAttribute("class", "hidden");
                dniVal = false;
            }
        }
    } catch (error) {
        console.log(
            `No se ha obtenido respuesta de la existencia del DNI: ${error}`
        );
    }
}

function validarCorreo() {
    try {
        const expCorreo = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (expCorreo.test(correo.value) && correo.value.length<=40) {
            xhrCorreo.onreadystatechange = respuestaCorreo;
            xhrCorreo.open("POST", "../php/riders/registro_rider.php", true);
            xhrCorreo.setRequestHeader(
                "Content-type",
                "application/x-www-form-urlencoded"
            );
            xhrCorreo.send(`correoComprobar=${correo.value}`);

        } else {
            correo.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgCorreo.setAttribute("class", "flex");
            msgCorreoExiste.setAttribute("class", "hidden");

            correoVal = false;
        }
    } catch (error) {
        console.log(`No se ha podido validar el correo: ${error}`);
    }
}

function respuestaCorreo() {
    try {
        if (xhrCorreo.readyState == 4 && xhrCorreo.status == 200) {
            let correoRespuesta = xhrCorreo.responseText;

            if (correoRespuesta === "no existe") {
                correo.setAttribute(
                    "class",
                    "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
                );
                msgCorreoExiste.setAttribute("class", "hidden");
                msgCorreo.setAttribute("class", "hidden");
                correoVal = true;
            } else {
                correo.setAttribute(
                    "class",
                    "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
                );
                msgCorreoExiste.setAttribute("class", "flex");
                msgCorreo.setAttribute("class", "hidden");
                correoVal = false;
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

        } else {
            contrasena.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgContrasena.setAttribute("class", "flex");
            contrasenaVal = false;
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
            confirmarContrasenaVal = true;
            contrasenaVal = true;
        } else {
            confirmarContrasena.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgConfirmarContrasena.setAttribute("class", "flex");
            confirmarContrasenaVal = false;
            contrasenaVal = false;
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
            nombreVal = true;
        } else {
            nombre.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgNombre.setAttribute("class", "flex");
            nombreVal = false;
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
            apellidosVal = true;
        } else {
            apellidos.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgApellidos.setAttribute("class", "flex");
            apellidosVal = false;
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
            xhrTelefono.open("POST", "../php/riders/registro_rider.php", true);
            xhrTelefono.setRequestHeader(
                "Content-type",
                "application/x-www-form-urlencoded"
            );
            xhrTelefono.send(`telefonoComprobar=${telefono.value}`);

        } else {
            telefono.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgTelefono.setAttribute("class", "flex");
            msgTelefonoExiste.setAttribute("class", "hidden");

            telefonoVal = false;
        }
    } catch (error) {
        console.log(`No se ha podido validar el teléfono: ${error}`);
    }
}

function respuestaExisteTelefono() {
    try {
        if (xhrTelefono.readyState == 4 && xhrTelefono.status == 200) {
            let telRespuesta = xhrTelefono.responseText;
            console.log(telRespuesta)
            if (telRespuesta === "no existe") {
                telefono.setAttribute(
                    "class",
                    "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
                );
                msgTelefonoExiste.setAttribute("class", "hidden");
                msgTelefono.setAttribute("class", "hidden");
                telefonoVal = true;
            } else {
                telefono.setAttribute(
                    "class",
                    "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
                );
                msgTelefonoExiste.setAttribute("class", "flex");
                msgTelefono.setAttribute("class", "hidden");
                telefonoVal = false;
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
            terminosCheck = true;
        } else {
            msgTerminos.setAttribute("class", "flex");
            terminosCheck = false
        }
    } catch (error) {
        console.log(`No se ha podido validar los términos: ${error}`);
    }
}

function peticionCrearUsuario() {
    try {

        if (
            nombreVal == true &&
            apellidosVal == true &&
            correoVal == true &&
            dniVal == true &&
            telefonoVal == true &&
            contrasenaVal == true &&
            confirmarContrasenaVal == true &&
            terminosCheck == true
        ) {
            xhrNuevoUsuario.onreadystatechange = respuestaCrearUsuario;
            xhrNuevoUsuario.open("POST", "../php/riders/registro_rider.php", true);
            xhrNuevoUsuario.setRequestHeader(
                "Content-type",
                "application/x-www-form-urlencoded"
            );
            xhrNuevoUsuario.send(
                `nombre=${nombre.value}&apellidos=${apellidos.value}&correo=${correo.value}&contrasena=${contrasena.value}&dni=${dni.value}&telefono=${telefono.value}`
            );
        } if (nombreVal == '') {
            nombre.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgNombre.setAttribute("class", "flex");
        }
        if (apellidosVal == '') {
            apellidos.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgApellidos.setAttribute("class", "flex");
        }
        if (correoVal == '') {
            correo.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgCorreo.setAttribute("class", "flex");
            msgCorreoExiste.setAttribute("class", "hidden");
        } if (dniVal == '') {
            dni.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgDniExiste.setAttribute("class", "flex");
            msgDni.setAttribute("class", "hidden");
        } if (telefonoVal == '') {
            telefono.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgTelefonoExiste.setAttribute("class", "flex");
            msgTelefono.setAttribute("class", "hidden");
        } if (contrasenaVal == '') {
            confirmarContrasena.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgConfirmarContrasena.setAttribute("class", "flex");
        }if (confirmarContrasenaVal == '') {
            confirmarContrasena.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );
            msgConfirmarContrasena.setAttribute("class", "flex");
        } if (terminosCheck == '') {
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
            if (jsonCrearUsuario === "creado") {
                localStorage.setItem("nombre", nombre.value);
                localStorage.setItem("apellidos", apellidos.value);
                localStorage.setItem("correo", correo.value);
                localStorage.setItem("dni", dni.value);
                localStorage.setItem("telefono", apellidos.value);
                localStorage.setItem("tipoUsuario", "rider");
                localStorage.setItem("estado", "No disponible");
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

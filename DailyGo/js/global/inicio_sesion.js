document.addEventListener("DOMContentLoaded", iniciarEventos);

const xhrEntrar = new XMLHttpRequest();

const tipoUsuario = document.getElementById("tipoUsuario").value;

const msgIncorrecto = document.getElementById("msgIncorrecto");
const btnEntrar = document.getElementById("btnEntrar");
const correo = document.getElementById("correo");
const contrasena = document.getElementById("contrasena");

function iniciarEventos() {
    correo.addEventListener("input", validarCorreo);
    contrasena.addEventListener("input", validarContrasena);
    btnEntrar.addEventListener("click", peticionEntrar);
}

function validarCorreo() {
    try {
        const expCorreo = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

        if (expCorreo.test(correo.value) && correo.value.length <= 40) {
            correo.setAttribute(
                "class",
                "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );

            return true;
        } else {
            correo.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );

            return false;
        }
    } catch (error) {
        console.log(`No se ha podido validar el correo electrónico: ${error}`);
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

            return true;
        } else {
            contrasena.setAttribute(
                "class",
                "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300"
            );

            return false;
        }
    } catch (error) {
        console.log(`No se ha podido validar la contraseña: ${error}`);
    }
}

function peticionEntrar() {
    try {
        validarCorreo();
        validarContrasena();

        let direccionServer = "";

        if(correo.value == "admin@dailygo.com"){
            msgIncorrecto.setAttribute("class", "flex");
            return true;
        }

        if (validarCorreo() && validarContrasena()) {

            xhrEntrar.onreadystatechange = respuestaEntrar;
            
            switch (tipoUsuario) {
                case "rider":
                    direccionServer = "../php/riders/inicio_sesion_rider.php";
                    break;
                case "proveedor":
                    direccionServer = "../php/proveedores/inicio_sesion_proveedor.php";
                    break;
                case "cliente":
                    direccionServer = "../php/usuarios/inicio_sesion_usuario.php";
                    break;
                default:
                    direccionServer = "...";
                    break;
            }
            xhrEntrar.open("POST", `${direccionServer}`, true);
            xhrEntrar.setRequestHeader(
                "Content-type",
                "application/x-www-form-urlencoded"
            );
            xhrEntrar.send(
                `correo=${correo.value}&contrasena=${contrasena.value}`
            );
        }
    } catch (error) {
        console.log(
            `No se ha podido realizar la petición para entrar: ${error}`
        );
    }
}

function respuestaEntrar() {
    try {
        if (xhrEntrar.readyState == 4 && xhrEntrar.status == 200) {
            console.log(xhrEntrar.responseText)
            if (xhrEntrar.responseText != 'False') {
                let jsonEntrar = JSON.parse(xhrEntrar.responseText);
                switch (tipoUsuario) {
                    case "administrador":
                        localStorage.setItem("nombre", nombre.value);
                        localStorage.setItem("apellidos", apellidos.value);
                        localStorage.setItem("correo", correo.value);
                        localStorage.setItem("telefono", telefono.value);
                        localStorage.setItem("tipoUsuario", "administrador");
                        break;
                        
                    case "cliente":
                        localStorage.setItem("id", jsonEntrar.COD_CLI);
                        localStorage.setItem("nombre", jsonEntrar.NOM_CLI);
                        localStorage.setItem("apellidos", jsonEntrar.APE_CLI);
                        localStorage.setItem("correo", jsonEntrar.MAIL_CLI);
                        localStorage.setItem("telefono", jsonEntrar.TLF_CLI);
                        localStorage.setItem("tipoUsuario", "usuario");
                        window.location.href = "../src/usuarios/inicio.php";
                        break;

                    case "rider":
                        localStorage.setItem("nombre", jsonEntrar.NOM_RID);
                        localStorage.setItem("apellidos", jsonEntrar.APE_RID);
                        localStorage.setItem("correo", jsonEntrar.MAIL_RID);
                        localStorage.setItem("dni", jsonEntrar.DNI_RID);
                        localStorage.setItem("telefono", jsonEntrar.TLF_RID);
                        localStorage.setItem("estado", jsonEntrar['ESTADO']);
                        localStorage.setItem("tipoUsuario", "rider");
                        window.location.href = "../src/riders/inicio.html";
                        break;

                    case "proveedor":
                        localStorage.setItem("razonSocial", jsonEntrar.RAZSOC);
                        localStorage.setItem("cif", jsonEntrar.CIF_PROV);
                        localStorage.setItem("correo", jsonEntrar.MAIL_PROV);
                        localStorage.setItem("telefono", jsonEntrar.TLF_PROV);
                        localStorage.setItem("direccion", jsonEntrar.DIR_PROV);
                        localStorage.setItem("tipoUsuario", "proveedor");
                        window.location.href = "../src/proveedores/inicio.html";
                        break;

                    default:
                        msgIncorrecto.setAttribute("class", "flex");
                        break;
                }
            } else {
                msgIncorrecto.setAttribute("class", "flex");
            }

        }
    } catch (error) {
        console.log(
            `No hay una respuesta válida por parte del servidor: ${error}`
        );
    }
}

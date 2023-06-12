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
    btnEntrar.addEventListener("click", iniciarSesion);
}

function validarCorreo() {
    try {
        const expCorreo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

        if (expCorreo.test(correo.value)) {
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

function iniciarSesion() {
    validarCorreo();
    validarContrasena();

    if (validarCorreo && validarContrasena) {
        if (correo.value == "admin@dailygo.com") {
            const datos = {
                correo: correo.value,
                contrasena: contrasena.value
            }

            fetch("../php/admin/inicio_sesion.php", {
                method: "POST",
                body: JSON.stringify(datos),
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then(response => response.text())
                .then(data => {
                    console.log(data);
                    if (data == "Dentro") {
                        localStorage.setItem("tipoUsuario", "administrador");
                        window.location.href = "administrador/inicio.html";
                    } else {
                        verError();
                    }
                })
                .catch(error => {
                    console.error("Error: No se ha podido crear la petición ->", error);
                });
        } else {
            verError();
        }
    }
}

function verError() {
    msgIncorrecto.setAttribute("class", "");
    let cerrarMsg = setTimeout(function () {
        msgIncorrecto.setAttribute("class", "hidden");
    }, 3000);

    return true;
}

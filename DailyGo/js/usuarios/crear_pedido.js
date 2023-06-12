window.addEventListener('DOMContentLoaded', iniciarResumenCompra);

const aplicarCupon = document.getElementById("aplicarCupon");
const realizarPago = document.getElementById("realizarPago");

const codigo = document.getElementById("codigo");

// RESULTADOS
let subtotal = document.getElementById("subtotal");
let envio = document.getElementById("envio");
let descuento = document.getElementById("descuento");
let total = document.getElementById("total");


// DATOS DIRECCION
const direccion = document.getElementById("direccion");
const piso = document.getElementById("piso");
const puerta = document.getElementById("puerta");
const mensaje = document.getElementById("mensaje");
mensaje.value = "-";

// DATOS TARJETA
const tarjeta = document.getElementById("tarjeta");
const cvv = document.getElementById("cvv");
const caducidad = document.getElementById("caducidad");
const titular = document.getElementById("titular");

function iniciarResumenCompra() {
    mostrarProductos();
    calcularCostes();

    aplicarCupon.addEventListener("click", aplicarDescuento);
    realizarPago.addEventListener("click", procesarPedido);

    // VALIDAR
    direccion.addEventListener("input", validarDireccion);
    piso.addEventListener("input", validarPiso);
    puerta.addEventListener("input", validarPuerta);

    tarjeta.addEventListener("input", validarTarjeta);
    cvv.addEventListener("input", validarCVV);
    caducidad.addEventListener("input", validarCaducidad);
    titular.addEventListener("input", validarTitular);
}

function procesarPedido() {
    validarDireccion();
    validarPiso();
    validarPuerta();
    validarTarjeta();
    validarCVV();
    validarCaducidad();
    validarTitular();

    if (validarDireccion() &&
        validarPiso() &&
        validarPuerta() &&
        validarTarjeta() &&
        validarCVV() &&
        validarCaducidad() &&
        validarTitular()
    ) {
        const idUsu = localStorage.getItem("id");

        const datos = {
            id: idUsu,
            carrito: localStorage.getItem("miCarrito"),
            direccion: direccion.value,
            piso: piso.value,
            puerta: puerta.value,
            mensaje: mensaje.value
        }

        fetch("../../php/usuarios/crear_pedido.php", {
            method: "POST",
            body: JSON.stringify(datos),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.text())
            .then(data => {
                if (data == "Creado") {
                    localStorage.removeItem("miCarrito");
                    window.location.href = "pedidos.html"
                }
            })
            .catch(error => {
                console.error(error);
            });
    }
}

function aplicarDescuento() {
    calcularCostes();
    switch (codigo.value) {
        case "DAILY10":
            calcularCostesDescuento(0.10);
            break;
        case "DAILY20":
            calcularCostesDescuento(0.20);
            break;
        case "ENVIO23":
            calcularCostesSinEnvio()
            break;
        default:
            calcularCostes();
            break;
    }
}

function calcularCostesDescuento(reduccion) {
    if (typeof localStorage !== "undefined" && localStorage.getItem("miCarrito") && JSON.parse(localStorage.getItem("miCarrito")).length >= 1) {
        let carrito = JSON.parse(localStorage.getItem("miCarrito"));
        let totalValor = 0.00;
        let cantidad = 0;
        carrito.forEach(producto => {
            if (producto.cantidad == 1) {
                totalValor += producto.precio;
            } else {
                totalValor += (producto.precio * producto.cantidad);
            }
            cantidad += producto.cantidad;
        });
        subtotal.textContent = totalValor.toFixed(2);
        // Suma gastos de envío (1.90 + 0.12 cent por cada unidad);
        envio.textContent = (1.90 + (0.12 * cantidad)).toFixed(2);
        totalValor = totalValor + 1.90 + (0.12 * cantidad) - (totalValor*reduccion);
        descuento.textContent = (totalValor*reduccion).toFixed(2);
        total.textContent = totalValor.toFixed(2);
    } else {
        descuento.textContent = 0.00;
        subtotal.textContent = 0.00;
        total.textContent = 0.00;
        envio.textContent = 0.00;
    }
}

function calcularCostesSinEnvio() {
    if (typeof localStorage !== "undefined" && localStorage.getItem("miCarrito") && JSON.parse(localStorage.getItem("miCarrito")).length >= 1) {
        let carrito = JSON.parse(localStorage.getItem("miCarrito"));
        let totalValor = 0.00;
        let cantidad = 0;
        carrito.forEach(producto => {
            if (producto.cantidad == 1) {
                totalValor += producto.precio;
            } else {
                totalValor += (producto.precio * producto.cantidad);
            }
            cantidad += producto.cantidad;
        });
        subtotal.textContent = totalValor.toFixed(2);
        // Suma gastos de envío (1.90 + 0.12 cent por cada unidad);
        envio.textContent = 0.00;
        descuento.textContent = 0.00;
        total.textContent = totalValor.toFixed(2);
    } else {
        descuento.textContent = 0.00;
        subtotal.textContent = 0.00;
        total.textContent = 0.00;
        envio.textContent = 0.00;
    }
}


function validarDireccion() {
    const expDireccion = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\d.',-]+$/u;
    if (expDireccion.test(direccion.value)) {
        direccion.setAttribute("class", "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        return true;
    } else {
        direccion.setAttribute("class", "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        return false;
    }
}

function validarPiso() {
    const expPiso = /^(?:1\d{2}|200|[1-9]\d?)$/;
    if (expPiso.test(piso.value)) {
        piso.setAttribute("class", "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        return true;
    } else {
        piso.setAttribute("class", "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        return false;
    }
}

function validarPuerta() {
    const expPuerta = /^[a-zA-Z1-9]$/;
    if (expPuerta.test(puerta.value)) {
        puerta.setAttribute("class", "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        return true;
    } else {
        puerta.setAttribute("class", "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        return false;
    }
}

function validarTarjeta() {
    const expTarjeta = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14})$/;
    if (expTarjeta.test(tarjeta.value)) {
        tarjeta.setAttribute("class", "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        return true;
    } else {
        tarjeta.setAttribute("class", "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        return false;
    }
}

function validarCVV() {
    const expCaducidad = /^\d{3}$/;
    if (expCaducidad.test(cvv.value)) {
        cvv.setAttribute("class", "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        return true;
    } else {
        cvv.setAttribute("class", "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        return false;
    }
}

function validarCaducidad() {
    const fechaActual = new Date();
    const fechaAyer = new Date(fechaActual);
    fechaAyer.setDate(fechaAyer.getDate() - 1);
    const fechaFormulario = new Date(caducidad.value);
    if (fechaFormulario > fechaAyer) {
        caducidad.setAttribute("class", "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        return true;
    } else {
        caducidad.setAttribute("class", "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        return false;
    }
}

function validarTitular() {
    const expTitular = /^([a-zA-ZáéíóúÁÉÍÓÚñÑüÜñ]{2,}\s?-?\s?){1,4}$/;
    if (expTitular.test(titular.value)) {
        titular.setAttribute("class", "rounded-md border border-green-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        return true;
    } else {
        titular.setAttribute("class", "rounded-md border border-red-500 p-2 bg-blue-100/10 focus:bg-blue-100/30 duration-300");
        return false;
    }
}

function mostrarProductos() {
    const listaProductosTabla = document.getElementById("listaProductosTabla");
    listaProductosTabla.innerHTML = "";
    if (typeof localStorage !== "undefined" && localStorage.getItem("miCarrito") && JSON.parse(localStorage.getItem("miCarrito")).length >= 1) {
        let carrito = JSON.parse(localStorage.getItem("miCarrito"));

        carrito.forEach(producto => {
            listaProductosTabla.appendChild(crearFila(producto));
        });
    } else {
        listaProductosTabla.innerHTML = "<tr><td class='p-4 text-sm'>(Sin productos)</td></tr>";
    }
}

function calcularCostes() {
    if (typeof localStorage !== "undefined" && localStorage.getItem("miCarrito") && JSON.parse(localStorage.getItem("miCarrito")).length >= 1) {
        let carrito = JSON.parse(localStorage.getItem("miCarrito"));
        let totalValor = 0.00;
        let cantidad = 0;
        carrito.forEach(producto => {
            if (producto.cantidad == 1) {
                totalValor += producto.precio;
            } else {
                totalValor += (producto.precio * producto.cantidad);
            }
            cantidad += producto.cantidad;
        });
        subtotal.textContent = totalValor.toFixed(2);
        // Suma gastos de envío (1.90 + 0.12 cent por cada unidad);
        envio.textContent = (1.90 + (0.12 * cantidad)).toFixed(2);
        totalValor = totalValor + 1.90 + (0.12 * cantidad) - descuento.textContent;
        total.textContent = totalValor.toFixed(2);
    } else {
        descuento.textContent = 0.00;
        subtotal.textContent = 0.00;
        total.textContent = 0.00;
        envio.textContent = 0.00;
    }
}

function crearFila(element) {
    const fila = document.createElement("tr");
    fila.setAttribute("class", "hover:bg-blue-100/20 duration-300")

    const tdNombre = document.createElement("td");
    tdNombre.setAttribute("class", "p-4 text-sm font-medium");
    tdNombre.innerHTML = `
        <div class='flex items-center gap-2'>
            <div class='w-12 h-12 rounded border' style='background-image: url("../../img_bbdd/productos/${element.id}.jpg"); background-size: cover; background-position: center bottom;'>
            </div>
            <div>
                <p>${element.nombre}</p>
                <p class="text-sm font-normal text-blue-300">${element.tienda}</p>
            </div>
        </div>
    `;
    fila.appendChild(tdNombre);

    const tdPrecio = document.createElement("td");
    tdPrecio.setAttribute("class", "p-4 text-sm");
    tdPrecio.textContent = `${element.precio.toFixed(2)}€`;
    fila.appendChild(tdPrecio);

    const tdCantidad = document.createElement("td");
    tdCantidad.setAttribute("class", "p-4 text-sm text-center");
    tdCantidad.innerHTML = `
        <div class="flex gap-2">
            <button onclick='aumentarCantidad(${element.id})' class="cursor-pointer duration-300 bg-white border border-blue-200 hover:bg-green-500 w-5 h-5 font-bold rounded-full" onclick="aumentarCantidad(id)">
                <p class="relative bottom-0.5">+</p>
            </button>
            <p>${element.cantidad}</p>
            <button onclick='reducirCantidad(${element.id})' class="cursor-pointer duration-300 bg-white border border-blue-200 hover:bg-red-500 w-5 h-5 font-bold rounded-full" onclick="reducirCantidad(id)">
                <p class="relative bottom-0.5">-</p>
            </button>
        </div>
    `;
    fila.appendChild(tdCantidad);

    const tdTotal = document.createElement("td");
    tdTotal.setAttribute("class", "p-4 text-sm");
    tdTotal.textContent = `${(element.precio * element.cantidad).toFixed(2)}€`;
    fila.appendChild(tdTotal);

    const tdEliminar = document.createElement("td");
    tdEliminar.setAttribute("class", "p-4 text-sm text-center");
    tdEliminar.innerHTML = `
    <button
    class="cursor-pointer duration-300 bg-white border border-red-500 text-red-500 hover:text-white hover:bg-red-500 w-5 h-5 rounded-full"
    onclick="eliminarProducto(${element.id})">
        <p class="relative bottom-0.5">x</p>
    </button>
    `;
    fila.appendChild(tdEliminar);

    return fila;
}

function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem("miCarrito"));
    carrito.splice(obtenerPosicionProducto(carrito, id), 1);
    localStorage.setItem("miCarrito", JSON.stringify(carrito));
    mostrarProductos();
    calcularCostes();
}

function aumentarCantidad(id) {
    let carrito = JSON.parse(localStorage.getItem("miCarrito"));
    let pos = obtenerPosicionProducto(carrito, id);
    if (carrito[pos].cantidad < 99) {
        carrito[pos].cantidad = carrito[pos].cantidad + 1;
        localStorage.setItem("miCarrito", JSON.stringify(carrito));
        mostrarProductos();
        calcularCostes();
    } else {
        return true;
    }
}

function reducirCantidad(id) {
    let carrito = JSON.parse(localStorage.getItem("miCarrito"));
    let pos = obtenerPosicionProducto(carrito, id);
    if (carrito[pos].cantidad != 1) {
        carrito[pos].cantidad = carrito[pos].cantidad - 1;
        localStorage.setItem("miCarrito", JSON.stringify(carrito));
        mostrarProductos();
        calcularCostes();
    } else {
        eliminarProducto(id);
    }
}

function obtenerPosicionProducto(carrito, id) {
    const pos = carrito.findIndex(function (producto) {
        return producto.id == id;
    });

    return pos;
}
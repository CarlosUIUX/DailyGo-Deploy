document.addEventListener("DOMContentLoaded", iniciarCarrito);
const contadorPedidos = document.getElementById("contadorPedidos");
const totalBar = document.getElementById("totalBar");
const listCarrito = document.getElementById("listCarrito");
const btnCarrito = document.getElementById("btnCarrito");

function iniciarCarrito() {
    mostrarBarraProductos();
}

function mostrarBarraProductos() {
    enlacePedido();
    listCarrito.innerHTML = "";

    if (typeof localStorage !== "undefined" && localStorage.getItem("miCarrito") && JSON.parse(localStorage.getItem("miCarrito")).length >= 1) {
        let carrito = JSON.parse(localStorage.getItem("miCarrito"));
        carrito.forEach(producto => {
            listCarrito.appendChild(crearComponenteProductoCarrito(producto));
        });
        calcularImporte();
    } else {
        listCarrito.innerHTML = "No tienes ningún producto en tu carrito :(";
        totalBar.innerHTML = "0.00€";
    }
}

function addProducto(id, precio, nombre, tienda) {
    if (typeof localStorage !== "undefined" && localStorage.getItem("miCarrito")) {
        let carrito = JSON.parse(localStorage.getItem("miCarrito"));

        // Si es un item de la misma tienda guardar sino eliminar todo y volver a añadir
        if (!validarTienda(carrito, tienda)) {
            const posicion = obtenerPosicionProducto(carrito, id);
            if (posicion != -1) {
                if (carrito[posicion].cantidad != 99) {
                    carrito[posicion].cantidad = carrito[posicion].cantidad + 1;
                } else {
                    return true;
                }
            } else {
                nuevoProducto = crearNuevoProducto(id, precio, nombre, tienda);
                carrito.push(nuevoProducto);
            }
        } else {
            listCarrito.innerHTML = "";
            listCarrito.innerHTML = `
            <div class="w-fit rounded-lg bg-blue-700 text-yellow-400 text-center p-3 h-full animate__animated animate__fadeIn">
                <p class="text-sm">⚠️ Se han retirado los productos de otras tiendas</p>
            </div>
            `;
            setTimeout(function () {
                addProducto(id, precio, nombre, tienda);
                mostrarBarraProductos();
            }, 3500);
            localStorage.removeItem("miCarrito");

            return true;
        }

        localStorage.setItem("miCarrito", JSON.stringify(carrito));
        mostrarBarraProductos();
    } else {
        let arrayObj = [];
        nuevoProducto = crearNuevoProducto(id, precio, nombre, tienda);
        arrayObj.push(nuevoProducto);
        localStorage.setItem("miCarrito", JSON.stringify(arrayObj));
    }

    mostrarBarraProductos();
}

function validarTienda(carrito, tienda) {
    const pos = carrito.findIndex(function (producto) {
        return producto.tienda == tienda;
    });

    if (pos == -1) {
        return true;
    } else {
        return false;
    }
}

function crearNuevoProducto(id, precio, nombre, tienda) {
    return { id: id, precio: precio, nombre: nombre, cantidad: 1, tienda: tienda };
}

function obtenerPosicionProducto(carrito, idProd) {
    const pos = carrito.findIndex(function (producto) {
        return producto.id == idProd;
    });

    return pos;
}


function aumentarCantidad(id) {
    try {
        let carrito = JSON.parse(localStorage.getItem("miCarrito"));

        let posicion = obtenerPosicionProducto(carrito, id);

        if (carrito[posicion].cantidad != 99) {
            carrito[posicion].cantidad = carrito[posicion].cantidad + 1;
        }

        localStorage.setItem("miCarrito", JSON.stringify(carrito));

        mostrarBarraProductos();

        return true;
    } catch (e) {
        return false;
    }
}

function reducirCantidad(id) {
    try {
        let carrito = JSON.parse(localStorage.getItem("miCarrito"));

        let posicion = obtenerPosicionProducto(carrito, id);

        if (carrito[posicion].cantidad == 1) {
            eliminarProducto(id);
            return true;
        } else {
            carrito[posicion].cantidad = carrito[posicion].cantidad - 1;
            localStorage.setItem("miCarrito", JSON.stringify(carrito));
        }

        mostrarBarraProductos();

        return true;
    } catch (e) {
        return false;
    }
}

function eliminarProducto(id) {
    let carrito = JSON.parse(localStorage.getItem("miCarrito"));
    carrito.splice(obtenerPosicionProducto(carrito, id), 1);
    localStorage.setItem("miCarrito", JSON.stringify(carrito));
    mostrarBarraProductos();
}

function crearComponenteProductoCarrito(element) {
    const componente = document.createElement("div");
    componente.setAttribute("class", "bg-blue-700 px-3 py-2 rounded-lg w-fit");
    const producto = document.createElement("p");
    producto.textContent = element.nombre;
    producto.setAttribute("class", "text-sm text-white font-semibold");
    componente.appendChild(producto);

    const divUd = document.createElement("div");
    divUd.setAttribute("class", "flex items-center h-fit mt-1 gap-1.5");
    const ud = document.createElement("p");
    ud.setAttribute("class", "text-xs text-white/60 mr-2");
    ud.textContent = element.cantidad;
    divUd.appendChild(ud);

    const btnMas = document.createElement("button");
    btnMas.setAttribute("class", "mr-1 bg-indigo-700 hover:bg-indigo-800 duration-300 rounded-full h-5 w-5 flex items-center justify-center");
    btnMas.setAttribute("onclick", `aumentarCantidad(${element.id})`);
    btnMas.textContent = "+";
    divUd.appendChild(btnMas);

    const btnMenos = document.createElement("button");
    btnMenos.setAttribute("class", "mr-1 bg-indigo-700 hover:bg-indigo-800 duration-300 rounded-full h-5 w-5 flex items-center justify-center");
    btnMenos.setAttribute("onclick", `reducirCantidad(${element.id})`);
    btnMenos.textContent = "-";
    divUd.appendChild(btnMenos);
    componente.appendChild(divUd);

    return componente;
}

function enlacePedido() {
    const enlace = document.getElementById("enlacePedido");
    if (typeof localStorage !== "undefined" && localStorage.getItem("miCarrito")) {
        if (JSON.parse(localStorage.getItem("miCarrito")).length) {
            enlace.setAttribute("href", "carrito.html");
            enlace.textContent = "Pedir ahora";
        } else {
            enlace.setAttribute("href", "busqueda_tiendas.php");
            enlace.textContent = "Buscar tiendas";
        }

    } else {
        enlace.setAttribute("href", "busqueda_tiendas.php");
        enlace.textContent = "Buscar tiendas";
    }
}

function calcularImporte() {
    if (typeof localStorage !== "undefined" && localStorage.getItem("miCarrito") && JSON.parse(localStorage.getItem("miCarrito")).length >= 1) {
        let carrito = JSON.parse(localStorage.getItem("miCarrito"));
        let total = 0.00;
        let cantidad = 0;
        carrito.forEach(producto => {
            if (producto.cantidad == 1) {
                total += producto.precio;
            } else {
                total += (producto.precio * producto.cantidad);
            }
            cantidad += producto.cantidad;
        });
        contadorPedidos.innerHTML = cantidad;
        // Suma gastos de envío (1.90 + 0.12 cent por cada unidad)
        total = total + 1.90 + (0.12 * cantidad);
        totalBar.textContent = `${total.toFixed(2)}€`;
    } else {
        contadorPedidos.innerHTML = 0;
        totalBar.textContent = "0.00€";
    }
}
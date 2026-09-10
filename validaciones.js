// ==========================================
// VALIDACIONES - SONIDO VIVO
// ==========================================


// Calcula el dígito verificador real de un RUN chileno
function calcularDV(rutSinDV) {
    let suma = 0;
    let multiplo = 2;

    for (let i = rutSinDV.length - 1; i >= 0; i--) {
        suma += parseInt(rutSinDV[i]) * multiplo;
        multiplo = multiplo === 7 ? 2 : multiplo + 1;
    }

    const resto = 11 - (suma % 11);

    if (resto === 11) return "0";
    if (resto === 10) return "K";
    return resto.toString();
}


// ==========================================
// REGISTRO
// ==========================================

const formulario = document.getElementById("form-registro");

if (formulario) {

    const run = document.getElementById("run");
    const correo = document.getElementById("correo");
    const password = document.getElementById("password");
    const confirmarPassword = document.getElementById("confirmar-password");

    const errorRun = document.getElementById("error-run");
    const errorCorreo = document.getElementById("error-correo");
    const errorPassword = document.getElementById("error-password");
    const errorConfirmarPassword = document.getElementById("error-confirmar-password");

    const region = document.getElementById("region");
    const comuna = document.getElementById("comuna");


    const comunas = {

        valparaiso: [
            "Valparaíso",
            "Viña del Mar",
            "Quilpué",
            "Villa Alemana"
        ],

        metropolitana: [
            "Santiago",
            "Maipú",
            "Puente Alto",
            "Las Condes"
        ]
    };


    region.addEventListener("change", function () {

        comuna.innerHTML = "";

        const regionSeleccionada = region.value;

        if (regionSeleccionada === "") {

            const opcion = document.createElement("option");
            opcion.value = "";
            opcion.textContent = "-- Selecciona primero una Región --";
            comuna.appendChild(opcion);

            return;
        }

        const listaComunas = comunas[regionSeleccionada];

        listaComunas.forEach(function (nombreComuna) {
            const opcion = document.createElement("option");
            opcion.value = nombreComuna;
            opcion.textContent = nombreComuna;
            comuna.appendChild(opcion);
        });

    });


    formulario.addEventListener("submit", function (event) {

        event.preventDefault();

        let formularioValido = true;


        // VALIDAR RUN (con dígito verificador real)

        const valorRun = run.value.trim().toUpperCase();

        if (valorRun === "") {
            errorRun.textContent = "El RUN es obligatorio.";
            formularioValido = false;
        }
        else if (!/^[0-9]+[0-9K]$/.test(valorRun)) {
            errorRun.textContent = "El RUN debe contener solo números y K, sin puntos ni guion.";
            formularioValido = false;
        }
        else {
            const cuerpo = valorRun.slice(0, -1);
            const dvIngresado = valorRun.slice(-1);
            const dvCorrecto = calcularDV(cuerpo);

            if (dvIngresado !== dvCorrecto) {
                errorRun.textContent = "El RUN ingresado no es válido (dígito verificador incorrecto).";
                formularioValido = false;
            } else {
                errorRun.textContent = "";
            }
        }


        // VALIDAR CORREO

        const valorCorreo = correo.value.trim();

        if (valorCorreo === "") {
            errorCorreo.textContent = "El correo es obligatorio.";
            formularioValido = false;
        }
        else if (!/^[^\s@]+@(gmail\.com|duoc\.cl)$/.test(valorCorreo)) {
            errorCorreo.textContent = "Solo se permiten correos @gmail.com o @duoc.cl.";
            formularioValido = false;
        }
        else {
            errorCorreo.textContent = "";
        }


        // VALIDAR CONTRASEÑA

        const valorPassword = password.value;

        if (valorPassword === "") {
            errorPassword.textContent = "La contraseña es obligatoria.";
            formularioValido = false;
        }
        else if (valorPassword.length < 4 || valorPassword.length > 10) {
            errorPassword.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
            formularioValido = false;
        }
        else {
            errorPassword.textContent = "";
        }


        // VALIDAR CONFIRMAR CONTRASEÑA

        if (confirmarPassword.value !== valorPassword) {
            errorConfirmarPassword.textContent = "Las contraseñas no coinciden.";
            formularioValido = false;
        } else {
            errorConfirmarPassword.textContent = "";
        }


        // VALIDAR REGIÓN

        if (region.value === "") {
            alert("Debes seleccionar una región.");
            formularioValido = false;
        }


        // VALIDAR COMUNA

        if (comuna.value === "") {
            alert("Debes seleccionar una comuna.");
            formularioValido = false;
        }


        // REGISTRO CORRECTO

        if (formularioValido) {

            const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

            usuarios.push({
                run: valorRun,
                correo: valorCorreo,
                password: valorPassword,
                region: region.value,
                comuna: comuna.value,
                fechaRegistro: new Date().toLocaleDateString("es-CL")
            });

            localStorage.setItem("usuarios", JSON.stringify(usuarios));

            alert("¡Registro realizado correctamente!");

            formulario.reset();
            comuna.innerHTML = "";

            const opcion = document.createElement("option");
            opcion.value = "";
            opcion.textContent = "-- Selecciona primero una Región --";
            comuna.appendChild(opcion);

        }

    });

}



// ==========================================
// LOGIN
// ==========================================

const formularioLogin = document.getElementById("form-login");

if (formularioLogin) {

    const correoLogin = document.getElementById("login-correo");
    const passwordLogin = document.getElementById("login-password");
    const errorCorreoLogin = document.getElementById("error-login-correo");
    const errorPasswordLogin = document.getElementById("error-login-password");

    formularioLogin.addEventListener("submit", function (event) {

        event.preventDefault();

        let formularioValido = true;

        if (correoLogin.value.trim() === "") {
            errorCorreoLogin.textContent = "El correo es obligatorio.";
            formularioValido = false;
        }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correoLogin.value.trim())) {
            errorCorreoLogin.textContent = "Ingresa un correo electrónico válido.";
            formularioValido = false;
        }
        else {
            errorCorreoLogin.textContent = "";
        }

        if (passwordLogin.value === "") {
            errorPasswordLogin.textContent = "La contraseña es obligatoria.";
            formularioValido = false;
        }
        else if (passwordLogin.value.length < 4 || passwordLogin.value.length > 10) {
            errorPasswordLogin.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
            formularioValido = false;
        }
        else {
            errorPasswordLogin.textContent = "";
        }

        if (formularioValido) {

            const usuario = {
                correo: correoLogin.value.trim(),
                rol: correoLogin.value.trim() === "admin@duoc.cl" ? "admin" : "cliente"
            };

            localStorage.setItem("usuarioActivo", JSON.stringify(usuario));

            alert("¡Inicio de sesión realizado correctamente!");
            window.location.href = "index.html";

        }

    });

}



// ==========================================
// CARRITO
// ==========================================

function obtenerCarrito() {
    return JSON.parse(localStorage.getItem("carrito")) || [];
}

function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarContadorCarrito();
}

function actualizarContadorCarrito() {
    const contador = document.getElementById("contador-carrito");
    if (!contador) return;
    const carrito = obtenerCarrito();
    const totalItems = carrito.reduce(function (sum, p) { return sum + p.cantidad; }, 0);
    contador.textContent = totalItems;
}

const botonesCarrito = document.querySelectorAll(".btn-agregar");

botonesCarrito.forEach(function (boton) {

    boton.addEventListener("click", function () {

        const nombre = boton.dataset.nombre;
        const precio = Number(boton.dataset.precio);
        const carrito = obtenerCarrito();
        const existente = carrito.find(function (p) { return p.nombre === nombre; });

        if (existente) {
            existente.cantidad += 1;
        } else {
            carrito.push({ nombre: nombre, precio: precio, cantidad: 1 });
        }

        guardarCarrito(carrito);
        alert(nombre + " fue agregado al carrito.");

    });

});


function renderizarCarrito() {

    const contenedor = document.getElementById("carrito-contenido");
    if (!contenedor) return;

    const carrito = obtenerCarrito();
    contenedor.innerHTML = "";

    if (carrito.length === 0) {
        contenedor.innerHTML = "<p>Tu carrito está vacío.</p>";
        const totalSpan = document.getElementById("carrito-total");
        if (totalSpan) totalSpan.textContent = "$0";
        return;
    }

    let total = 0;

    carrito.forEach(function (producto, index) {

        const subtotal = producto.precio * producto.cantidad;
        total += subtotal;

        const fila = document.createElement("div");
        fila.className = "carrito-item";
        fila.innerHTML =
            "<span>" + producto.nombre + "</span>" +
            "<span>Cantidad: " + producto.cantidad + "</span>" +
            "<span>$" + subtotal + "</span>" +
            "<button onclick='eliminarDelCarrito(" + index + ")'>Eliminar</button>";

        contenedor.appendChild(fila);

    });

    const totalSpan = document.getElementById("carrito-total");
    if (totalSpan) totalSpan.textContent = "$" + total;

}

function eliminarDelCarrito(index) {
    const carrito = obtenerCarrito();
    carrito.splice(index, 1);
    guardarCarrito(carrito);
    renderizarCarrito();
}


document.addEventListener("DOMContentLoaded", function () {
    renderizarCarrito();
    actualizarContadorCarrito();
});


function irAPagar() {
    const carrito = obtenerCarrito();

    if (carrito.length === 0) {
        alert("Tu carrito está vacío. Agrega productos antes de pagar.");
        return;
    }

    window.location.href = "pago.html";
}



// ==========================================
// PAGO
// ==========================================

const formularioPago = document.getElementById("form-pago");

if (formularioPago) {

    const carrito = obtenerCarrito();
    const resumenPedido = document.getElementById("resumen-pedido");
    const totalPagoSpan = document.getElementById("total-pago");

    let totalPedido = 0;

    if (resumenPedido) {

        if (carrito.length === 0) {
            window.location.href = "carrito.html";
        }

        carrito.forEach(function (producto) {

            const subtotal = producto.precio * producto.cantidad;
            totalPedido += subtotal;

            const linea = document.createElement("p");
            linea.textContent = producto.nombre + " x" + producto.cantidad + " - $" + subtotal;
            resumenPedido.appendChild(linea);

        });

        if (totalPagoSpan) {
            totalPagoSpan.textContent = "$" + totalPedido;
        }

    }


    formularioPago.addEventListener("submit", function (event) {

        event.preventDefault();

        let formularioValido = true;

        const nombre = document.getElementById("pago-nombre");
        const direccion = document.getElementById("pago-direccion");
        const numeroTarjeta = document.getElementById("pago-tarjeta");
        const fechaExpiracion = document.getElementById("pago-fecha");
        const cvv = document.getElementById("pago-cvv");

        const errorNombre = document.getElementById("error-pago-nombre");
        const errorDireccion = document.getElementById("error-pago-direccion");
        const errorTarjeta = document.getElementById("error-pago-tarjeta");
        const errorFecha = document.getElementById("error-pago-fecha");
        const errorCvv = document.getElementById("error-pago-cvv");

        if (nombre.value.trim() === "") {
            errorNombre.textContent = "El nombre es obligatorio.";
            formularioValido = false;
        } else {
            errorNombre.textContent = "";
        }

        if (direccion.value.trim() === "") {
            errorDireccion.textContent = "La dirección es obligatoria.";
            formularioValido = false;
        } else {
            errorDireccion.textContent = "";
        }

        const valorTarjeta = numeroTarjeta.value.replace(/\s/g, "");

        if (!/^[0-9]{16}$/.test(valorTarjeta)) {
            errorTarjeta.textContent = "Ingresa un número de tarjeta válido (16 dígitos).";
            formularioValido = false;
        } else {
            errorTarjeta.textContent = "";
        }

        if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(fechaExpiracion.value.trim())) {
            errorFecha.textContent = "Formato inválido. Usa MM/AA (ej: 08/27).";
            formularioValido = false;
        } else {
            errorFecha.textContent = "";
        }

        if (!/^[0-9]{3}$/.test(cvv.value.trim())) {
            errorCvv.textContent = "El CVV debe tener 3 dígitos.";
            formularioValido = false;
        } else {
            errorCvv.textContent = "";
        }

        if (formularioValido) {

            const numeroOrden = "SV-" + Date.now();

            const compra = {
                numeroOrden: numeroOrden,
                productos: obtenerCarrito(),
                total: totalPedido,
                fecha: new Date().toLocaleDateString("es-CL"),
                nombreCliente: nombre.value.trim(),
                direccion: direccion.value.trim()
            };

            localStorage.setItem("ultimaCompra", JSON.stringify(compra));
            localStorage.removeItem("carrito");

            window.location.href = "confirmacion.html";

        }

    });

}
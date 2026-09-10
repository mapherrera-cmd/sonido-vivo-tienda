// VALIDACIONES DEL FORMULARIO

const formulario = document.getElementById("form-registro");

const run = document.getElementById("run");

const correo = document.getElementById("correo");

const password = document.getElementById("password");

const errorRun = document.getElementById("error-run");

const errorCorreo = document.getElementById("error-correo");

const errorPassword = document.getElementById("error-password");

const region = document.getElementById("region");

const comuna = document.getElementById("comuna");


// COMUNAS POR REGIÓN

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


// REGIÓN → COMUNA

if (region) {

    region.addEventListener("change", function() {

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

        listaComunas.forEach(function(nombreComuna) {

            const opcion = document.createElement("option");

            opcion.value = nombreComuna;

            opcion.textContent = nombreComuna;

            comuna.appendChild(opcion);

        });

    });

}


// EVENTO DE ENVÍO DEL FORMULARIO

if (formulario) {

    formulario.addEventListener("submit", function(event) {

        // Evita que el formulario se envíe automáticamente

        event.preventDefault();

        let formularioValido = true;


        // VALIDAR RUN

        const valorRun = run.value.trim();

        if (valorRun === "") {

            errorRun.textContent = "El RUN es obligatorio.";

            formularioValido = false;

        } else if (!/^[0-9]+[0-9Kk]$/.test(valorRun)) {

            errorRun.textContent = "El RUN debe contener solo números y K, sin puntos ni guion.";

            formularioValido = false;

        } else {

            errorRun.textContent = "";

        }


        // VALIDAR CORREO

        const valorCorreo = correo.value.trim();

        if (valorCorreo === "") {

            errorCorreo.textContent = "El correo es obligatorio.";

            formularioValido = false;

        } else if (!/^[^\s@]+@(gmail\.com|duoc\.cl)$/.test(valorCorreo)) {

            errorCorreo.textContent = "Solo se permiten correos @gmail.com o @duoc.cl.";

            formularioValido = false;

        } else {

            errorCorreo.textContent = "";

        }


        // VALIDAR CONTRASEÑA

        const valorPassword = password.value;

        if (valorPassword === "") {

            errorPassword.textContent = "La contraseña es obligatoria.";

            formularioValido = false;

        } else if (valorPassword.length < 4 || valorPassword.length > 10) {

            errorPassword.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";

            formularioValido = false;

        } else {

            errorPassword.textContent = "";

        }


        // VALIDAR REGIÓN

        if (region.value === "") {

            formularioValido = false;

        }


        // VALIDAR COMUNA

        if (comuna.value === "") {

            formularioValido = false;

        }


        // RESULTADO

        if (formularioValido) {

            alert("Registro válido. Formulario enviado correctamente.");

            formulario.reset();

            comuna.innerHTML = "";

            const opcion = document.createElement("option");

            opcion.value = "";

            opcion.textContent = "-- Selecciona primero una Región --";

            comuna.appendChild(opcion);

        }

    });

}


// CARRITO - PRUEBA

// CARRITO - LOCALSTORAGE

const botonesCarrito = document.querySelectorAll(".btn-agregar");

botonesCarrito.forEach(function(boton) {

    boton.addEventListener("click", function() {

        const nombre = boton.dataset.nombre;

        const precio = Number(boton.dataset.precio);


        // Obtener carrito existente

        let carrito = JSON.parse(localStorage.getItem("carrito")) || [];


        // Crear producto

        const producto = {
            nombre: nombre,
            precio: precio,
            cantidad: 1
        };


        // Agregar producto al carrito

        carrito.push(producto);


        // Guardar carrito en LocalStorage

        localStorage.setItem("carrito", JSON.stringify(carrito));


        console.log("Producto agregado:", producto);

        console.log("Carrito:", carrito);

        alert("Producto agregado al carrito.");

    });

});


// MOSTRAR CARRITO

const cuerpoCarrito = document.getElementById("cuerpo-carrito");

const totalCarrito = document.getElementById("total-carrito");


if (cuerpoCarrito) {

    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    let total = 0;


    carrito.forEach(function(producto) {

        const fila = document.createElement("tr");

        const subtotal = producto.precio * producto.cantidad;

        total = total + subtotal;


        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>$${producto.precio.toLocaleString("es-CL")}</td>
            <td>${producto.cantidad}</td>
            <td>$${subtotal.toLocaleString("es-CL")}</td>
            <td>
                <button class="btn-quitar">
                    Quitar
                </button>
            </td>
        `;


        cuerpoCarrito.appendChild(fila);

        fila.querySelector(".btn-quitar").addEventListener("click", function() {

            carrito.splice(carrito.indexOf(producto), 1);

            localStorage.setItem("carrito", JSON.stringify(carrito));

            location.reload();

});

    // CONTADOR DEL CARRITO

const contadorCarrito = document.getElementById("contador-carrito");

if (contadorCarrito) {

    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];

    contadorCarrito.textContent = `🛒 Carrito (${carrito.length})`;

}

    });


    totalCarrito.textContent = `Total: $${total.toLocaleString("es-CL")}`;

}


// PRUEBA DE CARGA DEL JAVASCRIPT

console.log("VALIDACIONES.JS CARGADO EN ESTA PÁGINA");
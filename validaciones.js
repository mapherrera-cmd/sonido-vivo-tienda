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
    //CARRITO - LOCALSTORAGE

    const botonesCarrito = document.querySelectorAll(".btn-agregar");

    botonesCarrito.forEach(function(boton){

            const nombre = boton.dataset-nombre;
            const precio = Number(boton.dataset.precio);

            console.log("Producto:", nombre);
            console.log("Precio:", precio);

    });

});
}
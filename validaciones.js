// Esperamos a que todo el HTML cargue antes de ejecutar el JavaScript
document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 1. LÓGICA DE REGIONES Y COMUNAS DINÁMICAS
    // ==========================================
    
    // Objeto que guarda las regiones como "llaves" y sus comunas como "listas" (arreglos)
    const regionesYComunas = {
        valparaiso: ["Valparaíso", "Viña del Mar", "Quilpué", "Villa Alemana", "Concón", "Casablanca"],
        metropolitana: ["Santiago", "Providencia", "Ñuñoa", "Maipú", "Puente Alto", "La Florida"]
    };

    // Capturamos las cajas de selección (select) del HTML de Registro
    const selectRegion = document.getElementById('region');
    const selectComuna = document.getElementById('comuna');

    // Si existen estos elementos en la página actual, ejecutamos el código
    if (selectRegion && selectComuna) {
        // Escuchamos cada vez que el usuario cambia la opción de Región
        selectRegion.addEventListener('change', function() {
            const regionSeleccionada = this.value;
            
            // Limpiamos las comunas anteriores
            selectComuna.innerHTML = '<option value="">-- Selecciona una Comuna --</option>'; 
            
            // Si el usuario eligió una región válida, llenamos las comunas
            if (regionSeleccionada && regionesYComunas[regionSeleccionada]) {
                regionesYComunas[regionSeleccionada].forEach(function(comuna) {
                    // Creamos una nueva etiqueta <option> por cada comuna
                    const opcion = document.createElement('option');
                    opcion.value = comuna.toLowerCase().replace(" ", "-");
                    opcion.textContent = comuna;
                    // La agregamos al selector de comunas
                    selectComuna.appendChild(opcion);
                });
            }
        });
    }


    // ==========================================
    // 2. VALIDACIÓN DEL FORMULARIO DE REGISTRO
    // ==========================================
    const formRegistro = document.getElementById('form-registro');
    
    if (formRegistro) {
        formRegistro.addEventListener('submit', function(evento) {
            evento.preventDefault(); // Evita que la página se recargue al enviar el formulario
            let formularioValido = true;

            // A. Validar RUN (Sin puntos ni guion)
            const runInput = document.getElementById('run').value;
            const errorRun = document.getElementById('error-run');
            // Expresión regular: Busca solo números del principio al fin (y puede terminar en K)
            const formatoRun = /^[0-9]+[0-9kK]$/; 
            
            if (!formatoRun.test(runInput)) {
                errorRun.textContent = "Error: El RUN debe ingresarse sin puntos ni guion.";
                errorRun.style.display = "block"; // Muestra el mensaje rojo
                formularioValido = false;
            } else {
                errorRun.style.display = "none"; // Oculta el mensaje si está correcto
            }

            // B. Validar Correo (@duoc.cl o @gmail.com)
            const correoInput = document.getElementById('correo').value;
            const errorCorreo = document.getElementById('error-correo');
            
            if (!correoInput.endsWith('@duoc.cl') && !correoInput.endsWith('@gmail.com')) {
                errorCorreo.textContent = "Error: Solo se permiten correos @duoc.cl o @gmail.com";
                errorCorreo.style.display = "block";
                formularioValido = false;
            } else {
                errorCorreo.style.display = "none";
            }

            // C. Validar Contraseña (Segura: 4 a 10 caracteres)
            const passInput = document.getElementById('password').value;
            const errorPass = document.getElementById('error-password');
            
            if (passInput.length < 4 || passInput.length > 10) {
                errorPass.textContent = "Error: La contraseña debe tener entre 4 y 10 caracteres.";
                errorPass.style.display = "block";
                formularioValido = false;
            } else {
                errorPass.style.display = "none";
            }

            // Si todo está correcto, mostramos éxito
            if (formularioValido) {
                alert("¡Registro exitoso! Bienvenido a Sonido Vivo.");
                // Aquí el formulario se enviaría de verdad en un sistema con base de datos
            }
        });
    }


    // ==========================================
    // 3. BASE DEL CARRITO DE COMPRAS (LocalStorage)
    // ==========================================
    // Esto captura todos los botones que dicen "Añadir al carrito" en el Home o Productos
    const botonesAgregar = document.querySelectorAll('.btn-agregar');
    
    botonesAgregar.forEach(function(boton) {
        boton.addEventListener('click', function() {
            // Buscamos el nombre y precio del producto al que le hicimos clic
            const producto = this.parentElement;
            const titulo = producto.querySelector('h4').textContent;
            
            // Le avisamos al usuario
            alert(titulo + " fue agregado al carrito.");
            
            // Guardamos en LocalStorage (La memoria del navegador)
            let carritoGuardado = localStorage.getItem('carritoSonidoVivo');
            let carritoArreglo = carritoGuardado ? JSON.parse(carritoGuardado) : [];
            
            carritoArreglo.push(titulo);
            localStorage.setItem('carritoSonidoVivo', JSON.stringify(carritoArreglo));
        });
    });

});
# 🎵 Sonido Vivo - Tienda de Instrumentos Musicales

Bienvenido al repositorio oficial de **Sonido Vivo**, una plataforma web (Front-end) diseñada para la venta de instrumentos y equipos musicales. 

Este proyecto fue desarrollado utilizando HTML5, CSS3 y Vanilla JavaScript, aplicando buenas prácticas de diseño responsivo y validaciones de datos del lado del cliente.

---

## 🚀 Características Principales

El sistema se divide en dos áreas funcionales:

### 1. Módulo Público (Clientes)
* **Catálogo Dinámico:** Visualización de productos con imágenes, precios y descripciones.
* **Carrito de Compras:** Sistema funcional utilizando `LocalStorage` para agregar, sumar y eliminar productos sin perder la información al recargar la página.
* **Registro de Usuarios:** Formulario con validación estricta de RUN (sin puntos ni guion), claves (4 a 10 caracteres) y selectores dinámicos de Región y Comuna.
* **Autenticación (Login):** Validación de dominios autorizados (`@duoc.cl`, `@profesor.duoc.cl`, `@gmail.com`).

### 2. Módulo Administrador (Mantenedores)
* **Dashboard Administrativo:** Panel de control con menú lateral (sidebar).
* **Gestión de Usuarios:** Interfaz para crear, editar y eliminar cuentas con asignación de roles.
* **Gestión de Productos:** Formulario para ingresar nuevos instrumentos con validaciones de precio, stock, stock crítico y código de producto (mínimo 3 caracteres).

---

## 🛠️ Tecnologías Utilizadas

* **HTML5:** Estructura semántica.
* **CSS3:** Estilos personalizados, Flexbox, Grid y Media Queries para adaptabilidad móvil (Responsive Design).
* **JavaScript (ES6):** Manipulación del DOM, validaciones con expresiones regulares y gestión de eventos.

---

## ⚙️ Instalación y Uso

Dado que es un proyecto puramente Front-end, no requiere instalación de dependencias ni bases de datos.

1. Clona este repositorio:
   ```bash
   git clone [https://github.com/tu-usuario/sonido-vivo.git](https://github.com/tu-usuario/sonido-vivo.git)
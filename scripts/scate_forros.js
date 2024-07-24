// Verificar si el carro existe en localStorage
if (!localStorage.getItem("carro")) {
    localStorage.setItem("carro", "[]");
    console.log("El carro no existe");
} else {
    console.log("El carro existe");
}

// Función para capitalizar la primera letra de una cadena
function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Obtener la categoría del localStorage y capitalizarla
const categoria = localStorage.getItem('categoria');
const disponible = capitalizarPrimeraLetra(categoria);

// Actualizar el HTML con la categoría disponible
const disponibleHTML = document.getElementById("disponibleHTML");
disponibleHTML.innerHTML = `${disponible} Disponibles`;

// Obtener el contenedor de productos
const productosContainer = document.getElementById("productos-container");

// Obtener la lista de productos filtrados por categoría
const productos_lista = productos[localStorage.getItem("forro")].filter(producto => producto.tipo === localStorage.getItem("categoria"));

// Función para generar el contenido de cada producto
function generarContenidoProducto(producto) {
    // Formatear el precio sin decimales y sin símbolo de moneda
    const precioFormateado = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(producto.precio);
    const precioSinDecimales = precioFormateado.replace('ARS', '').trim(); // Eliminar 'ARS' y espacios en blanco
    
    // Obtener información del carrito desde localStorage
    const carri = JSON.parse(localStorage.getItem("carro") || "[]");
    let valor_cantidad = 0;

    // Buscar la cantidad de este producto en el carrito
    carri.forEach(producta => {
        if (producta && producto.ref === producta.ref) {
            valor_cantidad = producta.cantidad;
        }
    });

    // Crear el elemento HTML del producto
    const productoElement = document.createElement("div");
    productoElement.classList.add("col-md-6", "col-lg-4");
    productoElement.innerHTML = `
        <div class="card">
            <img src="${producto.imagen}" class="card-img-top" alt="Imagen de ${producto.nombre}" loading="lazy">
            <div class="card-body">
                <h5 class="card-title font-weight-bold">${producto.nombre}</h5>
                <div class="d-flex flex-row justify-content-between mb-1">
                    <p class="precio">Precio: $${precioSinDecimales}</p>
                    <button id="${producto.ref}" class="btn-primary rounded ver-mas">Ver más</button>
                </div>
                <div class="acciones">
                    <button id="${producto.ref}" class="agregar btn-light restar">-</button>
                    <span id="cantidad-${producto.ref}" class="numeroCantidad ${producto.ref}">${valor_cantidad}</span>
                    <button id="${producto.ref}" class="agregar btn-light sumar">+</button>
                </div>
            </div>
        </div>
    `;
    return productoElement;
}

// Iterar sobre los productos y agregarlos al contenedor
productos_lista.forEach(producto => {
    const productoElement = generarContenidoProducto(producto);
    productosContainer.appendChild(productoElement);
});

// Delegación de eventos para botones de agregar y restar cantidad
productosContainer.addEventListener('click', event => {
    const id = event.target.id;
    if (event.target.classList.contains('sumar')) {
        sumarCantidad(id);
    } else if (event.target.classList.contains('restar')) {
        restarCantidad(id);
    } else if (event.target.classList.contains('ver-mas')) {
        openModal(id);
    }
});

// Funciones sumarCantidad, restarCantidad y openModal deben ser definidas aquí
// para manejar los eventos delegados correctamente.

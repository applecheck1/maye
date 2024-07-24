function modalProducto(iddd){
    var alelo=JSON.parse(localStorage.getItem("carro")).find(p => p.ref === iddd);
}

let currentIndex = 0;
const modal = document.getElementById('imageModal');
const modalImage = document.querySelector('.modal-image');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.querySelector('.close');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
let images = [];
let nombreModal = '';

var cantidad_guardar=0
JSON.parse(localStorage.getItem("carro")).forEach(cantidad_json=>{
    if(cantidad_json.cantidad>0){
        cantidad_guardar=cantidad_guardar+cantidad_json.cantidad
    }
})
document.getElementById('carrito-cantidad').innerHTML=cantidad_guardar

// Función para abrir el modal y actualizar la imagen
function openModal(idd) {
    modal.style.display = 'block';
    updateImage(idd);
}

// Función para cerrar el modal
function closeModal() {
    modal.style.display = 'none';
}

// Función para actualizar la imagen del modal
function updateImage(valor_id) {
    const categoria = localStorage.getItem("categoria");
    const productosCategoria = productos[categoria] || [];
    const producto = productosCategoria.find(p => p.ref === valor_id);

    if (producto) {
        images = producto.imagenes || [];
        nombreModal = producto.nombre || '';
        document.getElementById('nombreMmodal').innerHTML = nombreModal;
        modalImage.src = images[currentIndex] || '';
    } else {
        console.warn('Producto no encontrado');
    }
}

// Función para mostrar la imagen anterior
function showPrevImage() {
    if (images.length) {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        modalImage.src = images[currentIndex];
    }
}

// Función para mostrar la imagen siguiente
function showNextImage() {
    if (images.length) {
        currentIndex = (currentIndex + 1) % images.length;
        modalImage.src = images[currentIndex];
    }
}

// Eventos para los botones de cerrar, anterior y siguiente
closeModalBtn.addEventListener('click', closeModal);
prevBtn.addEventListener('click', showPrevImage);
nextBtn.addEventListener('click', showNextImage);

// Cerrar el modal al hacer clic fuera de él
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

// Inicializa el carrito en el localStorage si no existe
function crear_carro() {
    if (!localStorage.getItem("carro")) {
        localStorage.setItem("carro", JSON.stringify([]));
    }
}

// Función para sumar la cantidad de un producto en el carrito
function sumarCantidad(xmas) {
    crear_carro();
    const carro = JSON.parse(localStorage.getItem("carro"));
    const productoExistente = carro.find(p => p.ref === xmas);

    if (productoExistente) {
        productoExistente.cantidad++;
    } else {
        const producto = productos[localStorage.getItem("categoria")].find(p => p.ref === xmas);
        if (producto) {
            carro.push({
                nombre: producto.nombre || "",
                imagen: producto.imagen || "",
                precio: producto.precio || "",
                ref: producto.ref || "",
                cantidad: 1
            });
        }
    }

    localStorage.setItem("carro", JSON.stringify(carro));
    actualizarCantidadCarrito(carro, xmas);
}

// Función para restar la cantidad de un producto en el carrito
function restarCantidad(xmenos) {
    crear_carro();
    const carro = JSON.parse(localStorage.getItem("carro"));
    const producto = carro.find(p => p.ref === xmenos);

    if (producto && producto.cantidad > 0) {
        producto.cantidad--;
        if (producto.cantidad === 0) {
            const index = carro.indexOf(producto);
            carro.splice(index, 0);
        }
    }

    localStorage.setItem("carro", JSON.stringify(carro));
    actualizarCantidadCarrito(carro, xmenos);
}

// Actualiza la cantidad en la interfaz y en el carrito
function actualizarCantidadCarrito(carro, ref) {
    const totalCantidad = carro.reduce((acc, producto) => acc + (producto.cantidad || 0), 0);
    document.getElementById('carrito-cantidad').textContent = totalCantidad;

    carro.forEach(producto => {
        if (producto.ref === ref) {
            document.querySelector(`.${producto.ref}`).textContent = producto.cantidad;
        }
    });

    document.getElementById('carrito').style.display = 'none';
}

// Función para formatear números en formato de moneda
function formato(num) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(num).replace(/,/g, '.');
}

// Muestra el contenido del carrito
function mostrarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    listaCarrito.innerHTML = '';

    const carro = JSON.parse(localStorage.getItem("carro"));
    let total = 0;

    carro.forEach(item => {
        if (item.cantidad > 0) {
            const li = document.createElement('li');
            //const sp = document.createElement('span');
            //sp.id = '${item.ref}';
            //sp.innerHTML = '&times;';
            li.addEventListener('click', modalProducto(this.id));
            li.id=`${item.ref}`
            li.textContent = `🌟 ${item.nombre}: ${item.cantidad} x ${formato(item.precio)} = ${formato(item.cantidad * item.precio)}`;
            //li.appendChild(sp);
            listaCarrito.appendChild(li);
            total += item.cantidad * item.precio;
        }
    });

    document.getElementById('total').textContent = `Total: ${formato(total)}`;
    const carritoElement = document.getElementById('carrito');
    //carritoElement.style.display = carro.length > 0 ? 'block' : 'none';
    if (carritoElement.style.display === 'block') {
        // Si está en 'block' o no tiene un valor definido (es decir, se usa el valor predeterminado CSS), ocúltalo
        carritoElement.style.display = 'none';
    } else {
        // Si no está en 'block', muéstralo
        carritoElement.style.display = 'block';
    }
}

// Envía un pedido a través de WhatsApp
function enviarPedido() {
    const carro = JSON.parse(localStorage.getItem("carro"));
    let mensaje = `📲 ¡Hola! 🌟 Mi pedido es:\n\n`;
    let total = 0;

    carro.forEach(item => {
        if (item.cantidad > 0) {
            mensaje += `🔅 *${item.nombre} (${item.ref})*:\n`;
            mensaje += `   📦${item.cantidad} 💰${formato(item.precio)}/u: ${formato(item.cantidad * item.precio)}\n\n`;
            total += item.cantidad * item.precio;
        }
    });

    mensaje += `✅ Total: *${formato(total)}*\n`;

    const linkWhatsApp = `https://wa.me/573155370380/?text=${encodeURIComponent(mensaje)}`;
    window.open(linkWhatsApp, '_blank');
}

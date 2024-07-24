if(localStorage.getItem("carro")){
    console.log("El carro existe")
}else{
    localStorage.setItem("carro","[]")
    console.log("El carro no existe")
}
function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
const categoria=localStorage.getItem('categoria');
const disponible=capitalizarPrimeraLetra(categoria);
const disponibleHTML = document.getElementById("disponibleHTML");
disponibleHTML.innerHTML=disponible+' Disponibles';
const productosContainer = document.getElementById("productos-container");
// Iterar sobre los productos de la categoría "cargadores"
productos[categoria].forEach(producto => {
    const productoElement = document.createElement("div");
    productoElement.classList.add("col-md-6", "col-lg-4");
    // Formatear el precio sin decimales y sin símbolo de moneda
    const precioFormateado = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(producto.precio);
    const precioSinDecimales = precioFormateado.replace('ARS', '').trim(); // Eliminar 'ARS' y espacios en blanco
    
    const carri = JSON.parse(localStorage.getItem("carro") || "[]")
    var valor_cantidad=0
    carri.forEach(producta => {
        if(producta && producto.ref==producta.ref){
            valor_cantidad=producta.cantidad
        }
    });

    productoElement.innerHTML = `
        <div class="card">
            <img src="${producto.imagen}" class="card-img-top" alt="Imagen de ${producto.nombre}">
            <div class="card-body">
                <h5 class="card-title font-weight-bold">${producto.nombre}</h5>
                <div class="d-flex flex-row justify-content-between mb-1">
                    <p class="precio">Precio: $${precioSinDecimales}</p>
                    <button id="${producto.ref}" class="btn-primary rounded" onclick="openModal(this.id)">Ver más</button>
                </div>
                <div class="acciones">
                    <button id="${producto.ref}" class="agregar btn-light" onclick="restarCantidad(this.id)">-</button>
                    <span id="cantidad1" class="numeroCantidad ${producto.ref}">${valor_cantidad}</span>
                    <button id="${producto.ref}" class="agregar btn-light" onclick="sumarCantidad(this.id)">+</button>
                </div>
            </div>
        </div>
    `;
    productosContainer.appendChild(productoElement);
});


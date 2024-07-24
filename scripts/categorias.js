// Seleccionar todos los enlaces con la clase 'enlace'
const enlaces = document.querySelectorAll('a');

// Iterar sobre los enlaces y aplicar algún comportamiento a uno específico
for (let i = 0; i < enlaces.length; i++) {
    enlaces[i].addEventListener('click', function(event) {
      //event.preventDefault();
        console.log(`Se hizo clic en Enlace ${i + 1} ${event.target.id}`);
        localStorage.setItem("categoria",event.target.id)
        localStorage.setItem("nombre_categoria",event.target.innerHTML)
        // Más acciones aquí
    });
}

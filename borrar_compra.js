function borrar_carro(){
    localStorage.removeItem("carro")
    localStorage.setItem("carro","[]")
    document.getElementById("carrito").style.display = 'none';
    document.getElementById("carrito-cantidad").innerHTML='0';
    productos[localStorage.getItem("categoria")].forEach(producto => {
        const element = document.querySelector('.' + producto.ref);
        element.innerHTML='0'
    })
}
function borrar_carro(){
    localStorage.removeItem("carro")
    localStorage.setItem("carro","[]")
    document.getElementById("carrito").style.display = 'none';
    document.getElementById("carrito-cantidad").innerHTML='0';
    productos[localStorage.getItem("forro")].forEach(
    producto => {
        if(producto.tipo == localStorage.getItem("categoria")){
            const element = document.querySelector('.' + producto.ref);
            element.innerHTML='0'
        }
    })
}
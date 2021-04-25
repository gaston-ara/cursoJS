// Funciones
function generarCatalogo(producto){
    $("#articulos").append(componentesCatalogo(producto));
}
function agregarAlCarrito(e, datos) {
    let objEncontrado = datos.find(function (elemento) { return elemento.id == e.target.id });
        carrito.push(objEncontrado);
}
function generarListaCarrito(producto) {
    $("#lista-carro").append(componentesCarrito(producto));
}
function eliminarFilter(id) {
    carrito = carrito.filter(producto => producto.id != id);
}
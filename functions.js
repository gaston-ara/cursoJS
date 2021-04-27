// Funciones
function generarCatalogo(producto){ // Esta funcion toma una plantilla de un card html del archivo "components" y la imprime con los datos de un producto en la seccion de catalogo de productos de la pagina
    $("#articulos").append(componentesCatalogo(producto));
}
function agregarAlCarrito(e, datos) { //Esta funcion busca un producto en el JSON de productos que coincida su id con el id del producto impreso en el catalogo y lo envia a la variable carrito.
    let objEncontrado = datos.find(function (elemento) { return elemento.id == e.target.id });
        carrito.push(objEncontrado);
}
function generarListaCarrito(producto) { //Esta funcion toma un plantilla de una fila con los datos de un producto del archivo "components" y la imprime en la lista del modal del carrito con los datos de los productos seleccionados.
    $("#lista-carro").append(componentesCarrito(producto));
}
function eliminarFilter(id) { //Esta funcion modifica la variable carrito filtrando y dejando solo los productos que tienen el id diferente al seleccionado para eliminar del carrito.
    carrito = carrito.filter(producto => producto.id != id);
}
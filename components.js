// Plantilla del catálogo de productos
function componentesCatalogo(producto) {
    return `<div class="col-sm-12 col-md-6 col-lg-4 columna">
                <div class="card" id="${producto.id}" style="width: 18rem;">
                    <img src="${producto.imagen}" class="card-img-top img-fluid imagenCard" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${producto.titulo}</h5>
                        <p class="card-text">$${producto.precio}</p>
                        <a href="#" class="btn btn-primary add" id="${producto.id}">Agregar al carrito</a>
                    </div>
                </div>
            </div>`
}

// Plantilla- lista del carrito
function componentesCarrito(producto) {
    return `<tr><td class="px-4">
            <img class="img-fluid" src="${producto.imagen}">
            </td>
            <td class="px-4">${producto.titulo}</td>
            <td class="px-3">$${producto.precio}</td>
            <td><a href="#" class="borrar-prod" id="${producto.id}">Eliminar</a></td></tr>`
}
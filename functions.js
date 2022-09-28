// Funciones
const getProducts = async () => { //Se obtienen los productos del json para pasarlo a un array al iniciar la pagina
    try {
        let res = await fetch(jsonProducts);
        let data = await res.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
const renderProducts = async (productos) => { //Se renderizan los productos 
    try {
        productos.map(producto => {
            return catalogue.innerHTML += componentesCatalogo(producto);
        })
    } catch (error) {
        console.error(error)
    }
}
const addToCart = (idOnclick) => { //Se agregan los productos seleccionados al carrito
    try {
        let selectedProduct = productos.find((item) => item.id == idOnclick);
        cart.push(selectedProduct);
        return console.log(cart);
    } catch (error) {
        console.error(error);
    }

}
const renderCart = (producto) => { //Se renderizan componentes de lista del carrito con los productos agregados
    try {
        cartList.innerHTML += componentesCarrito(producto);
    } catch (error) {
        console.error();
    }

}
const cartDelete = (id) => { //Se elimina un producto filtrandolo del resto
    try {
        cart = cart.filter(producto => producto.id != id)
    } catch (error) {
        console.error(error);
    }
}
const getGeoRef = async () => { //Se obtienen las provincias de la api de GeoRef
    try {
      let res = await fetch(apiProvincia);
    let data = await res.json();
    return data;  
    } catch (error) {
        console.error(error);
    }
    
}
const getCities = async () => { //Se obtienen las ciudades de la api de GeoRef
    let apiMuni = `https://apis.datos.gob.ar/georef/api/municipios?provincia=${provinceInput.value}&campos=id,nombre&max=100`;

    try {
        let res = await fetch(apiMuni);
        let data = await res.json();
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

pedirCupon = prompt("Si tiene un cupón ingrese su código y obtenga un descuento");

class Articulo{

    constructor(nombre, precio, cupon){
        this.nombre = nombre;
        this.precio = precio;
        this.cupon = cupon;
    }

    getDescuento = function(){
        return this.precio * 0.7;
    }
}

var articulo_1 = new Articulo("Zapatillas", 19999, "cuponzapatillas");
var articulo_2 = new Articulo("Buzo", 7599, "cuponbuzo");
var articulo_3 = new Articulo("Pantalon", 6999, "cuponpantalon");



if (pedirCupon == articulo_1.cupon) {
    alert("Podes comprar las zapatillas a $" + articulo_1.getDescuento().toFixed());
} else if (pedirCupon == articulo_2.cupon) {
    alert("Podes comprar el buzo a $" + articulo_2.getDescuento().toFixed());
} else if (pedirCupon == articulo_3.cupon) {
    alert("Podes comprar el pantalon a $" + articulo_3.getDescuento().toFixed());
}

// Arrays

class Compras{
    contructor(numProductos){
        this.numProductos = numProductos;
        this.carro= [];
    }
    alCarrito = function(producto){
        this.carro.push(producto);
    }
        
}

// var resultado_1 = articulo_1.split(', ');

// console.log(resultado_1);
articulo_1.toString();
console.log(typeof articulo_1);
pedirCupon = prompt("Si tiene un cupón ingrese su código y obtenga un descuento");

class Articulo {

    constructor(nombre, precio, cupon) {
        this.nombre = nombre;
        this.precio = precio;
        this.cupon = cupon;
        this.menorMayor = [];
    }

    getDescuento = function () {
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


// Arrays Email de registro ToLowerCase.

var usuario1 = ["Nicolas", "Rodriguez", "NicoRodriguez@gmail.com", "123456"]
console.log(usuario1[2].toLowerCase());


// Arrays orden menor a mayor

var ordenPrecios = [7599, 6299, 2159, 6999, 5999, 19999]

ordenPrecios.sort((a, b) => {
    if (a > b) {
        return 1;
    }
    if (a < b) {
        return -1;
    }
    return 0;
});

console.log(ordenPrecios);

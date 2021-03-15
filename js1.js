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


// Inicio sesion

var cuentas = []

function getLogin(){
    var email = document.getElementById("mail").value
    var contrasena = document.getElementById("password").value

    for(i = 0; i < cuentas.length; i++){
        if(email == cuentas[i].email && contrasena == cuentas[i].contrasena){
            document.getElementById("inicioSesion").innerHTML= cuentas[i].nombre + " " + cuentas[i].apellido
            console.log("Sesión iniciada")
            $('#sesionModal').modal('hide');
            return
        }
    }
    document.getElementById("errorInicio").innerHTML="Contraseña o email incorrecto"
}

// Registro de usuario

function nuevoUsuario(){
    var regNombre = document.getElementById("nombre").value
    var regApellido = document.getElementById("apellido").value
    var regEmail = document.getElementById("email").value
    var regContrasena = document.getElementById("contraseña").value
    var nuevaCuenta = {
        nombre: regNombre,
        apellido: regApellido,
        email: regEmail,
        contrasena: regContrasena
    }

    for(i = 0; i < cuentas.length; i++){
        if(regEmail == cuentas[i].email){
            document.getElementById("emailError").innerHTML="Este email ya ha sido registrado"
            return
        } else if (regContrasena.length < 8) {
            document.getElementById("validacion").innerHTML="Ingrese un mínimo de 8 caracteres"
            return
        }
    }
    cuentas.push(nuevaCuenta)
    console.log("Nueva cuenta creada")
    console.log(cuentas)
    $('#registroModal').modal('hide');

}
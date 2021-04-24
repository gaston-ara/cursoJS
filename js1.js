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
// Api Georef - Formulario de compra
const apiProvincia = "https://apis.datos.gob.ar/georef/api/provincias"
$(document).ready(function () {
    $.get(apiProvincia, function (datos) {
        console.log(datos.provincias);
        $("#provincia").empty();
        for (const provincia of datos.provincias) {
            $("#provincia").append(`<option value="${provincia.id}">${provincia.nombre}</option>`);
        }
    });
});

$("#provincia").change(function (e) {
    e.preventDefault();
    console.log(this.value);
    let apiMuni = `https://apis.datos.gob.ar/georef/api/municipios?provincia=${this.value}&campos=id,nombre&max=100`
    $.get(apiMuni, function (datos) {
        console.log(datos.municipios);
        $("#localidad").empty();
        for (const municipio of datos.municipios) {
            $("#localidad").append(`<option value="${municipio.id}">${municipio.nombre}</option>`);
        }
    });
});

// Formulario de compra
$("#entregaForm").submit(function (e) { 
    e.preventDefault();
    console.log(e.target);
    $("#modal-formulario").modal("hide");
 });

// Inicio sesion
var cuentas = []

function getLogin() {
    var email = document.getElementById("mail").value
    var contrasena = document.getElementById("password").value
    $("#errorInicio").empty();
    for (i = 0; i < cuentas.length; i++) {
        if (email == cuentas[i].email && contrasena == cuentas[i].contrasena) {
            document.getElementById("inicioSesion").innerHTML = cuentas[i].nombre + " " + cuentas[i].apellido
            // Animaciones
            $(".notificaciones").hide();
            $(".notificaciones").html(`<p class="activar bg-success text-white">Sesión iniciada</p>`);
            $(".notificaciones").slideDown(300).delay(2000).animate({ width: 'toggle' }, 100);
            console.log("Sesión iniciada")
            $('#sesionModal').modal('hide');
            return
        }
    }
    $("#errorInicio").append("Contraseña o email incorrecto").css("color", "red");
}

// Registro de usuario

function nuevoUsuario() {
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
    $("#emailError").empty();
    $("#validacion").empty();
    for (i = 0; i < cuentas.length; i++) {
        if (regEmail == cuentas[i].email) {
            $("#emailError").append("Este email ya ha sido registrado").css("color", "red");
            return
        } else if (regContrasena.length < 8) {
            $("#validacion").append("Ingrese un mínimo de 8 caracteres").css("color", "red");
            return
        }
    }

    cuentas.push(nuevaCuenta)
    // Animaciones
    $(".notificaciones").hide();
    $(".notificaciones").html(`<p class="activar bg-success text-white">Nueva cuenta creada</p>`);
    $(".notificaciones").slideDown(300).delay(2000).animate({ width: 'toggle' }, 100);
    console.log(cuentas)
    $('#registroModal').modal('hide');
}

// Carrito de compras
let carrito = [];

if (carrito.length === 0) {
    $("#lista-carro").append(`<p class="text-center fs-2">Tu carrito está vacío</p>`);
}

$.getJSON("../data/articulos.json", function (datos, estado) {

    for (let index = 0; index < datos.length; index++) {
        generarCatalogo(datos[index]);
    }

    // Buscador
    $("#btnBuscar").click(function (e) {
        e.preventDefault();
        console.log($("#searcher").val().toLowerCase());
        console.log(datos[1].titulo)
        for (let index = 0; index < datos.length; index++) {
            if ($("#searcher").val().toLowerCase() == datos[index].titulo.toLowerCase()) {
                $("#articulos").empty();
                generarCatalogo(datos[index]);
            }
        }
    });

    // Agregar al carrito
    $(".add").click(function (e) {
        e.preventDefault();
        agregarAlCarrito(e, datos);
        $("#lista-carro").empty();
        let precioTotal = 0;
        for (const producto of carrito) {
            precioTotal = precioTotal + producto.precio;
            generarListaCarrito(producto);
        }
        $("#lista-carro").append(`<p class="text-center mt-4">Precio Total : $${precioTotal} </p>`);
        // Animaciones
        $(".notificaciones").hide();
        $(".notificaciones").html(`<p class="activar bg-success text-white">Producto agregado al carrito</p>`);
        $(".notificaciones").slideDown(300).delay(2000).animate({ width: 'toggle' }, 100);

        // Eliminar item del carrito
        $(".borrar-prod").click(function (e) {
            e.preventDefault();
            console.log(e.target.id);
            eliminarFilter(e.target.id);
            $("#lista-carro").empty();
            let precioTotal = 0;
            for (const producto of carrito) {
                precioTotal = precioTotal + producto.precio;
                generarListaCarrito(producto);
            }
            $("#lista-carro").append(`<p class="text-center mt-4">Precio Total : $${precioTotal} </p>`);
            if (carrito.length === 0) {
                $("#lista-carro").empty();
                $("#lista-carro").append(`<p class="text-center fs-2">Tu carrito está vacío</p>`);
            }
        });
    });

    // Vaciar carrito
    $("#vaciar").click(function (e) {
        $("#lista-carro").empty();
        carrito.length = [0];
        if (carrito.length === 0) {
            $("#lista-carro").append(`<p class="text-center fs-2">Tu carrito está vacío</p>`);
        }
        $(".notificaciones").hide();
        $(".notificaciones").html(`<p class="activar bg-success text-white">Carrito vacío</p>`);
        $(".notificaciones").slideDown(300).delay(2000).animate({ width: 'toggle' }, 100);
        $('#carritoModal').modal('hide');
    });
}
);


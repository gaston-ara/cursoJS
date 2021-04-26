
// Api Georef - Formulario de compra
const apiProvincia = "https://apis.datos.gob.ar/georef/api/provincias"
$(document).ready(function () {
    $.get(apiProvincia, function (datos) {
        $("#provincia").empty();
        for (const provincia of datos.provincias) {
            $("#provincia").append(`<option value="${provincia.id}">${provincia.nombre}</option>`);
        }
    });
});

$("#provincia").change(function (e) {
    e.preventDefault();
    let apiMuni = `https://apis.datos.gob.ar/georef/api/municipios?provincia=${this.value}&campos=id,nombre&max=100`
    $.get(apiMuni, function (datos) {
        $("#localidad").empty();
        for (const municipio of datos.municipios) {
            $("#localidad").append(`<option value="${municipio.id}">${municipio.nombre}</option>`);
        }
    });
});

// Formulario de compra

$("#entregaForm").click(function (e) {
    if ($("#nombres").val() != "" && $("#apellidos").val() != "" && $("#provincia").val() != "" && $("#localidad").val() != "" && $("#direccion").val() != "" && $("#postal").val() != "") {
        e.preventDefault();
        $('#modal-tarjeta').modal('show');
        $("#modal-formulario").modal("hide");
        $("#carritoModal").modal("hide");
    } else {
        swal({
            title: "El formulario está incompleto.",
            icon: "warning",
            button: "OK",
        });
    }
});

// Formulario de datos de tarjeta
$("#form-datos-tarjeta").click(function (e) {
    if ($("#tarjeta").val() != "" && $("#nombre-tarjeta").val() != "" && $("#mes").val() != "" && $("#año").val() != "" && $("#ccv").val() != "") {
        e.preventDefault();
        $("#modal-tarjeta").modal("hide");
        swal({
            title: "¡Gracias por tu compra!",
            text: "Te estamos enviando tu paquete",
            icon: "success",
            button: "OK",
        });
        $("#form-tarjeta").trigger("reset");
        $("#formulario-compra").trigger("reset");
        $("#lista-carro").empty();
        carrito.length = [0];
        $("#lista-carro").append(`<p class="text-center fs-2">Tu carrito está vacío</p>`);
    } else {
        swal({
            title: "El formulario está incompleto.",
            icon: "warning",
            button: "OK",
        });
    }
});

// Inicio sesion
let cuentas = []

function getLogin() {
    let email = document.getElementById("mail").value
    let contrasena = document.getElementById("password").value
    $("#errorInicio").empty();
    for (i = 0; i < cuentas.length; i++) {
        if (email == cuentas[i].email && contrasena == cuentas[i].contrasena) {
            document.getElementById("inicioSesion").innerHTML = cuentas[i].nombre + " " + cuentas[i].apellido
            // Animaciones
            $(".notificaciones").hide();
            $(".notificaciones").html(`<p class="activar bg-success text-white">Sesión iniciada</p>`);
            $(".notificaciones").slideDown(300).delay(2000).animate({ width: 'toggle' }, 100);
            $('#sesionModal').modal('hide');
            return
        }
    }
    $("#errorInicio").append("Contraseña o email incorrecto").css("color", "red");
}

// Registro de usuario


    
    $("#nuevo-usuario").click(function (e) {
        e.preventDefault();
    let regNombre = document.getElementById("nombre").value
    let regApellido = document.getElementById("apellido").value
    let regEmail = document.getElementById("email").value
    let regContrasena = document.getElementById("contraseña").value
    let nuevaCuenta = {
        nombre: regNombre,
        apellido: regApellido,
        email: regEmail,
        contrasena: regContrasena
    }
        if (regNombre != "" && regApellido != "" && regEmail != "" && regContrasena != "") {
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
    $('#registroModal').modal('hide');
    
            
        } else {
            $("#validacion").empty();
            $("#validacion").append("El formulario está incompleto.").css("color", "red");
        }
});

// Carrito de compras
let carrito = [];

if (carrito.length === 0) {
    $("#lista-carro").append(`<p class="text-center fs-2">Tu carrito está vacío</p>`);
}

$("#comprar-carrito").click(function (e) {
    e.preventDefault();
    if (carrito.length === 0) {
        swal({
            title: "No hay productos en el carrito.",
            icon: "warning",
            button: "OK",
        });
    } else {
        $('#modal-formulario').modal('show');
    }
});
$.getJSON("../data/articulos.json", function (datos, estado) {

    for (let index = 0; index < datos.length; index++) {
        generarCatalogo(datos[index]);
    }

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

// Formulario de contacto

$("#enviar-contacto").click(function (e) {
    if ($("#name").val() != "" && $("#surname").val() != "" && $("#correo").val() != "" && $("#su-mensaje").val() != "") {
        e.preventDefault();
        swal({
            title: "Mensaje enviado.",
            text: "Gracias por contactarnos.",
            icon: "success",
            button: "OK",
        });
        $("#form1").trigger("reset");
    }
});

// Api Georef - Formulario de datos de envio
const apiProvincia = "https://apis.datos.gob.ar/georef/api/provincias" //Creo una constante con la direccion de la api de provincias

$(document).ready(function () {
    $.get(apiProvincia, function (datos) { //Si la pagina esta cargada obtengo los datos de la api
        $("#provincia").empty(); //Se vacia el select de provincias del formulario de entrega
        for (const provincia of datos.provincias) {
            $("#provincia").append(`<option value="${provincia.id}">${provincia.nombre}</option>`); // En el select de provincias del formulario de entrega se imprime un option por cada provincia
        }
    });
});

$("#provincia").change(function (e) {
    e.preventDefault();
    let apiMuni = `https://apis.datos.gob.ar/georef/api/municipios?provincia=${this.value}&campos=id,nombre&max=100`
    $.get(apiMuni, function (datos) { 
        $("#localidad").empty(); // En cuanto se detecta una seleccion en el select de provincias el select de localidades se vacía
        for (const municipio of datos.municipios) {
            $("#localidad").append(`<option value="${municipio.id}">${municipio.nombre}</option>`); // En el select de localidades del formulario de entrega se imprime un option por cada municipio
        }
    });
});

// Registro de usuario

$("#nuevo-usuario").click(function (e) {
    e.preventDefault();
    //Se crean las variables para tomar los datos del formulario de registro
let regNombre = document.getElementById("nombre").value
let regApellido = document.getElementById("apellido").value
let regEmail = document.getElementById("email").value
let regContrasena = document.getElementById("contraseña").value
//Se crea una variable para almacenar la nueva cuenta creada
let nuevaCuenta = {
    nombre: regNombre,
    apellido: regApellido,
    email: regEmail,
    contrasena: regContrasena
}
    if (regNombre != "" && regApellido != "" && regEmail != "" && regContrasena != "") {
    $("#emailError").empty(); //Si el formulario esta completo se vacia el espacio de notificaciones de error en el formulario
    $("#validacion").empty(); //Se vacía el espacio de notificaciones de validación del formulario
    for (i = 0; i < cuentas.length; i++) {
    if (regEmail == cuentas[i].email) {
        $("#emailError").append("Este email ya ha sido registrado").css("color", "red"); // Si el email ingresado coincide con une email ya almacenado se da un aviso de email ya registrado.
        return
    } 
}
if (regContrasena.length < 8) {
    $("#validacion").append("Ingrese un mínimo de 8 caracteres").css("color", "red"); //Si la contraseña ingresada tiene menos de 8 caracteres se da un aviso pidiendo que ingrese minimo 8 caracteres.
    return
}
cuentas.push(nuevaCuenta) //Se envia la nueva cuenta creada a la variable de cuentas para que sea reconocida al iniciar sesion
$(".notificaciones").hide();
$(".notificaciones").html(`<p class="activar bg-success text-white">Nueva cuenta creada</p>`);
$(".notificaciones").slideDown(300).delay(2000).animate({ width: 'toggle' }, 100); //Se muestra una notificacion animada avisando que se creó una nueva cuenta
$('#registroModal').modal('hide'); //Se esconde el modal de REGISTRO DE CUENTA

        
    } else {
        $("#validacion").empty();
        $("#validacion").append("El formulario está incompleto.").css("color", "red"); //Si el formulario esta incompleto se da un aviso en el mismo formulario.
    }
});

// Inicio sesion
let cuentas = [] // Se inicia una variable vacia para almacenar las cuentas ya creadas.

function getLogin() { //Esta funcion se inicia a partir de un evento Onclick en el boton INGRESAR del modal de inicio de sesion
    let email = document.getElementById("mail").value
    let contrasena = document.getElementById("password").value
    $("#errorInicio").empty(); //Tras hacer clic en el boton INGRESAR se borra el espacio de notificaciones de error del modal
    for (i = 0; i < cuentas.length; i++) {
        if (email == cuentas[i].email && contrasena == cuentas[i].contrasena) { 
            document.getElementById("inicioSesion").innerHTML = cuentas[i].nombre + " " + cuentas[i].apellido//Tras recorrer la variable "cuentas" si el email y la contraseña coinciden con las registradas en la seccion de registro de usuario, se imprimen el nombre y el apellido del usuario en el menú.
            $(".notificaciones").hide(); // Se ocultan las notificaciones actuales
            $(".notificaciones").html(`<p class="activar bg-success text-white">Sesión iniciada</p>`); // Se imprime una nueva notificacion dando aviso del inicio de sesion.
            $(".notificaciones").slideDown(300).delay(2000).animate({ width: 'toggle' }, 100); // Se aplica unas animaciones a la notificacion
            $('#sesionModal').modal('hide'); //Se oculta el modal de inicio de sesión
            return
        }
    }
    $("#errorInicio").append("Contraseña o email incorrecto").css("color", "red"); // Si el email o la contraseña no coinciden con las registradas, se da un aviso de "contraseña o email incorrecto"
}

// Carrito de compras
let carrito = []; //Se crea una variable para almacenar los productos en el carrito

if (carrito.length === 0) {
    $("#lista-carro").append(`<p class="text-center fs-2">Tu carrito está vacío</p>`); //Si el carrito esta vacio se va a mostrar un mensaje diciendolo
}

$("#comprar-carrito").click(function (e) {
    e.preventDefault();
    if (carrito.length === 0) { //Si se da clic al boton de comprar del carrito y el carrito esta vacio va a dar un aviso diciendo  que no hay productos en el carrito.
        swal({
            title: "No hay productos en el carrito.",
            icon: "warning",
            button: "OK",
        });
    } else {
        $('#modal-formulario').modal('show'); // En el caso de que haya productos en el carrito se va a mostrar el formulario de DATOS DE ENVIO
    }
});
$.getJSON("../data/articulos.json", function (datos, estado) { //Se obtienen los datos de la lista de productos de un JSON

    for (let index = 0; index < datos.length; index++) {
        generarCatalogo(datos[index]); //Se recorren los datos del JSON y se van imprimiendo los productos del catalogo
    }

    // Agregar al carrito
    $(".add").click(function (e) {
        e.preventDefault();
        agregarAlCarrito(e, datos); //Al hacer clic en el boton AGREGAR AL CARRITO de un producto este se agrega a a la variable carrito
        $("#lista-carro").empty(); // Se vacia el modal del carrito de compras
        let precioTotal = 0; //Se declara una variable de precio total
        for (const producto of carrito) {
            precioTotal = precioTotal + producto.precio; //Se va sumando el precio de cada producto agregado al carrito en la variable precioTotal
            generarListaCarrito(producto); //Por cada producto almacenado en la variable carrito, se imprime una fila con los datos del producto en la lista del modal del carrito.
        }
        $("#lista-carro").append(`<p class="text-center mt-4">Precio Total : $${precioTotal} </p>`); //Tras recorrer la variable carrito, se imprime el precio total de los productos del carrito
        $(".notificaciones").hide();
        $(".notificaciones").html(`<p class="activar bg-success text-white">Producto agregado al carrito</p>`); //Se muestra una notificacion animada avisando que se agregó un producto al carrito
        $(".notificaciones").slideDown(300).delay(2000).animate({ width: 'toggle' }, 100);

        // Eliminar item del carrito
        $(".borrar-prod").click(function (e) {
            e.preventDefault();
            eliminarFilter(e.target.id); //Tras hacer clic en el boton eliminar de un producto en la lista del modal del carrito, se filtra ese producto de la variable carrito
            $("#lista-carro").empty(); // Se vacia el modal del carrito
            let precioTotal = 0; // Se establece el precio total en cero
            for (const producto of carrito) { //Se recorre la variable carrito, cada precio se suma al precio total y se imprime cada producto en el modal del carrito
                precioTotal = precioTotal + producto.precio;
                generarListaCarrito(producto);
            }
            $("#lista-carro").append(`<p class="text-center mt-4">Precio Total : $${precioTotal} </p>`); //Se imprime el precio total en el modal del carrito
            if (carrito.length === 0) { //Si el carrito esta vacio, se vacia el modal del carrito y se avisa que el carrito esta vacio
                $("#lista-carro").empty();
                $("#lista-carro").append(`<p class="text-center fs-2">Tu carrito está vacío</p>`);
            }
        });
    });

    // Vaciar carrito
    $("#vaciar").click(function (e) {
        $("#lista-carro").empty(); //Tras hacer clic en el boton VACIAR CARRITO del modal del carrito, se vacia el modal del carrito.
        carrito.length = [0]; //Se vacia la variable carrito
        if (carrito.length === 0) { //Si la varibale carrito esta vacia se avisa en el modal del carrito.
            $("#lista-carro").append(`<p class="text-center fs-2">Tu carrito está vacío</p>`);
        }
        $(".notificaciones").hide();
        $(".notificaciones").html(`<p class="activar bg-success text-white">Carrito vacío</p>`); //Se muestra una notificacion animada avisando que el carrito esta vacio
        $(".notificaciones").slideDown(300).delay(2000).animate({ width: 'toggle' }, 100);
        $('#carritoModal').modal('hide'); //Se oculta el modal del carrito
    });
}
);

// Formulario de datos de envio
$("#entregaForm").click(function (e) {
    if ($("#nombres").val() != "" && $("#apellidos").val() != "" && $("#provincia").val() != "" && $("#localidad").val() != "" && $("#direccion").val() != "" && $("#postal").val() != "") {
        e.preventDefault();
        $('#modal-tarjeta').modal('show'); //Si los campos del formulario requeridos no estan vacios, tras un click en el boton del form se muestra el modal con el formulario de DATOS DE TARJETA
        $("#modal-formulario").modal("hide"); //Tambien se esconde el modal del formulario de DATOS DE ENTREGA
        $("#carritoModal").modal("hide"); //Y se esconde el modal del carrito de compras
    } else {
        swal({ //En el caso de que no esté el formulario completo saldrá un aviso pidiendo completarlo
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
        $("#modal-tarjeta").modal("hide"); //Si el formulario de DATOS DE TARJETA esta completo, tras hacer clic en el boton FINALIZAR COMPRA se oculta el modal con el formulario de DATOS DE TARJETA
        swal({ // Y aparece un aviso confirmando la compra
            title: "¡Gracias por tu compra!",
            text: "Te estamos enviando tu paquete",
            icon: "success",
            button: "OK",
        });
        $("#form-tarjeta").trigger("reset"); //El formulario  de DATOS DE TARJETA se reinicia
        $("#formulario-compra").trigger("reset"); //El formulario  de DATOS DE ENTREGA se reinicia
        $("#lista-carro").empty(); // Se vacia el modal del carrito
        carrito.length = [0]; // Se vacia la variable carrito
        $("#lista-carro").append(`<p class="text-center fs-2">Tu carrito está vacío</p>`);
    } else {
        swal({ //En el caso de que no esté el formulario completo saldrá un aviso pidiendo completarlo
            title: "El formulario está incompleto.",
            icon: "warning",
            button: "OK",
        });
    }
});

// Formulario de contacto
$("#enviar-contacto").click(function (e) {
    if ($("#name").val() != "" && $("#surname").val() != "" && $("#correo").val() != "" && $("#su-mensaje").val() != "") {
        e.preventDefault();
        //Tras hacer clic en el boton de envio del formulario de contacto, si el formulario esta completo se muestra un aviso confirmando el envio del mensaje.
        swal({
            title: "Mensaje enviado.",
            text: "Gracias por contactarnos.",
            icon: "success",
            button: "OK",
        });
        $("#form1").trigger("reset");//Se reinicia el formulario
    }
});
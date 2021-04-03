// Inicio sesion

var cuentas = []
$(".activar").hide();
$(".activar").fadeIn("300");
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
            $(".notificaciones").slideDown(300).delay(2000).animate({width:'toggle'},100);
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
    $(".notificaciones").slideDown(300).delay(2000).animate({width:'toggle'},100);
    console.log(cuentas)
    $('#registroModal').modal('hide');
}

// Carrito de compras
let carrito = [];
$.getJSON("../data/articulos.json", function (datos, estado) {
        console.log(estado)
        
        for (let index = 0; index < datos.length; index++) {
            $("#articulos").append(`<div class="col-sm-12 col-md-6 col-lg-4 columna">
                                        <div class="card" id="${datos[index].id}" style="width: 18rem;">
                                            <img src="${datos[index].imagen}" class="card-img-top img-fluid imagenCard" alt="...">
                                            <div class="card-body">
                                                <h5 class="card-title">${datos[index].titulo}</h5>
                                                <p class="card-text">$${datos[index].precio}</p>
                                                <a href="#" class="btn btn-primary add" id="${datos[index].id}">Añadir al carrito</a>
                                            </div>
                                        </div>
                                    </div>`);
            
        }
        $(".add").click(function (e) {
             e.preventDefault();
            let objEncontrado = datos.find(function(elemento){return elemento.id == e.target.id});
            carrito.push(objEncontrado);
            console.log(carrito);
            $("#lista-carro").empty();
            let precioTotal = 0;
            for (const producto of carrito) {
                precioTotal = precioTotal + producto.precio;
                $("#lista-carro").append(`<tr><td class="px-4">
                                        <img src="${producto.imagen}" >
                                        </td>
                                        <td class="px-5">${producto.titulo}</td>
                                        <td class="px-3">$${producto.precio}</td>
                                        <td><a href="#" class="borrar-prod px-3" data-id="${producto.id}">Eliminar</a></td></tr>`);
            }
            $("#lista-carro").append(`<p class="text-center mt-4">Precio Total : $${precioTotal} </p>`);
            // Animaciones
            $(".notificaciones").hide();
            $(".notificaciones").html(`<p class="activar bg-success text-white">Producto agregado al carrito</p>`);
            $(".notificaciones").slideDown(300).delay(2000).animate({width:'toggle'},100);
        });
    }
);


// class Carrito{

//     comprarProducto(e){
//         e.preventDefault();
//         if(e.target.classList.contains("add")){
//             const producto = e.target.parentElement.parentElement;
//             this.infoProducto(producto);          
//         }
//     }
//     infoProducto(producto){
//         const info = {
//             imagen: producto.querySelector("img").src,
//             titulo: producto.querySelector("h5").textContent,
//             precio: producto.querySelector("p").textContent,
//             id: producto.querySelector("a").getAttribute("data-id"),
//             cantidad: 1,
//         }
//         this.crearEnCarrito(info);
//     }

//     crearEnCarrito(producto){
//         const linea= document.createElement("tr");
//         linea.innerHTML = `
//         <td class="px-4">
//         <img src="${producto.imagen}" width=100>
//         </td>
//         <td class="px-5">${producto.titulo}</td>
//         <td class="px-3">${producto.precio}</td>
//         <td><a href="#" class="borrar-prod px-3" data-id="${producto.id}">Eliminar</a></td>`
//         ;
//         listaCarro.appendChild(linea);
//     }

//     borrarProducto(e){
//         e.preventDefault();
//         let producto, productoId;
//         if(e.target.classlist.contains('borrar-prod')){
//             e.target.parentElement.parentElement.remove();
//             producto = e.target.parentElement.parentElement;
//             productoId = producto.querySelector('a').getAttribute('data-id');
//         }

//     }

// }

// const carro = new Carrito();
// const ubicacionCarro = document.getElementById("carritoModal");
// const catalogo = document.getElementById("articulos");
// const listaCarro = document.getElementById("lista-carro");

// function eventoAgregar(){
//     catalogo.addEventListener("click", (e) =>{carro.comprarProducto(e)});
//     ubicacionCarro.addEventListener("click", (e) =>{carro.borrarProducto(e)});
// }

// eventoAgregar();
// Inicio sesion

var cuentas = []

function getLogin() {
    var email = document.getElementById("mail").value
    var contrasena = document.getElementById("password").value

    for (i = 0; i < cuentas.length; i++) {
        if (email == cuentas[i].email && contrasena == cuentas[i].contrasena) {
            document.getElementById("inicioSesion").innerHTML = cuentas[i].nombre + " " + cuentas[i].apellido
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

    for (i = 0; i < cuentas.length; i++) {
        if (regEmail == cuentas[i].email) {
            document.getElementById("emailError").innerHTML = "Este email ya ha sido registrado"
            return
        } else if (regContrasena.length < 8) {
            document.getElementById("validacion").innerHTML = "Ingrese un mínimo de 8 caracteres"
            return
        }
    }
    cuentas.push(nuevaCuenta)
    console.log("Nueva cuenta creada")
    console.log(cuentas)
    $('#registroModal').modal('hide');
}

// Carrito de compras

class Carrito{

    comprarProducto(e){
        e.preventDefault();
        if(e.target.classList.contains("add")){
            const producto = e.target.parentElement.parentElement;
            this.infoProducto(producto);
            
        }
    }
    infoProducto(producto){
        const info = {
            imagen: producto.querySelector("img").src,
            titulo: producto.querySelector("h5").textContent,
            precio: producto.querySelector("p").textContent,
            id: producto.querySelector("a").getAttribute("data-id"),
            cantidad: 1,
        }
        this.crearEnCarrito(info);
    }

    crearEnCarrito(producto){
        const linea= document.createElement("tr");
        linea.innerHTML = `
        <td class="px-4">
        <img src="${producto.imagen}" width=100>
        </td>
        <td class="px-5">${producto.titulo}</td>
        <td class="px-5">${producto.precio}</td>
        <td><a href="#" class="borrar-prod" data-id="${producto.id}">Eliminar</a></td>`
        ;
        listaCarro.appendChild(linea);
    }

    borrarProducto(e){
        e.preventDefault();
        let producto, productoId;
        if(e.target.classlist.contains('borrar-prod')){
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            productoId = producto.querySelector('a').getAttribute('data-id');
        }

    }
}

const carro = new Carrito();
const ubicacionCarro = document.getElementById("carritoModal");
const catalogo = document.getElementById("articulos");
const listaCarro = document.getElementById("lista-carro");

function eventoAgregar(){
    catalogo.addEventListener("click", (e) =>{carro.comprarProducto(e)});
    listaCarro.addEventListener("click", (e) =>{carro.borrarProducto(e)});
}

eventoAgregar();
// variables
//Apis
const jsonProducts = './data/articulos.json';
const apiProvincia = "https://apis.datos.gob.ar/georef/api/provincias"
// Containers
const catalogue = document.querySelector('#articulos');
const cartList = document.querySelector('#lista-carro');
const emailError = document.querySelector('#emailError')
const validation = document.querySelector('#validacion')
const errorInicio = document.querySelector("#errorInicio")
//Buttons
const btnToCart = document.querySelector('.add');
const btnBuy = document.querySelector('#comprar-carrito')
const btnFormBuy = document.querySelector('#entregaForm')
const btnCredit = document.querySelector('#form-datos-tarjeta')
const btnDelete = document.querySelector('.borrar-prod')
const btnEmpty = document.querySelector('#vaciar')
const btnContact = document.querySelector("#enviar-contacto")
const btnNewUser = document.querySelector("#nuevo-usuario")
const btnLogin = document.querySelector("#btn-login")
//Deliver form
const deliverForm = document.querySelector("#formulario-compra")
const nameInput = document.querySelector('#nombres')
const surnameInput = document.querySelector('#apellidos')
const provinceInput = document.querySelector('#provincia')
const locationInput = document.querySelector('#localidad')
const addressInput = document.querySelector('#direccion')
const zipInput = document.querySelector('#postal')
//Credit Card Form
const cardForm = document.querySelector("#form-tarjeta")
const cardInput = document.querySelector('#tarjeta')
const nameCardInput = document.querySelector('#nombre-tarjeta')
const monthInput = document.querySelector('#mes')
const yearInput = document.querySelector('#año')
const ccvInput = document.querySelector('#ccv')
//Contact Form
const contactForm = document.querySelector("#form1")
const nombre = document.querySelector("#name");
const surname = document.querySelector("#surname");
const email = document.querySelector("#correo");
const mensaje = document.querySelector("#su-mensaje");
//New Account Form
const newAccountForm = document.querySelector('#form-registrarse')

let productos = [];
let cart = [];
let accounts = []


window.onload = () => {
    try {
        if (cart.length === 0) {
            cartList.innerHTML = `<p class="text-center fs-2">Tu carrito está vacío</p>`; //Si el carrito esta vacio se va a mostrar un mensaje diciendolo
        }
        getProducts().then(data => {
            productos.push(...data);
            console.log(productos);
            renderProducts(productos)
        })
        getGeoRef().then(data => {
            provinceInput.innerHTML = "";
            data.provincias.map(provincia => {
                provinceInput.innerHTML += `<option value="${provincia.id}">${provincia.nombre}</option>`;
            })
        }
        )
    } catch (error) {
        console.error(error);
    }
}

// EventListeners

// Agregar al carrito
catalogue.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains("add")) {
        addToCart(e.target.id);
        Toastify({
            text: "Agregaste un producto al carrito",
            duration: 3000,
            gravity: "bottom",
            onClick: function () { $('#carritoModal').modal("show") }
        })
            .showToast();
    }
    cartList.innerHTML = "";
    let precioTotal = 0;

    cart.map(producto => {
        precioTotal = precioTotal + producto.precio;
        renderCart(producto)
    })
    cartList.innerHTML += `<p class="text-center mt-4">Precio Total : $${precioTotal} </p>`;

})

// Eliminar producto
cartList.addEventListener('click', (e) => {
    e.preventDefault()
    if (e.target.classList.contains("borrar-prod")) {
        cartDelete(e.target.id);
        cartList.innerHTML = "";
        let precioTotal = 0;

        cart.map(producto => {
            precioTotal = precioTotal + producto.precio;
            renderCart(producto)
        })
        cartList.innerHTML += `<p class="text-center mt-4">Precio Total : $${precioTotal} </p>`;
        Toastify({
            text: "Eliminaste un producto del carrito",
            duration: 3000,
            gravity: "bottom",
            onClick: function () { $('#carritoModal').modal("show") }
        })
            .showToast();

        if (cart.length === 0) {
            cartList.innerHTML = `<p class="text-center fs-2">Tu carrito está vacío</p>`; //Si el carrito esta vacio se va a mostrar un mensaje diciendolo
        }
    }
})
//Vaciar carrito
btnEmpty.addEventListener('click', (e) => {
    e.preventDefault()
    cartList.innerHTML = "";
    cart.length = [0];
    if (cart.length === 0) {
        cartList.innerHTML = `<p class="text-center fs-2">Tu carrito está vacío</p>`; //Si el carrito esta vacio se va a mostrar un mensaje diciendolo
    }
    Toastify({
        text: "Vaciaste tu carrito",
        duration: 3000,
        gravity: "bottom",
        onClick: function () { $('#carritoModal').modal("show") }
    })
        .showToast();
})

// Compra del carrito
btnBuy.addEventListener('click', (e) => {
    e.preventDefault();
    if (cart.length === 0) { //Si se da clic al boton de comprar del carrito y el carrito esta vacio va a dar un aviso diciendo  que no hay productos en el carrito.
        swal({
            title: "No hay productos en el carrito.",
            icon: "warning",
            button: "OK",
        });
    } else {
        $('#carritoModal').modal("hide")
        $('#modal-formulario').modal('show'); // En el caso de que haya productos en el carrito se va a mostrar el formulario de DATOS DE ENVIO
    }
})

//Formulario de entrega
btnFormBuy.addEventListener('click', (e) => {
    e.preventDefault()
    if (nameInput.value != "" && surnameInput.value != "" && provinceInput.value != "" && locationInput.value != "" && addressInput.value != "" && zipInput.value != "") {
        $('#modal-tarjeta').modal('show'); //Si los campos del formulario requeridos no estan vacios, tras un click en el boton del form se muestra el modal con el formulario de DATOS DE TARJETA
        $("#modal-formulario").modal("hide");
    } else {
        swal({ //En el caso de que no esté el formulario completo saldrá un aviso pidiendo completarlo
            title: "El formulario está incompleto.",
            icon: "warning",
            button: "OK",
        });
    }
})

// Ciudades del formulario
provinceInput.addEventListener('change', async (e) => {
    e.preventDefault();
    try {
        await getCities().then(data => {
            locationInput.innerHTML = "";
            data.municipios.map(municipio => {
                locationInput.innerHTML += `<option value="${municipio.id}">${municipio.nombre}</option>`;
            })
        })
    } catch (error) {
        console.error(error)
    }
})

//Formulario de datos de tarjeta
btnCredit.addEventListener('click', (e) => {
    e.preventDefault();
    if (cardInput.value != "" && nameCardInput.value != "" && monthInput.value != "" && yearInput.value != "" && ccvInput.value != "") {
        $("#modal-tarjeta").modal("hide"); //Si el formulario de DATOS DE TARJETA esta completo, tras hacer clic en el boton FINALIZAR COMPRA se oculta el modal con el formulario de DATOS DE TARJETA
        swal({ // Y aparece un aviso confirmando la compra
            title: "¡Gracias por tu compra!",
            text: "Te estamos enviando tu paquete",
            icon: "success",
            button: "OK",
        });
        cartList.innerHTML = "";
        cart.length = [0];
        if (cart.length === 0) {
            cartList.innerHTML = `<p class="text-center fs-2">Tu carrito está vacío</p>`; //Si el carrito esta vacio se va a mostrar un mensaje diciendolo
        }
        deliverForm.reset()
        cardForm.reset()
    } else {
        swal({ //En el caso de que no esté el formulario completo saldrá un aviso pidiendo completarlo
            title: "El formulario está incompleto.",
            icon: "warning",
            button: "OK",
        });
    }
})

//Formulario de contacto
btnContact.addEventListener('click', (e) => {
    e.preventDefault()
    if (nombre.value != "" && surname.value != "" && email.value != "" && mensaje.value != "") {
        swal({
            title: "Mensaje enviado.",
            text: "Gracias por contactarnos.",
            icon: "success",
            button: "OK",
        });
        contactForm.reset();
    } else {
        swal({ //En el caso de que no esté el formulario completo saldrá un aviso pidiendo completarlo
            title: "El formulario está incompleto.",
            icon: "warning",
            button: "OK",
        });
    }
})

//Registro de usuario
btnNewUser.addEventListener('click', (e) => {
    e.preventDefault();
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
        emailError.innerHTML = "";
        validation.innerHTML = "";

        for (i = 0; i < accounts.length; i++) {
            if(regEmail == accounts[i].email){
                 emailError.innerHTML = "Este email ya ha sido registrado";
                 return
            }
            
        }
        if (regContrasena.length < 8) {
             validation.innerHTML = "Ingrese un mínimo de 8 caracteres";
             return
                
            }
            accounts.push(nuevaCuenta)
            $('#registroModal').modal('hide');
            
            Toastify({
                text: "Creaste tu cuenta",
                duration: 3000,
                gravity: "bottom",
            })
                .showToast();
    } else {
        validation.innerHTML = ""
        validation.innerHTML = "El formulario está incompleto."//Si el formulario esta incompleto se da un aviso en el mismo formulario.
    }
})

// Inicio sesion
btnLogin.addEventListener('click', (e) => {
    e.preventDefault();
    let email = document.querySelector("#mail").value
    let contrasena = document.querySelector("#password").value
    errorInicio.innerHTML = "";
    accounts.map(account => {
        if (email == account.email && contrasena == account.contrasena) {
            document.querySelector("#inicioSesion").innerHTML = `${account.nombre} ${account.apellido}`;
            $('#sesionModal').modal('hide');
            
            Toastify({
                text: "Iniciaste sesión",
                duration: 3000,
                gravity: "bottom",
            })
                .showToast();
            return
        }
    })
    errorInicio.innerHTML = "Contraseña o email incorrecto"
})




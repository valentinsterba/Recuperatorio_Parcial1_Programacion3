//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() {
    let carrito = localStorage.getItem('carrito');
    return carrito ? JSON.parse(carrito) : [];
}

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito) {
    let carritoString = JSON.stringify(carrito);
    localStorage.setItem('carrito', carritoString);
    actualizarContadorCarrito();
}

//--- Funcion que actualiza el contador de productos en el carrito ---//
function actualizarContadorCarrito() {
    let contadorCarrito = document.getElementById('cantidad-carrito');
    let cantidadProductos = 0;

    let carrito = obtenerCarrito();

    if (carrito) {
        carrito.forEach(producto => cantidadProductos += producto.cantidad);
    }

    contadorCarrito.textContent = cantidadProductos;
}

function sumarAlCarrito(e) {
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;

    let elementoProducto = elementoClickeado.closest('li');
    let nombreProducto = elementoProducto.querySelector('.nombre-producto').textContent;
    let textoPrecioProducto = elementoProducto.querySelector('.precio-producto').textContent;
    let precioProducto = parseInt(textoPrecioProducto.replace('$', ''));

    let carrito = obtenerCarrito();

    let productoExistente = carrito.find(producto => producto.nombre === nombreProducto);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    }
    else {
        carrito.push({ 'nombre': nombreProducto, 'cantidad': 1, 'precioUnitario': precioProducto });
    }

    guardarCarrito(carrito);
    alert(`Un/Una ${nombreProducto} se agregó al carrito.`);
    actualizarContadorCarrito();
}

function restarDelCarrito(e) {
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;

    let elementoProducto = elementoClickeado.closest('li');
    let nombreProducto = elementoProducto.querySelector('.nombre-producto').textContent;

    let carrito = obtenerCarrito();

    let productoExistente = carrito.find(producto => producto.nombre === nombreProducto);

    if (productoExistente) {
        productoExistente.cantidad -= 1;
        let mensaje = `Un/Una ${nombreProducto} se restó del carrito.`;
        if (productoExistente.cantidad <= 0) {
            carrito = carrito.filter(producto => producto.nombre !== nombreProducto);
            mensaje = `Un/Una ${nombreProducto} se eliminó del carrito.`;
        }
        guardarCarrito(carrito);
        alert(mensaje);
    }
    else {
        alert(`No hay más ${nombreProducto} en el carrito.`);
    }
    actualizarContadorCarrito();
}

//--- Funcion para ordenar productos de mayor a menor precio ---//
function ordenarMayorAMenor(e) {
    let elementoClickeado = e.target;
    let divContenedor = elementoClickeado.closest('div');
    let elementoLista = divContenedor.nextElementSibling;
}

//--- Funcion para ordenar productos de menor a mayor precio ---//
function ordenarMenorAMayor(e) {
    let elementoClickeado = e.target;
    let divContenedor = elementoClickeado.closest('div');
    let elementoLista = divContenedor.nextElementSibling;
}

//--- Funcion para mostrar/ocultar las calorías de las hamburguesas ---//
function toggleCalorias(e) {
    let botonCalorias = e.target;

    let elementoProducto = botonCalorias.closest('li');
    let contenedorCalorias = elementoProducto.querySelector('.calorias-producto');

    if (contenedorCalorias.style.display === 'none') {
        contenedorCalorias.style.display = 'block';
    }
    else {
        contenedorCalorias.style.display = 'none';
    }
}

//--- [EVENTOS] Asociacion del evento "click" a los botones "+" y "-" con la funcion manejadora del evento ---//
window.addEventListener("DOMContentLoaded", () => {
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");
    const botonesOrdenarMayor = document.querySelectorAll(".btn-ordenar-mayor");
    const botonesOrdenarMenor = document.querySelectorAll(".btn-ordenar-menor");
    const botonesCalorias = document.querySelectorAll(".btn-calorias");

    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
    botonesOrdenarMayor.forEach(btn => btn.addEventListener("click", ordenarMayorAMenor));
    botonesOrdenarMenor.forEach(btn => btn.addEventListener("click", ordenarMenorAMayor));
    botonesCalorias.forEach(btn => btn.addEventListener("click", toggleCalorias));

    // Actualizar el contador al cargar la página
    actualizarContadorCarrito();
});
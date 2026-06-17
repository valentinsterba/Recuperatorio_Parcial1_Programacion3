//--- Funcion que obtiene el carrito del LocalStorage, lo parsea a un array y lo retorna ---//
function obtenerCarrito() {
    let carrito = localStorage.getItem('carrito'); //Buscamos el carrito en el localStorage.
    return carrito ? JSON.parse(carrito) : []; //Si el carrito NO está vacío, lo retornamos parseado a un array. Si está vacío, retornamos un array vacío.
}

//--- Funcion que guarda el carrito recibido al LocalStorage, previamente transformado a string ---//
function guardarCarrito(carrito) {
    let carritoString = JSON.stringify(carrito); //Parseamos el carrito recibido como parámetro a un objeto JSON.
    localStorage.setItem('carrito', carritoString); //Guardamos el carrito parseado en el localStorage con la clave 'carrito'.
    actualizarContadorCarrito(); //Actualizamos el contador de productos.
}

//--- Funcion que actualiza el contador de productos en el carrito ---//
function actualizarContadorCarrito() {
    let contadorCarrito = document.getElementById('cantidad-carrito'); //Seleccionamos el elemento que contiene la cantidad de productos.
    let cantidadProductos = 0; //Inicializamos la cantidad de productos en 0.

    let carrito = obtenerCarrito(); //Obtenemos el carrito.

    if (carrito) { //Si el carrito NO es nulo...
        carrito.forEach(producto => cantidadProductos += producto.cantidad); //Por cada producto, acumular su cantidad en cantidadProductos.
    }

    contadorCarrito.textContent = cantidadProductos; //Cambiar el contenido de texto del elemento para que muestre la cantidad de productos.
}

function sumarAlCarrito(e) {
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;

    let elementoProducto = elementoClickeado.closest('li'); //Obtenemos el ancestro de tipo 'li' más cercano al botón.
    let nombreProducto = elementoProducto.querySelector('.nombre-producto').textContent; //Buscamos el nombre del producto.
    let textoPrecioProducto = elementoProducto.querySelector('.precio-producto').textContent; //Buscamos el texto del precio del producto.
    let precioProducto = parseInt(textoPrecioProducto.replace('$', '')); //Al texto del producto le sacamos el signo '$' y parseamos el resto a entero.

    let carrito = obtenerCarrito(); //Obtenemos el carrito.

    let productoExistente = carrito.find(producto => producto.nombre === nombreProducto); //Buscamos el producto en el carrito mediante su nombre.

    if (productoExistente) { //Si el producto está en el carrito...
        productoExistente.cantidad += 1; //Aumentamos su cantidad en 1.
    }
    else { //Si NO está en el carrito...
        carrito.push({ 'nombre': nombreProducto, 'cantidad': 1, 'precioUnitario': precioProducto }); //Lo agregamos directamente con la cantidad inicializada en 1.
    }

    guardarCarrito(carrito); //Guardamos el carrito actualizado.
    alert(`Un/Una ${nombreProducto} se agregó al carrito.`); //Lanzamos una alerta para confirmar que el producto se agregó exitosamente.
    actualizarContadorCarrito(); //Actualizamos el contador de productos.
}

function restarDelCarrito(e) {
    //--- Obtengo la referencia al elemento clickeado desde en base al evento (Propiedad exclusivamente de todos los Events) ---//
    let elementoClickeado = e.target;

    let elementoProducto = elementoClickeado.closest('li'); //Obtenemos el ancestro de tipo 'li' más cercano al botón.
    let nombreProducto = elementoProducto.querySelector('.nombre-producto').textContent; //Buscamos el nombre del producto.

    let carrito = obtenerCarrito(); //Obtenemos el carrito.

    let productoExistente = carrito.find(producto => producto.nombre === nombreProducto); //Buscamos el producto en el carrito mediante su nombre.

    if (productoExistente) { //Si el producto está en el carrito...
        productoExistente.cantidad -= 1; //Reducimos su cantidad en 1.
        let mensaje = `Un/Una ${nombreProducto} se restó del carrito.`; //Le asignamos el valor por defecto al mensaje.
        if (productoExistente.cantidad <= 0) { //Si la cantidad final es menor o igual a 0...
            carrito = carrito.filter(producto => producto.nombre !== nombreProducto); //Usamos un filtro para dejar afuera el producto.
            mensaje = `Un/Una ${nombreProducto} se eliminó del carrito.`; //Cambiamos el valor del mensaje.
        }
        guardarCarrito(carrito); //Guardamos el carrito actualizado.
        alert(mensaje); //Lanzamos una alerta con el mensaje correcto.
    }
    else { //Si el producto NO está en el carrito...
        alert(`No hay más ${nombreProducto} en el carrito.`); //Lanzamos una alerta que nos lo indica.
    }
    actualizarContadorCarrito(); //Actualizamos el contador de productos.
}

//--- Funcion para ordenar productos de mayor a menor precio ---//
function ordenarMayorAMenor(e) {
    let elementoClickeado = e.target;
    let divContenedor = elementoClickeado.closest('div');
    let elementoLista = divContenedor.nextElementSibling;

    // Ordenamiento.
    let productos = Array.from(elementoLista.children);
    productos.sort((a, b) => {
        let textoPrecioA = a.querySelector('.precio-producto').textContent;
        let precioA = parseInt(textoPrecioA.replace('$', ''));
        let textoPrecioB = b.querySelector('.precio-producto').textContent;
        let precioB = parseInt(textoPrecioB.replace('$', ''));

        return precioB - precioA;
    });

    productos.forEach(producto => elementoLista.appendChild(producto));
}

//--- Funcion para ordenar productos de menor a mayor precio ---//
function ordenarMenorAMayor(e) {
    let elementoClickeado = e.target;
    let divContenedor = elementoClickeado.closest('div');
    let elementoLista = divContenedor.nextElementSibling;

    // Ordenamiento.
    let productos = Array.from(elementoLista.children);
    productos.sort((a, b) => {
        let textoPrecioA = a.querySelector('.precio-producto').textContent;
        let precioA = parseInt(textoPrecioA.replace('$', ''));
        let textoPrecioB = b.querySelector('.precio-producto').textContent;
        let precioB = parseInt(textoPrecioB.replace('$', ''));

        return precioA - precioB;
    });

    productos.forEach(producto => elementoLista.appendChild(producto));
}

//--- Funcion para mostrar/ocultar las calorías de las hamburguesas ---//
function toggleCalorias(e) {
    let botonCalorias = e.target; //Asociamos el botón clickeado al evento.

    let elementoProducto = botonCalorias.closest('li'); //Buscamos el ancestro de tipo 'li' más cercano al botón.
    let contenedorCalorias = elementoProducto.querySelector('.calorias-producto'); //Desde el ancestro 'li', buscamos el elemento que contiene el texto con las calorías.

    if (contenedorCalorias.style.display === 'none') { //Si su atributo 'display' tiene el valor 'none' (es decir, está oculto)...
        contenedorCalorias.style.display = 'block'; //Cambiamos el valor a 'block' para que se muestre.
    }
    else { //SI el valor es 'block' (es decir, NO está oculto)...
        contenedorCalorias.style.display = 'none'; //Cambiamos el valor a 'none' para ocultarlo.
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
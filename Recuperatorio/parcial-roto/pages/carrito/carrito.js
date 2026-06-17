function obtenerCarrito() {
    let carrito = localStorage.getItem('carrito'); //Buscamos el carrito en el localStorage.
    let carritoArray = JSON.parse(carrito); //Lo parseamos a un array.
    return carritoArray; //Lo retornamos.
}

function cargarProductosCarrito() {
    let headingPrecioFinal = document.getElementById('valor-final'); //Asociamos el heading que contiene el texto con el precio final.
    let tabla = document.getElementById("tabla-carrito"); //Asociamos la tabla con los productos del carrito.
    let precioFinal = 0; //Inicializamos el precio final.
    //Creamos las cabeceras de la tabla.
    tabla.innerHTML = `<tr class="fila-header-carrito">
        <td class="celda-header-tabla-carrito">Nombre del producto</td>
        <td class="celda-header-tabla-carrito">Cantidad</td>
        <td class="celda-header-tabla-carrito">Precio unitario</td>
    </tr>`

    let carrito = obtenerCarrito(); //Obtenemos el carrito.

    if (carrito) { //Si el carrito NO está vacío...
        carrito.forEach(producto => { //Por cada producto...
            //Creamos un 'tr' con los datos del producto (nombre, cantidad y precio unitario) y se lo agregamos a la tabla.
            tabla.innerHTML += `<tr><td>${producto.nombre}</td><td>${producto.cantidad}</td><td>$${producto.precioUnitario}</td></tr>`;
            precioFinal += producto.cantidad * producto.precioUnitario; //Acumulamos en 'precioFinal' el producto entre la cantidad y el precio unitario.
        });
    }
    else { //Si el carrito está vacío...
        tabla.innerHTML += '<td colspan="3">No hay productos en el carrito.</td>'; //Mostramos un texto en la tabla que lo indique.
    }

    headingPrecioFinal.textContent = `El valor final a pagar es de: $${precioFinal}`; //Actualizamos el texto del heading que contiene el precio final.
}

function limpiarCarrito() {
    localStorage.removeItem('carrito'); //Borramos los datos del carrito.
    cargarProductosCarrito(); //Actualizamos la tabla de productos del carrito.
    alert('Carrito limpiado exitosamente.'); //Lanzamos una alerta para confirmar.
}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () => {
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});
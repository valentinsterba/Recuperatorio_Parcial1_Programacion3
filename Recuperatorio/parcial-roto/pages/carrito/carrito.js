function obtenerCarrito() {
    let carrito = localStorage.getItem('carrito');
    let carritoArray = JSON.parse(carrito);
    return carritoArray;
}

function cargarProductosCarrito() {
    let headingPrecioFinal = document.getElementById('valor-final');
    let tabla = document.getElementById("tabla-carrito");
    let cabeceras = tabla.querySelector('.fila-header-carrito');
    let precioFinal = 0;
    tabla.innerHTML = `<tr class="fila-header-carrito">
        <td class="celda-header-tabla-carrito">Nombre del producto</td>
        <td class="celda-header-tabla-carrito">Cantidad</td>
        <td class="celda-header-tabla-carrito">Precio unitario</td>
    </tr>`

    let carrito = obtenerCarrito();

    if (carrito) {
        carrito.forEach(producto => {
            tabla.innerHTML += `<tr><td>${producto.nombre}</td><td>${producto.cantidad}</td><td>$${producto.precioUnitario}</td></tr>`;
            precioFinal += producto.cantidad * producto.precioUnitario;
        });
    }
    else {
        tabla.innerHTML += '<td colspan="3">No hay productos en el carrito.</td>';
    }

    headingPrecioFinal.textContent = `El valor final a pagar es de: $${precioFinal}`;
}

function limpiarCarrito() {
    localStorage.removeItem('carrito');
    cargarProductosCarrito();
    alert('Carrito limpiado exitosamente.');
}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () => {
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});
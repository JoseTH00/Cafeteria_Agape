document.addEventListener('DOMContentLoaded', function () {
	const listaEl = document.querySelector('#pedido-lista');
	const totalEl = document.querySelector('#pedido-total-monto');
	const botonVaciar = document.querySelector('#pedido-vaciar');
	const menuItems = document.querySelectorAll('.menu-item');

	if (!listaEl || !totalEl || menuItems.length === 0) return;

	let pedido = [];

	function parsearPrecio(texto) {
		const soloNumeros = texto.replace(/[^0-9]/g, '');
		return Number(soloNumeros);
	}

	function formatearPrecio(numero) {
		return '$' + numero.toLocaleString('es-AR');
	}

	function calcularTotal() {
		return pedido.reduce(function (acumulado, producto) {
			return acumulado + (producto.precio * producto.cantidad);
		}, 0);
	}

	function actualizarTotal() {
		totalEl.textContent = formatearPrecio(calcularTotal());
	}

	function crearFilaPedido(producto) {
		const fila = document.createElement('div');
		fila.classList.add('pedido-item');

		const info = document.createElement('div');
		info.classList.add('pedido-item-info');

		const nombreEl = document.createElement('div');
		nombreEl.classList.add('pedido-item-nombre');
		nombreEl.textContent = producto.nombre;

		const precioEl = document.createElement('div');
		precioEl.classList.add('pedido-item-precio');
		precioEl.textContent = formatearPrecio(producto.precio);

		info.appendChild(nombreEl);
		info.appendChild(precioEl);

		const controles = document.createElement('div');
		controles.classList.add('pedido-item-controles');

		const btnRestar = document.createElement('button');
		btnRestar.type = 'button';
		btnRestar.classList.add('btn-cantidad', 'btn-restar');
		btnRestar.setAttribute('aria-label', 'Quitar uno de ' + producto.nombre);
		btnRestar.textContent = '−';

		const cantidadEl = document.createElement('span');
		cantidadEl.classList.add('pedido-cantidad');
		cantidadEl.textContent = producto.cantidad;

		const btnSumar = document.createElement('button');
		btnSumar.type = 'button';
		btnSumar.classList.add('btn-cantidad', 'btn-sumar');
		btnSumar.setAttribute('aria-label', 'Agregar uno de ' + producto.nombre);
		btnSumar.textContent = '+';

		btnRestar.addEventListener('click', function () {
			cambiarCantidad(producto.nombre, -1);
		});

		btnSumar.addEventListener('click', function () {
			cambiarCantidad(producto.nombre, 1);
		});

		controles.appendChild(btnRestar);
		controles.appendChild(cantidadEl);
		controles.appendChild(btnSumar);

		fila.appendChild(info);
		fila.appendChild(controles);

		return fila;
	}

	function renderizarLista() {
		listaEl.innerHTML = '';

		if (pedido.length === 0) {
			const vacio = document.createElement('p');
			vacio.classList.add('pedido-vacio');
			vacio.id = 'pedido-vacio';
			vacio.textContent = 'Todavía no agregaste nada. Hacé clic en un producto del menú para sumarlo a tu pedido.';
			listaEl.appendChild(vacio);
			return;
		}

		pedido.forEach(function (producto) {
			listaEl.appendChild(crearFilaPedido(producto));
		});
	}

	function agregarProducto(nombre, precio) {
		const existente = pedido.find(function (producto) {
			return producto.nombre === nombre;
		});

		if (existente) {
			existente.cantidad++;
		} else {
			pedido.push({ nombre: nombre, precio: precio, cantidad: 1 });
		}

		renderizarLista();
		actualizarTotal();
	}

	function cambiarCantidad(nombre, delta) {
		const producto = pedido.find(function (p) {
			return p.nombre === nombre;
		});

		if (!producto) return;

		producto.cantidad += delta;

		if (producto.cantidad <= 0) {
			pedido = pedido.filter(function (p) {
				return p.nombre !== nombre;
			});
		}

		renderizarLista();
		actualizarTotal();
	}

	menuItems.forEach(function (item) {
		const nombreEl = item.querySelector('.menu-item-name');
		const precioEl = item.querySelector('.menu-item-price');

		if (!nombreEl || !precioEl) return;

		const nombre = nombreEl.textContent.trim();
		const precio = parsearPrecio(precioEl.textContent);

		item.classList.add('menu-item-clickeable');

		item.addEventListener('click', function (evento) {
			if (evento.target.closest('.menu-item-favorito')) return;

			agregarProducto(nombre, precio);
		});
	});

	if (botonVaciar) {
		botonVaciar.addEventListener('click', function () {
			pedido = [];
			renderizarLista();
			actualizarTotal();
		});
	}

	renderizarLista();
	actualizarTotal();
});
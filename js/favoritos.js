document.addEventListener('DOMContentLoaded', function () {
	const listaEl = document.querySelector('#favoritos-lista');
	const contadorEl = document.querySelector('#favoritos-contador');
	const menuItems = document.querySelectorAll('.menu-item');

	if (!listaEl || menuItems.length === 0) return;


	let favoritos = [];

	function renderizarLista() {
		listaEl.innerHTML = '';

		if (favoritos.length === 0) {
			const li = document.createElement('li');
			li.classList.add('favoritos-vacio');
			li.textContent = 'Todavía no agregaste favoritos. Hacé clic en el corazón de un producto del menú.';
			listaEl.appendChild(li);
		} else {
			favoritos.forEach(function (nombre) {
				const li = document.createElement('li');

				const texto = document.createElement('span');
				texto.innerHTML = '<i class="bi bi-heart-fill"></i> ' + nombre;

				const btnQuitar = document.createElement('button');
				btnQuitar.type = 'button';
				btnQuitar.classList.add('btn-quitar-favorito');
				btnQuitar.textContent = 'Quitar';
				btnQuitar.addEventListener('click', function () {
					quitarFavorito(nombre);
				});

				li.appendChild(texto);
				li.appendChild(btnQuitar);
				listaEl.appendChild(li);
			});
		}

		if (contadorEl) {
			contadorEl.textContent = '(' + favoritos.length + ')';
		}
	}


	function actualizarCorazon(nombre, esFavorito) {
		const boton = document.querySelector('.menu-item-favorito[data-nombre="' + nombre + '"]');

		if (!boton) return;

		const icono = boton.querySelector('i');

		if (esFavorito) {
			boton.classList.add('activo');
			icono.classList.remove('bi-heart');
			icono.classList.add('bi-heart-fill');
		} else {
			boton.classList.remove('activo');
			icono.classList.remove('bi-heart-fill');
			icono.classList.add('bi-heart');
		}
	}

	function agregarFavorito(nombre) {
		if (!favoritos.includes(nombre)) {
			favoritos.push(nombre);
			actualizarCorazon(nombre, true);
			renderizarLista();
		}
	}

	function quitarFavorito(nombre) {
		favoritos = favoritos.filter(function (fav) {
			return fav !== nombre;
		});
		actualizarCorazon(nombre, false);
		renderizarLista();
	}


	menuItems.forEach(function (item) {
		const nombreEl = item.querySelector('.menu-item-name');
		const precioEl = item.querySelector('.menu-item-price');

		if (!nombreEl || !precioEl) return;

		const nombre = nombreEl.textContent.trim();

		const contenedorDerecha = document.createElement('div');
		contenedorDerecha.classList.add('menu-item-derecha');

		const botonFavorito = document.createElement('button');
		botonFavorito.type = 'button';
		botonFavorito.classList.add('menu-item-favorito');
		botonFavorito.setAttribute('data-nombre', nombre);
		botonFavorito.setAttribute('aria-label', 'Agregar ' + nombre + ' a favoritos');
		botonFavorito.innerHTML = '<i class="bi bi-heart"></i>';

		botonFavorito.addEventListener('click', function (evento) {

			evento.stopPropagation();

			if (favoritos.includes(nombre)) {
				quitarFavorito(nombre);
			} else {
				agregarFavorito(nombre);
			}
		});

		contenedorDerecha.appendChild(botonFavorito);
		contenedorDerecha.appendChild(precioEl);
		item.appendChild(contenedorDerecha);
	});

	renderizarLista();
});
document.addEventListener('DOMContentLoaded', function () {
	const imagenPrincipal = document.querySelector('#galeria-imagen-principal');
	const miniaturas = document.querySelectorAll('.galeria-thumb');

	if (!imagenPrincipal || miniaturas.length === 0) return;

	function cambiarImagenPrincipal(miniatura) {
		const nuevoSrc = miniatura.getAttribute('src');
		const nuevaDescripcion = miniatura.getAttribute('data-alt') || miniatura.getAttribute('alt');

		imagenPrincipal.style.opacity = '0';

		setTimeout(function () {
			imagenPrincipal.setAttribute('src', nuevoSrc);
			imagenPrincipal.setAttribute('alt', nuevaDescripcion);
			imagenPrincipal.style.opacity = '1';
		}, 200);

		miniaturas.forEach(function (thumb) {
			thumb.classList.remove('active');
		});
		miniatura.classList.add('active');
	}

	miniaturas.forEach(function (miniatura) {
		miniatura.addEventListener('click', function () {
			cambiarImagenPrincipal(miniatura);
		});
	});
});
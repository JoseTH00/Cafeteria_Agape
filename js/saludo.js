document.addEventListener('DOMContentLoaded', function () {
	const saludoEl = document.querySelector('#saludo-dinamico');

	if (!saludoEl) return;

	function obtenerSaludo() {
		const ahora = new Date();
		const hora = ahora.getHours();
		let icono;
		let texto;

		if (hora >= 6 && hora < 12) {
			icono = 'bi-sun-fill';
			texto = 'Buenos días';
		} else if (hora >= 12 && hora < 20) {
			icono = 'bi-cup-hot-fill';
			texto = 'Buenas tardes';
		} else {
			icono = 'bi-moon-stars-fill';
			texto = 'Buenas noches';
		}

		return '<i class="bi ' + icono + '"></i> ' + texto;
	}

	saludoEl.innerHTML = obtenerSaludo();
});
document.addEventListener('DOMContentLoaded', function () {
	const estadoEl = document.querySelector('#estado-cafeteria');

	if (!estadoEl) return;

	const HORA_APERTURA = 8;
	const HORA_CIERRE = 21;

	function estaAbierto() {
		const ahora = new Date();
		const hora = ahora.getHours();

		if (hora >= HORA_APERTURA && hora < HORA_CIERRE) {
			return true;
		}

		return false;
	}

	function actualizarEstado() {
		if (estaAbierto()) {
			estadoEl.innerHTML = '<i class="bi bi-door-open-fill"></i> Estamos abiertos';
		} else {
			estadoEl.innerHTML = '<i class="bi bi-door-closed-fill"></i> Cerrado';
		}
	}

	actualizarEstado();
});
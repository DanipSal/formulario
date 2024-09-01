document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form-validation");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const nombre = form.querySelector('input[type="text"][placeholder="Ingresa tu nombre"]');
        const apellido = form.querySelector('input[type="text"][placeholder="Ingresa tu apellido"]');
        const fechaNacimiento = form.querySelector('input[type="date"]');
        const email = form.querySelector('input[type="email"]');
        const pais = form.querySelector('#pais');

        let valid = true;

        function mostrarError(input, message) {
            const formGroup = input.parentElement;
            const small = formGroup.querySelector('small.error-msn');

            small.innerText = message;
            small.style.display = 'block';
            formGroup.classList.add('error');

            valid = false;
        }

        function eliminarError(input) {
            const formGroup = input.parentElement;
            const small = formGroup.querySelector('small.error-msn');

            small.innerText = '';
            small.style.display = 'none';
            formGroup.classList.remove('error');
        }

        function esEmailValido(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }

        function esFechaNacimientoValida(fecha) {
            const fechaIngresada = new Date(fecha);
            const ahora = new Date();
            const edad = ahora.getFullYear() - fechaIngresada.getFullYear();
            const mes = ahora.getMonth() - fechaIngresada.getMonth();
            const dia = ahora.getDate() - fechaIngresada.getDate();

            if (fechaIngresada > ahora) {
                return false;
            }

            if (edad < 0 || edad > 150 || (edad === 0 && (mes > 0 || (mes === 0 && dia > 0)))) {
                return false;
            }

            return true;
        }

        function soloLetras(input) {
            const re = /^[A-Za-zÀ-ÖØ-ÿ\s]+$/; // Permite letras y espacios
            return re.test(input.value.trim());
        }

        if (nombre.value.trim() === '') {
            mostrarError(nombre, 'Por favor ingresa tu nombre');
        } else if (!soloLetras(nombre)) {
            mostrarError(nombre, 'El nombre solo debe contener letras y espacios');
        } else {
            eliminarError(nombre);
        }

        if (apellido.value.trim() === '') {
            mostrarError(apellido, 'Por favor ingresa tu apellido');
        } else if (!soloLetras(apellido)) {
            mostrarError(apellido, 'El apellido solo debe contener letras y espacios');
        } else {
            eliminarError(apellido);
        }

        if (fechaNacimiento.value.trim() === '') {
            mostrarError(fechaNacimiento, 'Por favor ingresa tu fecha de nacimiento');
        } else if (!esFechaNacimientoValida(fechaNacimiento.value)) {
            mostrarError(fechaNacimiento, 'Por favor ingresa una fecha válida');
        } else {
            eliminarError(fechaNacimiento);
        }

        if (email.value.trim() === '') {
            mostrarError(email, 'Por favor ingresa tu correo electrónico');
        } else if (!esEmailValido(email.value.trim())) {
            mostrarError(email, 'Por favor ingresa un correo electrónico válido');
        } else {
            eliminarError(email);
        }

        if (pais.value === '') {
            mostrarError(pais, 'Por favor selecciona tu país');
        } else {
            eliminarError(pais);
        }

        if (valid) {
            form.submit();
        }
    });

    document.getElementById('my-button').addEventListener('click', function() {
        document.body.classList.toggle('contrast');
    });
});

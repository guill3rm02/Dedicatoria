const formulario = document.getElementById('formulario');//accedo al id
const inputs = document.querySelectorAll('#formulario input');//accedo al id form y todos los input


const expresiones = {
	usuario: /^[a-zA-Z0-9\_]{3,16}$/, //[a-z] Letras, numeros, guion(\-) y guion_bajo
	password: /^.{4,12}$/, // 4 a 12 digitos.
	
}

const campos = {
	usuario: false,
	password: false,
}
const validarform = (e) => {
	switch (e.target.name) {/* saber el name delos inputs */
		case "usuario":
			validarcampo(expresiones.usuario, e.target, 'usuario');/*pide 3 param */
			break;
		case "password":
			validarcampo(expresiones.password, e.target, 'password');
			break;
	}
}

const validarcampo = (expresion, input, campo) => {
	if (expresion.test(input.value)) { /*accedo al objeto exprsiones usuario y compruebo con test*/
		document.querySelector(`#grupo_${campo} p`).classList.remove('formulario_input-error-activo')
		document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-incorrecto');
		document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-correcto');
		document.querySelector(`#grupo_${campo} i`).classList.add('bi-check-circle-fill')
		document.querySelector(`#grupo_${campo} i`).classList.remove('bi-x-circle-fill')
		campos[campo] = true;
	}
	else {
		document.getElementById(`grupo_${campo}`).classList.add('formulario_grupo-incorrecto');/*agrego class del css*/
		document.getElementById(`grupo_${campo}`).classList.remove('formulario_grupo-correcto');
		document.querySelector(`#grupo_${campo} i`).classList.add('bi-x-circle-fill')
		document.querySelector(`#grupo_${campo} i`).classList.remove('bi-check-circle-fill')
		document.querySelector(`#grupo_${campo} p`).classList.add('formulario_input-error-activo')
		campos[campo] = false;
	}
}

inputs.forEach((input) => {/* se ejecuta x cada uno de los inputs */
	input.addEventListener('keyup', validarform);/* cuando levante la tecla */
	input.addEventListener('blur', validarform);/*  caundode un click afuera*/

});


formulario.addEventListener("submit", (e) => {/*cuando presione el boton */
	const terminos = document.getElementById('terminos');


	if (!(campos.usuario && campos.password && terminos.checked)) {
		e.preventDefault();/*cuando toco enviar q no pase nada*/
		document.getElementById('formulario_mensaje').classList.add('formulario_mensaje-activo');
	}
});


//#region ELEMENTOS DEL DOM

let nombreMascota = document.getElementById('txt_nombreMascota')
let edadMascota = document.getElementById('txt_edadMascota')
let btnFormulario = document.getElementById('btnFormulario')


//#endregion ELEMENTOS DEL DOM


//#region CODIGOS MODAL BIENVENIDA

abrirMensaje = (mensajeModal, tipoModal) => {

    let mensaje
    let modal
    let removerClase

    if (mensajeModal.trim().length > 0 && tipoModal.trim().length > 0) {

        mensaje = mensajeModal

        if (tipoModal == 'Info') {
            modal = 'mensaje-info'
        } else if (tipoModal == 'Exito') {
            modal = 'mensaje-exitoso'
            removerClase='mensaje-error'
        } else if (tipoModal == 'Error') {
            modal = 'mensaje-error'
            removerClase = 'mensaje-exitoso'
        } else {
            modal = 'mensaje-info'
        }

    } else {
        mensaje = 'Mensaje NC'
    }

    document.querySelector('#contenedorMensaje span').innerHTML = mensaje

    setTimeout(() => {
        document.getElementById('contenedorMensaje').classList.add('abrir-mensaje')
        document.getElementById('contenedorMensaje').classList.add(modal)
        document.getElementById('contenedorMensaje').classList.remove(removerClase)
    }, 50)

    setTimeout(() => {
        document.getElementById('contenedorMensaje').classList.remove('abrir-mensaje')
    }, 1500)

}

/*optimizar el codigo*/

//#endregion CODIGOS MODAL BIENVENIDA


//#region VALIDACION FORMULARIO

let itemsFormulario = {
    valNombreMascota: false,
    valEdadMascota: false
}

nombreMascota.addEventListener('change', (e) => {
    e.target.value.trim().length > 0 ? itemsFormulario.valNombreMascota = true : itemsFormulario.valNombreMascota = false
})

edadMascota.addEventListener('change', (e) => {
    e.target.value.trim().length > 0 ? itemsFormulario.valEdadMascota = true : itemsFormulario.valEdadMascota = false
})


validarFormulario = () => {

    let resultadoValidacion = false

    let valoresFormulario = Object.values(itemsFormulario)

    let validador = valoresFormulario.findIndex(data => data == false)

    validador == -1 ? resultadoValidacion = true : resultadoValidacion = false

    return resultadoValidacion

}

btnFormulario.addEventListener('click', (e) => {
    e.preventDefault()
    if (validarFormulario()) {
        abrirMensaje('Guardado exitosamente','Exito')
    }else{
        abrirMensaje('Recuerda llenar los campos','Error')
    }
})

//#endregion


//#region DOMCONTENTLOADED

document.addEventListener('DOMContentLoaded', () => {

    let mensajeModal = 'Bienvenido a la App Elizabeth'
    let tipoModal = 'Exito' /* Info Exito Error */

    abrirMensaje(mensajeModal, tipoModal)

})

//#endregion DOMCONTENTLOADED





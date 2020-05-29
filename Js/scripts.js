
//#region ELEMENTOS DEL DOM

let nombreMascota = document.getElementById('txt_nombreMascota')
let edadMascota = document.getElementById('txt_edadMascota')
let btnFormulario = document.getElementById('btnFormulario')
let textoHeader = document.getElementById('textoHeader')
let formularioMascota = document.getElementById('formularioMascota')

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
            removerClase = 'mensaje-error'
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

//#endregion

//#region GUARDAR DATOS LOCALSTORAGE

guardarMascotaLocalStorage = (nuevaMascota) => {

    /* Recordar modificarlo ya que viene como string */
    let mascotasLocalStorage = JSON.parse(localStorage.getItem('mascotasGuardadas'))

    console.log("Base de datos")
    console.log(mascotasLocalStorage)

    mascotasLocalStorage.push(nuevaMascota)

    console.log("Nueva base de datos")
    console.log(mascotasLocalStorage)

    localStorage.setItem('mascotasGuardadas',JSON.stringify(mascotasLocalStorage))

}

//#endregion GUARDAR DATOS LOCALSTORAGE

//#region DOMCONTENTLOADED

document.addEventListener('DOMContentLoaded', () => {

    let mensajeModal = 'Bienvenido a Mascotas'
    let tipoModal = 'Exito' /* Info Exito Error */
    let mascotasGuardadas = []
    let validarBaseDeDatos = JSON.parse (localStorage.getItem('mascotasGuardadas'))

    abrirMensaje(mensajeModal, tipoModal)

    !validarBaseDeDatos ? localStorage.setItem('mascotasGuardadas', JSON.stringify(mascotasGuardadas)) : null

    console.log("Base de datos Mascotas")
    console.log(validarBaseDeDatos)

})

//#endregion DOMCONTENTLOADED

//#region EVENTOS DEL DOM

//GUARDAR DATOS

btnFormulario.addEventListener('click', (e) => {
    e.preventDefault()
    if (validarFormulario()) {
        abrirMensaje('Guardado exitosamente', 'Exito')

        let nuevaMascota = {
            nombre: nombreMascota.value,
            edad: edadMascota.value
        }

        guardarMascotaLocalStorage(nuevaMascota);

        formularioMascota.reset()

        /* Revisar como volver todos los datos de un objeto en false */

        itemsFormulario.valNombreMascota = false
        itemsFormulario.valEdadMascota = false

    } else {
        abrirMensaje('Recuerda llenar los campos', 'Error')
    }
})


textoHeader.addEventListener('click', (e) => {
    window.location.href = './mascotas.html'
})

//#endregion



/* Reto personal cargar imagen desde el ordenador para guardar en una carpeta de la pagina y despues de esto asignarla a la pagina aunque no es recomendable ya que la pagina pesaria  mucho mejor guardarle en una base de datos para extraerla y mostrarla como la de firebase :D depronto como precarga para subirla al servidor*/
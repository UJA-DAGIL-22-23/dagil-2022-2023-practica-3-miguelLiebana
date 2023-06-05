/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Jugadores = {};


/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Jugadores.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}

Jugadores.jugadorMostrado = null;


// Tags  para sustituir los campos
Jugadores.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "APELLIDOS": "### APELLIDOS ###",
    "DIA": "### DIA ###",
    "MES": "### MES ###",
    "AÑO": "### AÑO ###",
    "PARTICIPACIONESMUNDIAL": "### PARTICIPACIONES MUNDIAL ###",
    "PARTIDOSMVP": "### PARTIDOS MVP ###",
 
}
Jugadores.plantillaFormularioPersona = {}

/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Jugadores.mostrarHome = function (datosDescargados) {
    Frontend.Article.actualizar( "Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Jugadores.mostrarAcercaDe = function (datosDescargados) {
    const mensajeAMostrar= `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar( "Plantilla Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Jugadores.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome );
}

/**
 * Función principal para responder al evento de elegir la opción "Acerca de"
 */
Jugadores.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe );
}



/// Nombre de los campos del formulario para editar una persona
Jugadores.form = {
    NOMBRE: "form-persona-nombre",
    APELLIDOS: "form-persona-apellidos",
}

/// Objeto para almacenar los datos de la persona que se está mostrando
Jugadores.personaMostrada = null

/// Plantilla para poner los datos de una persona en un tabla dentro de un formulario
Jugadores.plantillaFormularioPersona = {}


// Formulario para mostrar los datos de un/a jugador/a
// Cabecera del formulario
Jugadores.plantillaFormularioPersona.formulario = `
<form method='post' action=''>
    <table width="100%" class="listado-personas">
        <thead>
            <th width="10%">Id</th><th width="20%">Nombre</th><th width="20%">Apellidos</th><th width="10%">eMail</th>
            <th width="15%">Año contratación</th><th width="25%">Acciones</th>
        </thead>
        <tbody>
            <tr title="${Jugadores.plantillaTags.ID}">
                <td><input type="text" class="form-persona-elemento" disabled id="form-persona-id"
                        value="${Jugadores.plantillaTags.ID}" 
                        name="id_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-nombre" required value="${Jugadores.plantillaTags.NOMBRE}" 
                        name="nombre_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-apellidos" value="${Jugadores.plantillaTags.APELLIDOS}" 
                        name="apellidos_persona"/></td>
                <td><input type="email" class="form-persona-elemento editable" disabled
                        id="form-persona-email" required value="${Jugadores.plantillaTags.PARTICIPACIONESMUNDIAL}" 
                        name="email_persona"/></td>
                <td>
                    <div><a href="javascript:Jugadores.editar()" class="opcion-secundaria mostrar">Editar</a></div>
                    <div><a href="javascript:Jugadores.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                    <div><a href="javascript:Jugadores.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
                </td>
            </tr>
        </tbody>
    </table>
</form>
`;



/// Plantilla para poner los datos de varias personas dentro de una tabla
Jugadores.tablaJugadoresNombres = {}
Jugadores.tablaJugadoresDatos = {}
Jugadores.tablaUnSoloJugador = {}


// Cabecera de la tabla
Jugadores.tablaJugadoresNombres.cabecera = 
`<table width="100%" class="listado-personas">
            <thead>
                <th width="20%">Nombre</th>
            </thead>
            <tbody>
    `;

    // Cabecera de la tabla
Jugadores.tablaJugadoresDatos.cabecera = `<table width="100%" class="listado-personas">
<thead>
    <th width="10%">Id</th>
    <th width="20%">Nombre</th>
    <th width="20%">Apellidos</th>
    <th width="10%">Dia</th>
    <th width="10%">Mes</th>
    <th width="10%">Año</th>
    <th width="15%">Participaciones Mundial</th>
    <th width="15%">PartidosMVP</th>

</thead>
<tbody>
`;

    // Cabecera de la tabla
    Jugadores.tablaUnSoloJugador.cabecera =
    `<table width="100%" class="listado-personas">
    <thead>
        <th width="10%">Id</th>
        <th width="20%">Nombre</th>
        <th width="20%">Apellidos</th>
        <th width="10%">Dia</th>
        <th width="10%">Mes</th>
        <th width="10%">Año</th>
        <th width="15%">Participaciones Mundial</th>
        <th width="15%">PartidosMVP</th>
    
    </thead>
    <tbody>
    `;

    Jugadores.tablaUnSoloJugador.cuerpo = `
    <tr title="${Jugadores.plantillaTags.ID}">
        <td>${Jugadores.plantillaTags.ID}</td>
        <td>${Jugadores.plantillaTags.NOMBRE}</td>
        <td>${Jugadores.plantillaTags.APELLIDOS}</td>
        <td>${Jugadores.plantillaTags.DIA}</td>
        <td>${Jugadores.plantillaTags.MES}</td>
        <td>${Jugadores.plantillaTags.AÑO}</td>
        <td>${Jugadores.plantillaTags.PARTICIPACIONESMUNDIAL}</td>
        <td>${Jugadores.plantillaTags.PARTIDOSMVP}</td>
    
    </tr>
    `;

/**
 * Crea la cabecera para mostrar la info como tabla
 * @returns Cabecera de la tabla
 */
Jugadores.cabeceraTable = function () {
    return `<table class="listado-proyectos">
        <thead>
        <th>Nombre</th><th>Apellidos</th><th>Presupuesto</th><th>Desde</th><th>Hasta</th>
        </thead>
        <tbody>
    `;
}

// Elemento TR que muestra los nombres de una persona
Jugadores.tablaJugadoresNombres.cuerpo = `
    <tr title="${Jugadores.plantillaTags.NOMBRE}">
        <td>${Jugadores.plantillaTags.NOMBRE}</td>
    </tr>
    `;

    // Elemento TR que muestra los datos de una persona
Jugadores.tablaJugadoresDatos.cuerpo = `
<tr title="${Jugadores.plantillaTags.ID}">
    <td>${Jugadores.plantillaTags.ID}</td>
    <td>${Jugadores.plantillaTags.NOMBRE}</td>
    <td>${Jugadores.plantillaTags.APELLIDOS}</td>
    <td>${Jugadores.plantillaTags.DIA}</td>
    <td>${Jugadores.plantillaTags.MES}</td>
    <td>${Jugadores.plantillaTags.AÑO}</td>
    <td>${Jugadores.plantillaTags.PARTICIPACIONESMUNDIAL}</td>
    <td>${Jugadores.plantillaTags.PARTIDOSMVP}</td>
    <td>
            <div><a href="javascript:Jugadores.mostrar('${Jugadores.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar Datos</a></div>
            <td><a href="javascript:Jugadores.modificar()" class="opcion-principal mostrar">Modificar</a></td>

    </td>
</tr>
`;

/**
 * Pie de la tabla en la que se muestran las personas
 * @returns Cadena con el pie de la tabla
 */
Jugadores.pieTable = function () {
    return "</tbody></table>";
}




// Pie de la tabla
Jugadores.tablaJugadoresNombres.pie = `        </tbody>
             </table>
             `;

             // Pie de la tabla
Jugadores.tablaUnSoloJugador.pie = `        </tbody></table>`
;


/**
 * Actualiza el cuerpo de la plantilla deseada con los datos de la persona que se le pasa
 * @param {String} Plantilla Cadena conteniendo HTML en la que se desea cambiar lso campos de la plantilla por datos
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */           
Jugadores.sustituyeTags = function (plantilla, jugador) {
    return plantilla
        .replace(new RegExp(Jugadores.plantillaTags.ID, 'g'), jugador.ref['@ref'].id)
        .replace(new RegExp(Jugadores.plantillaTags.NOMBRE, 'g'), jugador.data.nombre)
        .replace(new RegExp(Jugadores.plantillaTags.APELLIDOS, 'g'), jugador.data.apellidos)
        .replace(new RegExp(Jugadores.plantillaTags.FECHANACIMIENTO, 'g'), jugador.data.fechaNacimiento)

}

Jugadores.sustituyeTagsNombre = function (plantilla, jugador) {
    return plantilla
        .replace(new RegExp(Jugadores.plantillaTags.NOMBRE, 'g'), jugador.data.nombre)
}

Jugadores.sustituyeTagsDatos = function (plantilla, jugador) {
    return plantilla
        .replace(new RegExp(Jugadores.plantillaTags.ID, 'g'), jugador.ref['@ref'].id)
        .replace(new RegExp(Jugadores.plantillaTags.NOMBRE, 'g'), jugador.data.nombre)
        .replace(new RegExp(Jugadores.plantillaTags.APELLIDOS, 'g'), jugador.data.apellidos)
        .replace(new RegExp(Jugadores.plantillaTags.DIA, 'g'), jugador.data.fechaNacimiento.dia)
        .replace(new RegExp(Jugadores.plantillaTags.MES, 'g'), jugador.data.fechaNacimiento.mes)
        .replace(new RegExp(Jugadores.plantillaTags.AÑO, 'g'), jugador.data.fechaNacimiento.año)
        .replace(new RegExp(Jugadores.plantillaTags.PARTICIPACIONESMUNDIAL, 'g'), jugador.data.participacionesMundial)
        .replace(new RegExp(Jugadores.plantillaTags.PARTIDOSMVP, 'g'), jugador.data.partidosMVP)

}

/**
 * Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Jugadores.tablaJugadoresNombres.actualiza = function (persona) {
    return Jugadores.sustituyeTagsNombre(this.cuerpo, persona)
}

/**
* Actualiza el cuerpo de la tabla con los datos de la persona que se le pasa
* @param {jugador} Jugador Objeto con los datos de la persona que queremos escribir en el TR
* @returns La plantilla del cuerpo de la tabla con los datos actualizados
*/
Jugadores.tablaJugadoresDatos.actualiza = function (jugador) {
   return Jugadores.sustituyeTagsDatos(this.cuerpo, jugador)
}
Jugadores.tablaUnSoloJugador.actualiza = function (jugador) {
    return Jugadores.sustituyeTagsDatos(this.cuerpo, jugador)
}
/**
 * Actualiza el formulario con los datos de la persona que se le pasa
 * @param {Jugador} jugador Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Jugadores.plantillaFormularioPersona.actualiza = function (jugador) {
    return Jugadores.sustituyeTagsDatos(this.formulario, jugador)
}

/**
 * Función que recuperar todas las personas llamando al MS Personas
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */

Jugadores.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas las persoans que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data)
        Jugadores.almacenaVector(vectorPersonas.data)
    }
}

/**
 * Función que recuperar todas las personas llamando al MS Personas. 
 * Posteriormente, llama a la función callBackFn para trabajar con los datos recuperados.
 * @param {String} idPersona Identificador de la persona a mostrar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Jugadores.recuperaUnaPersona = async function (idPersona, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getPorId/" + idPersona
        const response = await fetch(url);
        if (response) {
            const jugador = await response.json()
            callBackFn(jugador)
        }
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
    }
}




/**
 * Imprime los datos de una persona como una tabla usando la plantilla del formulario.
 * @param {persona} Persona Objeto con los datos de la persona
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
Jugadores.personaComoTabla = function (persona) {
    return Jugadores.tablaUnSoloJugador.cabecera
        + Jugadores.tablaUnSoloJugador.actualiza(persona)
        + Jugadores.tablaUnSoloJugador.pie;
}

//HU 12

Jugadores.modificar = function () {
    let msj = Jugadores.jugadoresModifica(this.jugadorMostrado);
    Frontend.Article.actualizar("Modificar un jugador", msj)
}

Jugadores.jugadoresModifica = function (persona) {
    return Jugadores.tablaUnSoloJugador.cabecera
        + Jugadores.tablaUnSoloJugador.actualiza(persona)
        + Jugadores.tablaUnSoloJugador.pie;
}

/*Convertimos la función a asíncrona para que se muestren los datos actualizados*/
Jugadores.guardarModificacion = async function (id) {
    await this.modificarJugador(id)
    this.mostrar(id)
}

Jugadores.modificarJugador = async function (id) {
    try {
        let url = Frontend.API_GATEWAY + "/plantilla/setJugador/" + id
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                "nombre": document.getElementById("modifica-nombre").value,
                "apellidos": this.jugadorMostrado.APELLIDOS,
                "dia": this.jugadorMostrado.DIA,
                "mes": this.jugadorMostrado.MES,
                "año": this.jugadorMostrado.AÑO,
                "participacionesMundial": this.PARTICIPACIONESMUNDIAL.CIUDAD,
                "partidosMVP": this.jugadorMostrado.PARTIDOSMVP,
            }), // body data type must match "Content-Type" header
        })
        alert("Tu deportista se ha actualiza correctamente")
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
    }

}

//----------------------------------------


/**
 * Imprime los datos de una persona como una tabla dentro de un formulario usando la plantilla del formulario.
 * @param {jugador} Jugador Objeto con los datos del jugador
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
Jugadores.personaComoFormulario = function (jugador) {
    return Jugadores.plantillaFormularioPersona.actualiza( jugador );
}


/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */

Jugadores.imprimeMuchasPersonas = function (vector) {
    // console.log(vector) // Para comprobar lo que hay en vector

    // Compongo el contenido que se va a mostrar dentro de la tabla
    let msj = Jugadores.plantillaTablaPersonas.cabecera
    vector.forEach(e => msj += Jugadores.plantillaTablaPersonas.actualiza(e))
    msj += Jugadores.plantillaTablaPersonas.pie

}

/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */
Jugadores.imprimeListadoNombres = function (vector) {
     //console.log( vector ) // Para comprobar lo que hay en vector
     let msj = "";
     msj += Jugadores.tablaJugadoresNombres.cabecera;
     vector.forEach(e => msj += Jugadores.tablaJugadoresNombres.actualiza(e))
     msj += Jugadores.tablaJugadoresNombres.pie;
 
     // Borro toda la info de Article y la sustituyo por la que me interesa
     Frontend.Article.actualizar( "Listado de jugadores", msj )
}


Jugadores.imprimeListadoDatos = function (vector) {
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Jugadores.tablaJugadoresDatos.cabecera;
    vector.forEach(e => msj += Jugadores.tablaJugadoresDatos.actualiza(e))
    msj += Jugadores.pieTable;

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de jugadores", msj )
}

Jugadores.comparaNombres = function (a, b) {
    if (a.data.nombre > b.data.nombre) {
        return 1;
    }
    if (a.data.nombre < b.data.nombre) {
        return -1;
    }

    return 0;
}
Jugadores.OrdenarNombres = function (vector) {
    Jugadores.imprimeNombreMuchasPersonas(vector.sort(Jugadores.comparaNombre))
}

Jugadores.OrdenarDatos = function (vector) {
    Jugadores.imprimeDatosMuchasPersonas(vector.sort(Jugadores.comparaNombre))
}

Jugadores.OrdenarAlfabeticamenteN = function () {
    Jugadores.recupera(Deportistas.OrdenarNombres)

}
/**
 * Función para mostrar en pantalla todas las personas que se han recuperado de la BBDD.
 * @param {Vector_de_personas} vector Vector con los datos de las personas a mostrar
 */
Jugadores.imprimeListadoNombresAlfabeticamente = function (vector) {
      //console.log( vector ) // Para comprobar lo que hay en vector
      let msj = "";
      msj += Jugadores.tablaJugadoresNombres.cabecera;
      vector.forEach(e => msj += Jugadores.tablaJugadoresNombres.actualiza(e))
      msj += Jugadores.tablaJugadoresNombres.pie;
  
      // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Listado de nombres de deportistas ordenados alfabeticamente", msj)
}

Jugadores.comparaNombre = function (a, b) {
    if (a.data.nombre > b.data.nombre) {
        return 1;
    }
    if (a.data.nombre < b.data.nombre) {
        return -1;
    }

    return 0;
}




/**
 * Función para mostrar en pantalla los detalles de una persona que se ha recuperado de la BBDD por su id
 * @param {jugador} jugador Datos del jugador a mostrar
 */

Jugadores.imprimeUnJugador = function (jugador) {
    // console.log(jugador) 
    let msj = "";
    msj = Jugadores.personaComoFormulario(jugador);

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar una persona", msj)

    // Actualiza el objeto que guarda los datos mostrados
    Jugadores.almacenaDatos(jugador)
}

/**
 * Almacena los datos de la persona que se está mostrando
 * @param {Persona} persona Datos de la persona a almacenar
 */

Jugadores.almacenaDatos = function (persona) {
    Jugadores.personaMostrada = persona;
}

/**
 * Recupera los valores almacenados de la persona que se estaba mostrando
 * @return Datos de la persona a almacenada
 */

Jugadores.recuperaDatosAlmacenados = function () {
    return this.personaMostrada;
}



/**
 * Función principal para recuperar las personas desde el MS y, posteriormente, imprimirlas.
 */
Jugadores.listar = function () {
    Jugadores.recupera(Jugadores.imprimeMuchasPersonas);
}

Jugadores.listadoNombres = function(){
    Jugadores.recupera(Jugadores.imprimeListadoNombres);
}
Jugadores.OrdenarNombres = function (vector) {
    Jugadores.imprimeListadoNombresAlfabeticamente(vector.sort(Jugadores.comparaNombre))
}
Jugadores.ordenarListadoNombresAlfabeticamente = function(){
    Jugadores.recupera(Jugadores.OrdenarNombres)
}
Jugadores.listadoDatos = function(){
    Jugadores.recupera(Jugadores.imprimeListadoDatos);
}

Jugadores.mostrarDatosUnJugador = function(idJugador){
    Frontend.agregarHistorial("Pulsado botón Mostrar jugador de beisbol ")
    this.recuperaUnaPersona(idJugador, this.imprimeUnJugador);

}

/**
 * Función principal para mostrar los datos de una persona desde el MS y, posteriormente, imprimirla.
 * @param {String} idPersona Identificador de la persona a mostrar
 */
Jugadores.mostrar = function (idPersona) {
    this.recuperaUnaPersona(idPersona, this.imprimeUnJugador);
}


/**
 * Establece disable = habilitando en los campos editables
 * @param {boolean} Deshabilitando Indica si queremos deshabilitar o habilitar los campos
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Jugadores.habilitarDeshabilitarCamposEditables = function (deshabilitando) {
    deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
    for (let campo in Jugadores.form) {
        document.getElementById(Jugadores.form[campo]).disabled = deshabilitando
    }
    return this
}


/**
 * Establece disable = true en los campos editables
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Jugadores.deshabilitarCamposEditables = function () {
    Jugadores.habilitarDeshabilitarCamposEditables(true)
    return this
}


/**
 * Establece disable = false en los campos editables
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Jugadores.habilitarCamposEditables = function () {
    Jugadores.habilitarDeshabilitarCamposEditables(false)
    return this
}


/**
 * ????Muestra las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Jugadores.opcionesMostrarOcultar = function (classname, mostrando) {
    let opciones = document.getElementsByClassName(classname)
    let claseQuitar = mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR
    let claseAniadir = !mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR

    for (let i = 0; i < opciones.length; ++i) {
        Frontend.quitarClase(opciones[i], claseQuitar)
            .aniadirClase(opciones[i], claseAniadir)
    }
    return this
}

/**
 * Oculta todas las opciones secundarias
 * @returns El propio objeto para encadenar llamadas
 */
Jugadores.ocultarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", false)
    return this
}


/**
 * Muestra todas las opciones secundarias
 * @returns El propio objeto para encadenar llamadas
 */
Jugadores.mostrarOpcionesSecundarias = function () {
    this.opcionesMostrarOcultar("opcion-secundaria", true)
    return this
}


/**
 * Muestra las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Jugadores.mostrarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", true)
    return this
}


/**
 * Oculta las opciones que tiene el usuario cuando selecciona Editar
 * @returns El propio objeto Personas, para concatenar llamadas
 */
Jugadores.ocultarOcionesTerciariasEditar = function () {
    this.opcionesMostrarOcultar("opcion-terciaria editar", false)
    return this
}


/**
 * Función que permite modificar los datos de una persona
 */
Jugadores.editar = function () {
    this.ocultarOpcionesSecundarias()
    this.mostrarOcionesTerciariasEditar()
    this.habilitarCamposEditables()
}

/**
 * Función que permite cancelar la acción sobre los datos de una persona
 */
Jugadores.cancelar = function () {
    this.imprimeUnaPersona(this.recuperaDatosAlmacenados())
    this.deshabilitarCamposEditables()
    this.ocultarOcionesTerciariasEditar()
    this.mostrarOpcionesSecundarias()
}


/**
 * Función para guardar los nuevos datos de una persona
 */
Jugadores.guardar = async function () {
    try {
        let url = Frontend.API_GATEWAY + "/personas/setTodo/"
        let id_persona = document.getElementById("form-persona-id").value
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                "id_persona": id_persona,
                "nombre_persona": document.getElementById("form-persona-nombre").value,
                "apellidos_persona": document.getElementById("form-persona-apellidos").value,
                "email_persona": document.getElementById("form-persona-email").value,
                "año_entrada_persona": document.getElementById("form-persona-anio").value
            }), // body data type must match "Content-Type" header
        })
        /*
        Error: No procesa bien la respuesta devuelta
        if (response) {
            const persona = await response.json()
            alert(persona)
        }
        */
        Jugadores.mostrar(id_persona)
    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway " + error)
        //console.error(error)
    }
}

Jugadores.almacenaVector = function (vector) {
    this.vectorDeportistas = vector
}


Jugadores.ponerBotones = function(){
    let msj = Jugadores.botones;
    Frontend.agregarHistorial("Pulsado botón Aplicación beisbol")
    Frontend.Article.actualizar2("", msj)
}
Jugadores.botones=`<h1>Aplicación Microservicios beisbol</h1>
<nav>
<a href="javascript:Jugadores.listadoNombres()" class="opcion-principal mostrar"
    title="Realiza un listado de todas los nombres de los jugadores que hay en la BBDD">Listar nombres Jugadores</a>
<a href="javascript:Jugadores.ordenarListadoNombresAlfabeticamente()" class="opcion-principal mostrar"
    title="Realiza un listado de todas las personas que hay en la BBDD ordenado alfabeticamente">Listar personas Alfabéticamente</a>
<a href="javascript:Jugadores.listadoDatos()" class="opcion-principal mostrar"
    title="Realiza un listado de todas las personas con todos sus datos">Listado Datos</a>
</nav>
<br/>`
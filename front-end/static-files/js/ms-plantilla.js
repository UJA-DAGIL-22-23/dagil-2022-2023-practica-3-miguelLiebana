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
    EMAIL: "form-persona-email",
    ANIO: "form-persona-anio",
}

/// Objeto para almacenar los datos de la persona que se está mostrando
Jugadores.personaMostrada = null

/// Plantilla para poner los datos de una persona en un tabla dentro de un formulario
Jugadores.plantillaFormularioPersona = {}


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
                        id="form-persona-email" required value="${Jugadores.plantillaTags.FECHANACIMIENTO}" 
                        name="fecha_nacimiento"/></td>
                <td><input type="number" class="form-persona-elemento editable" disabled
                        id="form-persona-anio" min="1950" max="2030" size="8" required
                        value="${Jugadores.plantillaTags["AÑO ENTRADA"]}" 
                        name="año_entrada_persona"/></td>
                <td>
                    <div><a href="javascript:Personas.editar()" class="opcion-secundaria mostrar">Editar</a></div>
                    <div><a href="javascript:Personas.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                    <div><a href="javascript:Personas.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
                </td>
            </tr>
        </tbody>
    </table>
</form>
`;


/// Plantilla para poner los datos de varias personas dentro de una tabla
Jugadores.tablaJugadoresNombres = {}
Jugadores.tablaJugadoresDatos = {}


// Cabecera de la tabla
Jugadores.tablaJugadoresNombres.cabecera = `<table width="100%" class="listado-personas">
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

/**
 * Muestra la información de cada proyecto en un elemento TR con sus correspondientes TD
 * @param {proyecto} p Datos del proyecto a mostrar
 * @returns Cadena conteniendo todo el elemento TR que muestra el proyecto.
 */
Jugadores.cuerpoTr = function (p) {
    const d = p.data
    const ini = d.inicio;
    const fin = d.final;
    const presupuesto = Frontend.euros(d.presupuesto);

    return `<tr title="${p.ref['@ref'].id}">
    <td><em>${d.nombre}</em></td>
    </tr>
    `;
}

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

/**
 * Actualiza el formulario con los datos de la persona que se le pasa
 * @param {Persona} Persona Objeto con los datos de la persona que queremos escribir en el TR
 * @returns La plantilla del cuerpo de la tabla con los datos actualizados 
 */
Jugadores.plantillaFormularioPersona.actualiza = function (persona) {
    return Jugadores.sustituyeTags(this.formulario, persona)
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
</tr>
`;



/**
 * Imprime los datos de una persona como una tabla usando la plantilla del formulario.
 * @param {persona} Persona Objeto con los datos de la persona
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
Jugadores.personaComoTabla = function (persona) {
    return Jugadores.plantillaTablaPersonas.cabecera
        + Jugadores.plantillaTablaPersonas.actualiza(persona)
        + Jugadores.plantillaTablaPersonas.pie;
}


/**
 * Imprime los datos de una persona como una tabla dentro de un formulario usando la plantilla del formulario.
 * @param {persona} Persona Objeto con los datos de la persona
 * @returns Una cadena con la tabla que tiene ya los datos actualizados
 */
Jugadores.personaComoFormulario = function (persona) {
    return Jugadores.plantillaFormularioPersona.actualiza( persona );
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
 * @param {Persona} persona Datos de la persona a mostrar
 */

Jugadores.imprimeUnaPersona = function (persona) {
    // console.log(persona) // Para comprobar lo que hay en vector
    let msj = Jugadores.personaComoFormulario(persona);

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar una persona", msj)

    // Actualiza el objeto que guarda los datos mostrados
    Jugadores.almacenaDatos(persona)
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

/**
 * Función principal para mostrar los datos de una persona desde el MS y, posteriormente, imprimirla.
 * @param {String} idPersona Identificador de la persona a mostrar
 */
Jugadores.mostrar = function (idPersona) {
    this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona);
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
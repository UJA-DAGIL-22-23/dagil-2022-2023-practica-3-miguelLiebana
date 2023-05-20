/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTituloPrueba = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenidoPrueba = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME_BEISBOL = "Beisbol Home"
const TITULO_ACERCA_DE_BEISBOL = "Beisbol Acerca de"

const datosDescargadosPrueba5 = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
  }

// Función para wait y dar tiempo a que responda el microservicio
function wait(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS de prueba

//Spec listadoNombres
//-----------------------------------------------------------------------------------------------------------
//HU 02: Ver un listado solo con los nombres de todos los jugadores.---------------------------------
describe("Prueba Jugadores.listadoNombres HU 02", function() {
  beforeEach(function() {
  // Le paso datos a  recupera() para que devuelva una lista de deportistas
    spyOn(Jugadores, "recupera").and.callFake(function(callback) {
      callback([
        {nombre: "Miguel"},
        {nombre: "Ilde"},
        {nombre: "Alvaro"}
      ]);
    });
  });
  it("Se debería llamar a la función Jugadores.imprimeListadoNombres al ejecutar Jugadores.listadoNombres", function() {
    spyOn(Jugadores, "imprimeListadoNombres");
    
    Jugadores.listadoNombres();
    
    expect(Jugadores.imprimeListadoNombres).toHaveBeenCalled();
  });
});

//-----------------------------------------------------------------------------------------------------------
//HU 03: Ver un listado solo con los nombres de todos los jugadores/equipos ordenados alfabéticamente.-------
describe("Pruebas para Jugadores.ordenarListadoNombresAlfabeticamente HU 03", function() {
    beforeEach(function() {
      //Preparamos los datos
      spyOn(Jugadores, "recupera");
      spyOn(Jugadores, "imprimeListadoNombresAlfabeticamente");
    });
  
    it("debe llamar a la funcion recupera", function() {
      Jugadores.ordenarListadoNombresAlfabeticamente();
      expect(Jugadores.recupera).toHaveBeenCalled();
    });
  });

  
  describe("Pruebas para Jugadores.ordenarNombres HU 03", function() {
    it("debe ordenar el vector alfabéticamente por nombre", function() {
      // Preparamos los datos
      let vector = [
        { data: {nombre: "Miguel" } },
        { data: {nombre: "Alvaro" } },
        { data: {nombre: "Ilde" } }
      ];
  
      Jugadores.OrdenarNombres(vector);

  
      // Verifico que el vector fue ordenado correctamente
      expect(vector[0].data.nombre).toBe("Alvaro");
      expect(vector[1].data.nombre).toBe("Ilde");
      expect(vector[2].data.nombre).toBe("Miguel");
    });
  });
  

  
//-----------------------------------------------------------------------------------------------------------
//HU 04: Ver un listado con los datos de todos los jugadores.-------

  describe("Jugadores.sustituyeTagsDatos", function () {
    it("debería reemplazar todas las etiquetas con los datos del jugador", function () {
      const jugador = "ID: 1a2b3c, Nombre: Pepe, Apellidos: Gonzalez, Fecha de nacimiento: 20/02/2000, participaciones en mundial: 3, partidos como MVP: 1";
      const datosJugador = {
        ref: { "@ref": { id: "1a2b3c" } },
        data: {
          nombre: "Pepe",
          apellidos: "Gonzalez",
          fechaNacimiento: { dia: "20", mes: "02", año: "1990" },
          participacionesMundial: "3",
          partidosMVP: "1"
        }
      };
      const resultadoEsperado = `ID: 1a2b3c, Nombre: Pepe, Apellidos: Gonzalez, Fecha de nacimiento: 20/02/2000, participaciones en mundial: 3, partidos como MVP: 1`;
  
      const resultadoObtenido = Jugadores.sustituyeTagsDatos(jugador, datosJugador);
  
      expect(resultadoObtenido).toEqual(resultadoEsperado);
    });
  });

/**
 * @file server-spec.js
 * @description Fichero con la especificación de las pruebas TDD para server.js de MS Proyectos
 *              Este fichero DEBE llamarse server-spec.js
 *              Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Víctor M. Rivas Santos <vrivas@ujaen.es>
 * @date 03-Feb-2023
 */

const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');


/**
 * Test para las rutas "estáticas": / y /acerdade
 */

describe('Servidor Proyectos:', () => {
  describe('Rutas / y /acercade', () => {
    it('Devuelve Proyectos Home Page', (done) => {
      supertest(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio Proyectos: home");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve Proyectos Acerca De', (done) => {
      supertest(app)
        .get('/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio Proyectos: acerca de");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
  })


/**
 * Tests para acceso a la BBDD
 */
  describe('Acceso a BBDD:', () => {
    it('Devuelve \"UJA Contabilidad\" al consultar mediante test_db', (done) => {
      supertest(app)
        .get('/test_db')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data[0].data.hasOwnProperty('nombre'));
          assert(res.body.data[0].data.nombre === "UJA Contabilidad");

        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });



    it('Devuelve un vector de tamaño 2 al consultar mediante getTodos', (done) => {
      supertest(app)
        .get('/getTodos')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "getProyectos BODY: ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data.length === 2);
        })
        .end((error) => {error ? done.fail(error) : done(); }
        );
    });

    it('Devuelve 2 personas en el segundo proyecto al consultar getTodosConPersonas.\n'+
        '\n ---------------------------------------------'+
        '\n ¡¡¡¡ El MS Personas debe estar LEVANTADO !!!!'+
        '\n ---------------------------------------------'+
        '\n\n', (done) => {
      supertest(app)
        .get('/getTodosConPersonas')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "getProyectosConPersonas BODY: ", res.body.data ); // Para comprobar qué contiene exactamente res.body
          //console.log( "getProyectosConPersonas BODY data.length: ", res.body.data.length ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data[1].data.hasOwnProperty('datos_personas'));
          assert(res.body.data[1].data.datos_personas.length === 2);
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });
  })
});

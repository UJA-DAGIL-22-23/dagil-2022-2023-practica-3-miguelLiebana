/**
 * @file server-spec.js
 * @description Fichero con la especificación de las pruebas TDD para server.js del MS Personas
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
describe('Servidor Personas:', () => {
  describe('Rutas / y /acercade', () => {
    it('Devuelve Personas Home Page', (done) => {
      supertest(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio Personas: home");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
    it('Devuelve Personas Acerca De', (done) => {
      supertest(app)
        .get('/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio Personas: acerca de");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
  })

  /**
   * Tests para acceso a la BBDD
   */
  describe('Acceso a BBDD:', () => {
    it('Devuelve Ana al consultar mediante test_db', (done) => {
      supertest(app)
        .get('/test_db')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data[0].data.hasOwnProperty('nombre'));
          assert(res.body.data[0].data.nombre === "Ana");

        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });


    it('Devuelve un vector de tamaño 3 al consultar mediante getTodas', (done) => {
      supertest(app)
        .get('/getTodas')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          // console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data.length === 3);
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });


    it('Devuelve carlos@hotmail.com al recuperar los datos de la Persona con id 354047338258366678 mediante getPorId', (done) => {
      supertest(app)
        .get('/getPorId/354047338258366678')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data.hasOwnProperty('email'));
          assert(res.body.data.email === "ana.alvarez@gmail.com");
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });

    it('Devuelve CORREO@CAMBIADO.COM al recuperar los datos de la Persona con id 354047536357441750 mediante setTodo', (done) => {
      const CORREO_TEST= 'correo@correo.cambiado.com'
      const persona = {
        id_persona: '354047536357441750',
        nombre_persona: 'Nombre cambiado',
        apellidos_persona: 'Apellidos cambiados',
        email_persona: CORREO_TEST,
        año_entrada_persona: 1999
      };
      supertest(app)
        .post('/setTodo')
        .send(persona)
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "Server-spec , /setTodo res.body", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.data.hasOwnProperty('email'));
          assert(res.body.data.email === CORREO_TEST);
        })
        .end((error) => { error ? done.fail(error) : done(); }
        );
    });


  })
});



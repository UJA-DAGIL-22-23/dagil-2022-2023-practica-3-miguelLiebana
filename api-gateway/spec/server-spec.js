/**
 * @file server-spec.js 
 * @description Fichero con la especificación de pruebas para la aplicación API-gateway
 * Este fichero DEBE llamarse server-spec.js
 * Este fichero DEBE ubicarse en el subdirectorio spec/
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

const supertest = require('supertest');
const assert = require('assert')
const app = require('../server');

describe('API Gateway: rutas estáticas', () => {
  describe('Rutas estáticas de Proyectos', () => {
    it('Devuelve Proyectos Home Page', (done) => {
      supertest(app)
        .get('/proyectos/')
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
        .get('/proyectos/acercade')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "BODY ACERCA DE ", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('mensaje'));
          assert(res.body.mensaje === "Microservicio Proyectos: acerca de");

        })
        .end((error) => { error ? done.fail(error) : done() })
    });
  });
  describe('Rutas estáticas de Personas', () => {
    it('Devuelve Personas Home Page', (done) => {
      supertest(app)
        .get('/personas/')
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
        .get('/personas/acercade')
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
});



describe('API Gateway: acceso a ', () => {
  describe('BBDD Proyectos', () => {
    it('Obtener todos los proyectos: debe tener un campo data que es un array de 2 objetos', (done) => {
      supertest(app)
        .get('/proyectos/getTodos')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "Get Todos Proyectos", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('data'));
          assert(res.body.data.length === 2);

        })
        .end((error) => { error ? done.fail(error) : done() })
    });

    it('Devuelve 2 personas en el segundo proyecto al consultar getTodosConPersonas', (done) => {
      supertest(app)
        .get('/proyectos/getTodosConPersonas')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "Get Todos Proyectos Con Personas", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('data'));
          assert(res.body.data[1].data.hasOwnProperty('datos_personas'));
          assert(res.body.data[1].data.datos_personas.length === 2);
        })
        .end((error) => { error ? done.fail(error) : done() })
    });
  });

  describe('BBDD Personas', () => {
    it(' > Obtener todas las personas: debe tener un campo data que es un array de 3 objetos', (done) => {
      supertest(app)
        .get('/personas/getTodas')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          //console.log( "Get Todos Personas", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('data'));
          assert(res.body.data.length === 3);

        })
        .end((error) => { error ? done.fail(error) : done() })
    });


    it(' > Obtener una persona por su id: debe tener un campo data y a su vez un email que es ana.alvarez@gmail.com', (done) => {
      supertest(app)
        .get('/personas/getPorId/354047338258366678')
        .expect(200)
        .expect('Content-Type', /json/)
        .expect(function (res) {
          // console.log( "getPorId Persona", res.body ); // Para comprobar qué contiene exactamente res.body
          assert(res.body.hasOwnProperty('data'));
          assert(res.body.data.hasOwnProperty('email'));
          assert(res.body.data.email === "ana.alvarez@gmail.com");
        })
        .end((error) => { error ? done.fail(error) : done() })
    });
  });

});


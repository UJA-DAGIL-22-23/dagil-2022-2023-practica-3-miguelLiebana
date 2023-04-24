/**
 * @file routes.js
 * @description Define las rutas que se van a procesar en la aplicación front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

const express = require("express");
const router = express.Router();
const { callbacks } = require("./callbacks");


/* Directotio para rutas estáticas */
router.use('/', express.static(__dirname + '/static-files'))

// Cualquier ruta lleva a la página definida como home, porque es una web de una sola página
router.get("*", async (req, res) => {
    try {
        await callbacks.home(req, res)
    } catch (error) {
        console.log(error);
    }
});
// Dentro del fichero routes.js
// =============================

// Devuelve todos los proyectos que hay en la BBDD añadiendo las personas que participan
router.get("/getTodosConPersonas", async (req, res) => {
    try {
        await callbacks.getTodosConPersonas(req, res)
    } catch (error) {
        console.log(error);
    }
});

// Dentro del fichero callbacks.js
// ===============================

/**
* Prueba de conexión a la BBDD: devuelve todas los proyectos que haya en la BBDD.
* @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
* @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
*/
test_db: async (req, res) => {
    try {
        let proyectos = await client_proyectos.query(
            q.Map(
                q.Paginate(q.Documents(q.Collection("Proyectos"))),
                q.Lambda("X", q.Get(q.Var("X")))
            )
        )
        res.status(200).json(proyectos)
    } catch (error) {
        res.status(500).json({ error: error.description })
    }
},

// Exporto el módulo para poder usarlo en server
module.exports = router;

/**
 * @file callbacks.js
 * @description Callbacks para el MS Plantilla.
 * Los callbacks son las funciones que se llaman cada vez que se recibe una petición a través de la API.
 * Las peticiones se reciben en las rutas definidas en routes.js, pero se procesan aquí.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */



// Necesario para conectar a la BBDD faunadb
const faunadb = require('faunadb'),
    q = faunadb.query;

const client = new faunadb.Client({
    secret: 'fnAFCT_1NjAAzK0Kql8mzDhNEGVl-yccl4539-Su',
});

const COLLECTION = "Jugadores"

/**
 * Función que permite servir llamadas sin importar el origen:
 * CORS significa Cross-Origin Resource Sharing
 * Dado un objeto de tipo respuesta, le añade las cabeceras necesarias para realizar CROS
 * @param {*} res Objeto de tipo response 
 * @returns Devuelve el mismo objeto para concatenar varias llamadas al mismo
 */
function CORS(res) {
    res.header('Access-Control-Allow-Origin', '*')
        .header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
    return res;
}


/**
 * Objeto que contiene las funciones callback para interactuar con el modelo (e.d., la BBDD)
 */
const CB_MODEL_SELECTS = {
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
    /**
     * Método para obtener todos los proyectos de la BBDD.
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     */
    getTodos: async (req, res) => {
        try {
            let proyectos = await client_proyectos.query(
                q.Map(
                    q.Paginate(q.Documents(q.Collection("Proyectos"))),
                    q.Lambda("X", q.Get(q.Var("X")))
                )
            )
            // console.log( proyectos ) // Para comprobar qué se ha devuelto en proyectos
            CORS(res)
                .status(200)
                .json(proyectos)
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },
    /**
     * Método para obtener todos los proyectos de la BBDD y, además, las personas que hay en cada proyecto
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     */
    getTodosConPersonas: async (req, res) => {
        try {
            let proyectos = await client_proyectos.query(
                q.Map(
                    q.Paginate(q.Documents(q.Collection("Proyectos"))),
                    q.Lambda("X", q.Get(q.Var("X")))
                )
            )
            let url=URL_MS_PERSONAS+"/getTodas"
            let response_personas = await fetch(url)
            let personas = await response_personas.json()

            // Incluyo los datos de cada persona que hay en el proyecto
            proyectos.data.forEach( pr=>{
                // Creo un nuevo campo llamado datos_personas en cada proyecto
                pr.data.datos_personas=personas.data.filter( pe => 
                    pr.data.personas.join().includes( pe.ref["@ref"].id)
                )
            });
            
            CORS(res)
                .status(200)
                .json(proyectos)
        } catch (error) {
            res.status(500).json({ error: error.description+"\n ¡¡COMPRUEBE QUE EL MS PERSONAS FUNCIONA CORRECTAMENTE" })
        }
    },
}



/**
 * Callbacks adicionales. Fundamentalmente para comprobar que el ms funciona.
 */
const CB_OTHERS = {
    /**
     * Devuelve un mensaje indicando que se ha accedido a la home del microservicio
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     */
    home: async (req, res) => {
        try {
            res.status(200).json({mensaje: "Microservicio Proyectos: home"});
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },
    /**
     * Devuelve un mensaje indicando que se ha accedido a la información Acerca De del microservicio
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     */
    acercaDe: async (req, res) => {
        try {
            res.status(200).json({
                mensaje: "Microservicio Proyectos: acerca de",
                autor: "Miguel Liébana",
                email: "mlb00033@red.ujaen.es@red.ujaen.es",
                fecha: "abril, 2023"
            });
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },

    /**
     * Devuelve un mensaje indicando que se ha accedido a la información Acerca De del microservicio
     * @param {*} req Objeto con los parámetros que se han pasado en la llamada a esta URL 
     * @param {*} res Objeto Response con las respuesta que se va a dar a la petición recibida
     */
    ListarPersonas: async (req, res) => {
        try {
            res.status(200).json({
                mensaje: "Microservicio Proyectos: acerca de",
                autor: "Miguel Liébana",
                email: "mlb00033@red.ujaen.es@red.ujaen.es",
                fecha: "abril, 2023"
            });
        } catch (error) {
            res.status(500).json({ error: error.description })
        }
    },
    

}

// Une todos los callbacks en un solo objeto.
// OJO: No debe haber callbacks con el mismo nombre en los distintos objetos, porque si no
// el último que haya sobreescribe a todos los anteriores.
exports.callbacks = { ...CB_MODEL_SELECTS, ...CB_OTHERS }


//CB_MODEL_SELECTS.getTodosConPersonas() // Para depuración
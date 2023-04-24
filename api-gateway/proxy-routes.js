/**
 * @file proxy-routes.js
 * @description Objeto que almacena las rutas que deben ser consideradas por el proxy.
 * Cualquier URL que empiece por /personas es derivada al ms de personas; igual para /proyectos, etc.
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

const ROUTES = [
    {
        url: '/personas',
        proxy: {
            target: "http://localhost:8002",
            changeOrigin: true,
            pathRewrite: {
                [`^/personas`]: '',
            },
        }
    },
    {
        url: '/proyectos',

        proxy: {
            target: "http://localhost:8003",
            changeOrigin: true,
            pathRewrite: {
                [`^/proyectos`]: '',
            },
        }
    },
    /*{
        url: '/favicon.ico',
        proxy: {
            target: "/static-files/img/favicon.ico",
        },

    },*/
]

exports.routes = ROUTES;
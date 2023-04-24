/**
 * @file server.js
 * @description Define el servidor que aceptará las peticiones para el MS Proyectos
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */
const express = require("express");
const routes = require("./routes");
const app = express();
const port = 8003;
app.use("/", routes);


app.listen(port, () => {
    console.log(`Microservicio PROYECTOS ejecutándose en puerto ${port}!`);
});


module.exports = app

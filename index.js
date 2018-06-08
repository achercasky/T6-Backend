'use strict';

const Hapi = require('hapi');
const routes = require('./route');

//Crea servidor con su puerto
const server = Hapi.server({ port: process.env.PORT || 8083});

// Ruta de todos los endpoints
server.route(routes);

// Inicia el servidor
async function start() {

    try {
        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};

start();
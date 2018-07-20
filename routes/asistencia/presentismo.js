'use strict'

const AsistenciaDB = require('../asistencia/presentismo-db');

const HANDLER = {};

HANDLER.sendAsistencia = async (request, reply) => {

    console.log('Paso sendAsistencia');

    return AsistenciaDB.postAsistenciafromDB(request, reply);
}

module.exports = HANDLER;
'use strict'

const AsistenciaDB = require('../asistencia/presentismo-db');

const HANDLER = {};

HANDLER.getAsistencia = async (request, reply) => {

    console.log('Paso getAsistencia');

    return AsistenciaDB.getAsistenciafromDB();
}

HANDLER.getAsistenciaById = async (request, reply) => {

    console.log('Paso getAsistenciaById');

    return AsistenciaDB.getAsistenciaByIdfromDB(request, reply);
}

HANDLER.sendAsistencia = async (request, reply) => {

    console.log('Paso sendAsistencia');

    return AsistenciaDB.postAsistenciafromDB(request, reply);
}

HANDLER.editAsistencia = async (request, reply) => {

    console.log('Paso editAsistencia');

    return AsistenciaDB.editAsistenciafromDB(request, reply);
}

HANDLER.deleteAsistencia = async (request, reply) => {

    console.log('Paso deleteAsistencia');

    return AsistenciaDB.deleteAsistencia(request, reply);
}

module.exports = HANDLER;
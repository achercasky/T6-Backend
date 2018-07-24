'use strict'

const HorarioDB = require('./horario-db');

const HANDLERS = {};

HANDLERS.getHorarios = () => {
    return HorarioDB.getHorariosfromDB();
}

HANDLERS.postHorarios = (request, h) => {
    return HorarioDB.postHorariosfromDB(request, h);
}

HANDLERS.putHorarios = (request, h) => {
    return HorarioDB.editHorariosfromDB(request, h);
}

HANDLERS.deleteHorarios = (request, h) => {
    return HorarioDB.deleteHorario(request, h);
}

module.exports = HANDLERS;
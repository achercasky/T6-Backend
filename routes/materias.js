'use strict';

const constructors = require('./models/constructors');

const CronogramaDB = require('./cronograma/cronograma-db');

const HANDLERS = {};

HANDLERS.getCronograma = (request, h) => {

    return CronogramaDB.getCronogramaFromDb();
}

HANDLERS.getMaterias = () => {

}

HANDLERS.postMateria = () => {

}

HANDLERS.putMateria = () => {

}

HANDLERS.deleteMateria = () => {

}

module.exports = HANDLERS;

//nombre - id - horario
'use strict';

const constructors = require('./models/constructors');

const CronogramaDB = require('./cronograma/cronograma-db');
const MateriaDB = require('./materia/materia-db');

const HANDLERS = {};

HANDLERS.getCronograma = (request, h) => {

    return CronogramaDB.getCronogramaFromDb();
}

HANDLERS.getMaterias = () => {
    return MateriaDB.getMateriasfromDB();
}

HANDLERS.postMateria = (request, h) => {
    return MateriaDB.postAlumnosfromDB(request, h);
}

HANDLERS.putMateria = () => {

}

HANDLERS.deleteMateria = () => {

}

module.exports = HANDLERS;
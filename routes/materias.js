'use strict';

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

HANDLERS.putMateria = (request, h) => {
    return MateriaDB.editMateriafromDB(request, h);
}

HANDLERS.deleteMateria = (request, h) => {
    return MateriaDB.deleteMateria(request, h);
}

module.exports = HANDLERS;
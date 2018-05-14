'use strict';

const Materias = require('./routes/materias');

const Routes = [
    {
        method: 'GET',
        path: '/materias',
        handler: Materias.getMaterias
    }]

module.exports = Routes;
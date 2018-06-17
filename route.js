'use strict';

const Materias = require('./routes/materias');

const Reporte = require('./routes/reporte');

const Routes = [
    {
        method: 'GET',
        path: '/cronograma',
        handler: Materias.getCronograma
    },
    {
        method: 'GET',
        path: '/reporte',
        handler: Reporte.generarPDF
    }
]

module.exports = Routes;
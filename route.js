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
        method: 'POST',
        path: '/asistencia'
    },
    {
        method: ['GET','POST,','PUT','DELETE'],
        path: '/alumno'
    },
    {
        method: ['GET','POST,','PUT','DELETE'],
        path: '/horario'
    },
    {
        method: ['GET','POST,','PUT','DELETE'],
        path: '/materia'
    },
    {
        method: 'GET',
        path: '/reporte',
        handler: Reporte.generarPDF
    }
]

module.exports = Routes;
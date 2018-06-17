'use strict';

const Materias = require('./routes/materias');

const Alumno = require('./routes/alumno');

const Reporte = require('./routes/reporte');

const Routes = [
    {
        method: 'GET',
        path: '/cronograma',
        handler: Materias.getCronograma
    },
    {
        method: 'GET',
        path: '/alumnos',
        handler: Alumno.getAlumnos
    },
    {
        method: 'POST',
        path: '/alumnos',
        handler: Alumno.postAlumno
    },
    {
        method: 'PUT',
        path: '/alumnos',
        handler: Alumno.putAlumno
    },
    {
        method: 'DELETE',
        path: '/alumnos',
        handler: Alumno.getAlumnos
    },
    {
        method: 'GET',
        path: '/reporte',
        handler: Reporte.generarPDF
    }
]

module.exports = Routes;
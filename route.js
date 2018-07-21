'use strict';

const Materias = require('./routes/materias');

const Alumno = require('./routes/alumno/alumno');

const Reporte = require('./routes/reporte');

const Presentismo = require('./routes/asistencia/presentismo');

const Horario = require('./routes/horario');

const Routes = [
    
    {
        method: 'GET',
        path: '/cronograma',
        handler: Materias.getCronograma
    },
    {
        method: 'GET',
        path: '/materias',
        handler: Materias.getMaterias
    },
    {
        method: 'POST',
        path: '/materias',
        handler: Materias.postMateria
    },
    {
        method: 'PUT',
        path: '/materias',
        handler: Materias.putMateria
    },
    {
        method: 'DELETE',
        path: '/materias',
        handler: Materias.deleteMateria
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
        handler: Alumno.deleteAlumnos
    },
    {
        method: 'POST',
        path: '/asistencia',
        handler: Presentismo.sendAsistencia
    },
    {
        method: 'GET',
        path: '/horarios',
        handler: Horario.getHorarios
    },
    {
        method: 'POST',
        path: '/horarios',
        handler: Horario.postHorarios
    },
    {
        method: 'PUT',
        path: '/horarios',
        handler: Horario.putHorarios
    },
    {
        method: 'DELETE',
        path: '/horarios',
        handler: Horario.deleteHorarios
    },
    {
        method: 'GET',
        path: '/reporte',
        handler: Reporte.generarPDF
    }
]

module.exports = Routes;
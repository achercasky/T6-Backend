'use strict';

const Materias = require('./routes/materia/materias');

const Alumno = require('./routes/alumno/alumno');

const Reporte = require('./routes/reporte/reporte');

const Presentismo = require('./routes/asistencia/presentismo');

const Horario = require('./routes/horario/horario');

const Cronograma = require('./routes/cronograma/cronograma');

const Routes = [
    {
        method: 'GET',
        path: '/cronograma',
        handler: Materias.getCronograma
    },
    {
        method: 'GET',
        path: '/cronograma/{id}',
        handler: Materias.getCronogramaById
    },
    {
        method: 'POST',
        path: '/cronograma',
        handler: Cronograma.postCronograma
    },
    {
        method: 'PUT',
        path: '/cronograma',
        handler: Cronograma.putCronograma
    },
    {
        method: 'DELETE',
        path: '/cronograma',
        handler: Cronograma.deleteCronograma
    },
    {
        method: 'GET',
        path: '/materias',
        handler: Materias.getMaterias
    },
    {
        method: 'GET',
        path: '/materias/{id}',
        handler: Materias.getMateriasById
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
        method: 'GET',
        path: '/alumnos/{id}',
        handler: Alumno.getAlumnosById
    },
    {
        method: 'GET',
        path: '/alumnos/materias/{id}',
        handler: Alumno.getAlumnosByMateriaId
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
        method: 'GET',
        path: '/asistencia',
        handler: Presentismo.getAsistencia
    },
    {
        method: 'GET',
        path: '/asistencia/{date}',
        handler: Presentismo.getAsistenciaById
    },
    {
        method: 'POST',
        path: '/asistencia',
        handler: Presentismo.sendAsistencia
    },
    {
        method: 'PUT',
        path: '/asistencia',
        handler: Presentismo.editAsistencia
    },
    {
        method: 'DELETE',
        path: '/asistencia',
        handler: Presentismo.deleteAsistencia
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
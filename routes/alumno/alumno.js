const AlumnoDB = require('../alumno/alumno-db');

const HANDLERS = {};

HANDLERS.getAlumnos = (request, reply) => {
    console.log('paso getAlumnos');
    
    return AlumnoDB.getAlumnosfromDB();
}

HANDLERS.getAlumnosById = async (request, h) => {
    console.log('paso getAlumnosById');
    
    return AlumnoDB.getAlumnosfromDBById(request, h);
}

HANDLERS.getAlumnosByMateriaId = async (request, h) => {
    console.log('paso getAlumnosByMateriaId');
    
    return AlumnoDB.getAlumnosfromDbByMateriaId(request, h);
}

HANDLERS.postAlumno = (request, reply) => {
    console.log('Paso postAlumno')

    return AlumnoDB.postAlumnosfromDB(request, reply);
}

HANDLERS.putAlumno = (request, reply) => {
    console.log('Paso putAlumno')

    return AlumnoDB.editAlumnosfromDB(request, reply);
}

HANDLERS.deleteAlumnos = (request, reply) => {

    console.log('Paso deleteAlumno')

    return AlumnoDB.deleteAlumnos(request, reply);
}

module.exports = HANDLERS;
const AlumnoDB = require('../alumno/alumno-db');

const HANDLERS = {};

HANDLERS.getAlumnos = (request, reply) => {
    console.log('paso getAlumnos');
    
    return AlumnoDB.getAlumnosfromDB();
}

HANDLERS.getAlumnosById = (request, reply) => {
    console.log('paso getAlumnosById');
    
    return AlumnoDB.getAlumnosfromDBById(request, reply);
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
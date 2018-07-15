const AlumnoDB = require('../routes/alumno/alumno-db');

const HANDLERS = {};

HANDLERS.getAlumnos = (request, reply) => {
    console.log('paso getAlumnos');
    
    return AlumnoDB.getAlumnosfromDB();
}

HANDLERS.postAlumno = (request, reply) => {

}

HANDLERS.putAlumno = (request, reply) => {

}

HANDLERS.deleteAlumnos = (request, reply) => {

    console.log('Paso deleteAlumno')

    return AlumnoDB.deleteAlumnos(request, reply);
}

module.exports = HANDLERS;
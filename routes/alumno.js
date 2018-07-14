'use strict'

const HANDLERS = {};

HANDLERS.getAlumnos = (request, reply) => {

console.log('paso getAlumnos');

    var alumnos = [
        {
          "name": "Facundo",
          "surname": "Vani",
          "legajo": "A",
          "materias": [
            {
              "nombre": "Taller de Com. 1",
              "id": 0,
              "horarios": [
                {
                  "dia": "Lunes",
                  "hora": 1
                }
              ]
            }
          ]
        },
        {
          "name": "Ariel",
          "surname": "Chercasky",
          "legajo": "AB",
          "materias": [
            {
              "nombre": "Taller de Com. 1",
              "id": 0,
              "horarios": [
                {
                  "dia": "Lunes",
                  "hora": 1
                }
              ]
            }
          ]
        },
        {
          "name": "Martin",
          "surname": "Cetani",
          "legajo": "AA",
          "materias": [
            {
              "nombre": "Taller de Com. 1",
              "id": 0,
              "horarios": [
                {
                  "dia": "Lunes",
                  "hora": 1
                }
              ]
            }
          ]
        }
      ];

      return alumnos;
}

HANDLERS.postAlumno = (request, reply) => {

}

HANDLERS.putAlumno = (request, reply) => {
    
}

HANDLERS.deleteAlumno = (request, reply) => {
    
}

module.exports = HANDLERS;
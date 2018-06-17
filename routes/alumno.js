'use strict'

const HANDLERS = {};

HANDLERS.getAlumnos = (request, reply) => {
    var alumnos = [
        {
          "name": "Facundo",
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
      ]

      return alumnos;
}

HANDLERS.postAlumno = (request, reply) => {

}

HANDLERS.putAlumno = (request, reply) => {
    
}

HANDLERS.deleteAlumno = (request, reply) => {
    
}

module.exports = HANDLERS;
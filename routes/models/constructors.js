'use strict'

const CONSTRUCTORS = {};

//Constructor
CONSTRUCTORS.Materia = function(nombre, id, horario) {
    this.nombre = nombre;
    this.id = id;
    this.horario = horario;
}

CONSTRUCTORS.Cronograma = function(lunes, martes, miercoles, jueves) {
    this.lunes = lunes;
    this.martes = martes;
    this.miercoles = miercoles;
    this.jueves = jueves;
}

module.exports = CONSTRUCTORS;
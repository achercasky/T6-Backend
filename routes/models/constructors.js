'use strict'

const CONSTRUCTORS = {};

//Materia
CONSTRUCTORS.Materia = function(nombre, id, horario) {
    this.nombre = nombre;
    this.id = id;
    this.horario = horario;
}

//Cronograma
CONSTRUCTORS.Cronograma = function(lunes, martes, miercoles, jueves) {
    this.lunes = lunes;
    this.martes = martes;
    this.miercoles = miercoles;
    this.jueves = jueves;
}

//Alumno
CONSTRUCTORS.Alumno = function(nombre, legajo, materias) {
    this.nombre = nombre;
    this.legajo = legajo;
    this.materias = materias;
}

//Horario
CONSTRUCTORS.Horario = function(dia, hora) {
    this.dia = dia;
    this.hora = hora;
}

module.exports = CONSTRUCTORS;
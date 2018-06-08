'use strict';

const constructors = require('./models/constructors');

const HANDLERS = {};

HANDLERS.getMaterias = (request, reply) => {

    var horaUno = new constructors.Cronograma("Taller de Com. 1", "Algoritmos", "Matematica", "Taller de Com. 1");
    var horaDos = new constructors.Cronograma("Taller de Com. 1", "Algoritmos", "Matematica", "Taller de Com. 1");
    
    var horaTres = new constructors.Cronograma("Taller de Com. 1", "Algoritmos", "Matematica", "Taller de Com. 1");
    var horaCuatro = new constructors.Cronograma("Taller de Com. 1", "Algoritmos", "Taller de Creatividad ", "Inglés 1");
    
    var horaCinco = new constructors.Cronograma("Organización Empresarial", "Algoritmos", "Taller de Creatividad ", 
        "Inglés 1");
    var horaSeis = new constructors.Cronograma("Organización Empresarial", "Algoritmos", "Introduccion a la Informatica", 
        "Matematica");
    
    var result = [];
    var i = 0;

    result.push(horaUno);
    result.push(horaDos);
    result.push(horaTres);
    result.push(horaCuatro);
    result.push(horaCinco);
    result.push(horaSeis);
    
  
    return result;
}

module.exports = HANDLERS;

//nombre - id - horario
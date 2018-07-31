'use strict';

const CronogramaDB = require('./cronograma-db');

const HANDLERS = {};

HANDLERS.postCronograma = (request, h) => {
    return CronogramaDB.postCronogramafromDB(request, h);
}

HANDLERS.putCronograma = (request, h) => {
    return CronogramaDB.putCronogramafromDB(request, h);
}

HANDLERS.deleteCronograma = (request, h) => {
    return CronogramaDB.deleteCronogramaFromDb(request, h);
}

module.exports = HANDLERS;
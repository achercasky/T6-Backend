'use strict'

const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const ObjectID = mongo.ObjectID;

require('dotenv').config();

let DB_NAME = 't6';

let DB_COLLECTION_NAME = 'Asistencia';

const HANDLERS = {};

/** Valida si el alumno existe */
HANDLERS.postAsistenciafromDB = async (request, reply) => {

    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    var asistencias;

    try {
        const db = await client.db(DB_NAME);

        const body = request.payload;

        const collection = db.collection("Asistencia").findOne({ "materia" : body.materia});

        asistencias = collection
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

    return asistencias.then(function(result) {
        console.log('postAsistenciafromDB' + result);

            if(result == null) {
                 return postAsistencia(request, reply);
             }else {
                 return asistencias = {"title": "YA EXISTE!"};
             }
     })
}

async function postAsistencia(request, reply) {
    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    var asistencias;

    try {
        const db = await client.db(DB_NAME);

        const body = request.payload;

        asistencias = db.collection("Asistencia").insertOne(body);
         
        console.log('do something with %o', asistencias);
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

    return asistencias.then(function(result) {
        console.log(result.result.n)

        return result;
     })  
}

/** Obtener ASISTENCIA by ID*/
HANDLERS.getAsistenciafromDBById = async (request, h) => {

    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    var collection;

    try {
        const db = await client.db(DB_NAME);

        var obj_id = new ObjectID(request.params.id);

        console.log(request.params.id);

        collection = db.collection(DB_COLLECTION_NAME).findOne({'_id':obj_id});
        
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

    return collection.then(function(result) {
        console.log('PRESENTISMO DB' + result);
        return result;
     })  

}

module.exports = HANDLERS;
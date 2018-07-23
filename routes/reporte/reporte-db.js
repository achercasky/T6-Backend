'use strict'
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const ObjectID = mongo.ObjectID;

require('dotenv').config();

let DB_NAME = 't6';

const HANDLERS = {};

/** Obtener ALUMNOS by ID*/
HANDLERS.getAlumnosfromDBById = async (request, h) => {

    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    var collection;

    try {
        const db = await client.db(DB_NAME);

        var obj_id = new ObjectID(request.params.id);

        console.log(request.params.id);

        collection = db.collection("Alumno").findOne({'_id':obj_id});
        
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

    return collection.then(function(result) {
        return result;
     })  

}

module.exports = HANDLERS;
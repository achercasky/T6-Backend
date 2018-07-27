'use strict'
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const ObjectID = mongo.ObjectID;

require('dotenv').config();

let DB_NAME = 't6';
let DB_COLLECTION_NAME = 'Materia';

const HANDLERS = {};

/** GET MATERIAS */
HANDLERS.getMateriasfromDB = async () => {

    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    var collection;

    try {
        const db = await client.db(DB_NAME);

        collection = db.collection(DB_COLLECTION_NAME).find().toArray();

    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

    return collection;
}

/** GET MATERIAS BY ID */
HANDLERS.getMateriasByIdfromDB = async (request, h) => {

    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    var collection;

    try {
        const db = await client.db(DB_NAME);

        var id = new ObjectID(request.params.id);

        collection = db.collection(DB_COLLECTION_NAME).findOne({'_id':id});

    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

    return collection.then(function(result) {
        console.log('GET MATERIAS BY ID ' + JSON.stringify(result));
        return result;
     }).catch(function(error) {
         console.log('GET MATERIAS BY ID ERROR' + error);
     });
}

/** POST MATERIAS */
HANDLERS.postAlumnosfromDB = async (request, h) => {
    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    var collection;

    try {
        const db = await client.db(DB_NAME);

        const body = request.payload;

        collection = db.collection(DB_COLLECTION_NAME).insertOne(body);
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

    return collection.then(function (result) {
        return result;
    });
}

/** PUT MATERIAS */
HANDLERS.editMateriafromDB = async (request, h) => {
    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    const materia = [];

    var collection;

    try {
        const db = await client.db(DB_NAME);

        const body = request.payload;

        console.log(body.horario);

        materia.push(new ObjectID(body._id));

        collection = db.collection(DB_COLLECTION_NAME).updateOne({ '_id': { '$in': materia } }, {
            $set:
            {
                "name": body.name,
                "horario": 
                    {
                        "hora": [body.horario.hora],
                        "dia": [body.horario.dia]
                    }
                
            }
        });

    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

    return collection.then(function (result) {
        return result;
    })
}

/** DELETE MATERIA */
HANDLERS.deleteMateria = async (request, h) => {

    var response;

    const materiasIds = [];

    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    try {

        const db = await client.db(DB_NAME);

        const header = request.payload;

        header.forEach(element => {
            materiasIds.push(new ObjectID(element._id));
        });

        response = db.collection(DB_COLLECTION_NAME).remove({'_id':{'$in':materiasIds}});

    } catch(err) {
        console.log('Error deleteAlumnos' + err);
    } finally {
        client.close();
    }

    //The promise will always log pending as long as its results are not resolved yet. 
    //Regardless of the promise state (resolved or still pending) you must call .then on the promise to capture the results:
    return response.then(function(result) {

        if(result.result.n == 1) {
            return "Se BORRO";
        } else {
            return "NO SE BORRO";
        }
     })  
}

module.exports = HANDLERS;
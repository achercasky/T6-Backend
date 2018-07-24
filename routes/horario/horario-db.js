'use strict'
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const ObjectID = mongo.ObjectID;

require('dotenv').config();

let DB_NAME = 't6';
let DB_COLLECTION_NAME = 'Horario';

const HANDLERS = {};

/** GET HORARIOS */
HANDLERS.getHorariosfromDB = async () => {

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

/** POST HORARIOS */
HANDLERS.postHorariosfromDB = async (request, h) => {
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

/** PUT HORARIOS */
HANDLERS.editHorariosfromDB = async (request, h) => {
    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    const id = [];

    var collection;

    try {
        const db = await client.db(DB_NAME);

        const body = request.payload;

        console.log(body.horario);

        id.push(new ObjectID(body._id));

        collection = db.collection(DB_COLLECTION_NAME).updateOne({ '_id': { '$in': id } }, {
            $set:
            {
                "dia": body.dia,
                "horarios": [body.horarios]   
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

/** DELETE HORARIOS */
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
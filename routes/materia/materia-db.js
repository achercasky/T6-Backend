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

module.exports = HANDLERS;
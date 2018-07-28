'use strict'
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const ObjectID = mongo.ObjectID;

require('dotenv').config();

let DB_NAME = 't6';
let DB_COLLECTION_NAME = 'Alumno';

const HANDLERS = {};

/** Obtener ALUMNOS */
HANDLERS.getAlumnosfromDB = async function getAlumnos() {

    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    var alumnos;

    try {
        const db = await client.db(DB_NAME);

        const collection = db.collection(DB_COLLECTION_NAME).find().toArray();

        alumnos = collection;
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

    return alumnos.then(function (result) {
        console.log('GET ALUMNOS ' + JSON.stringify(result));
        return result;
    }).catch(function (error) {
        console.log('GET ALUMNOS ERROR' + error);
    });
}

/** Obtener ALUMNOS by ID*/
HANDLERS.getAlumnosfromDBById = async (request, h) => {

    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    var collection;

    try {
        const db = await client.db(DB_NAME);

        var id = new ObjectID(request.params.id);

        console.log(request.params.id);

        collection = db.collection(DB_COLLECTION_NAME).findOne({ '_id': id });

    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

    return collection.then(function (result) {
        return result;
    }).catch(function (error) {
        console.log('GET ALUMNOS BY ID ERROR' + error);
    });
}

/** GET ALUMNOS by MATERIAS ID*/
HANDLERS.getAlumnosfromDbByMateriaId = async (request, h) => {

    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    var collection;

    try {
        const db = await client.db(DB_NAME);

        collection = db.collection(DB_COLLECTION_NAME).find(
            {
                'materias': {
                    $elemMatch: {
                        "id": request.params.id
                    }
                }

            }
        ).toArray();

    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

    return collection.then(function (result) {
        return result;
    }).catch(function (error) {
        console.log('GET ALUMNOS BY MATERIAS ID ERROR' + error);
    });

}

/** POST Alumno */
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
        console.log('POST ALUMNO ' + result);
        return result;
    }).catch(function (error) {
        console.log('POST ALUMNO ' + error);
    });
}

/** PUT Alumno */
HANDLERS.editAlumnosfromDB = async (request, h) => {
    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    const alumno = [];

    var collection;

    try {
        const db = await client.db(DB_NAME);

        const body = request.payload;

        alumno.push(new ObjectID(body._id));

        collection = db.collection(DB_COLLECTION_NAME).updateOne({ '_id': { '$in': alumno } },
            {
                $set:
                {
                    "name": body.name,
                    "surname": body.surname,
                    "legajo": body.legajo,
                    "materias": body.materias
                }
            });

    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

    return collection.then(function (result) {
        console.log('PUT ALUMNO ' + result);
        return result;
    }).catch(function (error) {
        console.log('PUT ALUMNO ' + error);
    });
}

/** BORRAR ALUMNOS */
HANDLERS.deleteAlumnos = async (request, h) => {

    const alumnos = [];

    var response;

    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    try {

        const db = await client.db(DB_NAME);

        const header = request.payload;

        console.log(header);

        header.forEach(element => {
            alumnos.push(new ObjectID(element._id));
        });

        response = db.collection(DB_COLLECTION_NAME).remove({ '_id': { '$in': alumnos } });

    } catch (err) {
        console.log('Error deleteAlumnos' + err);
    } finally {
        client.close();
    }

    //The promise will always log pending as long as its results are not resolved yet. 
    //Regardless of the promise state (resolved or still pending) you must call .then on the promise to capture the results:
    return response.then(function (result) {
        console.log(result.result.n)

        if (result.result.n == 1) {
            return "Se Borro el Alumno";
        } else {
            return "No se borro el Alumno";
        }
    })
}

module.exports = HANDLERS;
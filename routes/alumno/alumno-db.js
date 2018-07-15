'use strict'
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const ObjectID = mongo.ObjectID;

require('dotenv').config();

let DB_NAME = 't6';

const HANDLERS = {};

/** Obtener ALUMNOS */
HANDLERS.getAlumnosfromDB = async function getAlumnos() {

    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    var alumnos;

    try {
        const db = await client.db(DB_NAME);

        const collection = db.collection("Alumno").find().toArray();

        alumnos = collection;

        console.log('do something with %o', collection);
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

    return alumnos;
}

/** Agregar Alumno */
HANDLERS.postAlumnosfromDB = async (request, reply) => {
    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    var alumnos;

    try {
        const db = await client.db(DB_NAME);

        const body = request.payload;

        const collection = db.collection("Alumno").insertOne(body);

        alumnos = collection;

        console.log('do something with %o', collection);
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

    return alumnos.then(function(result) {
        return result;
     })  
}

/** Editar Alumno */
HANDLERS.editAlumnosfromDB = async (request, reply) => {
    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    const alumno = [];

    var collection;

    try {
        const db = await client.db(DB_NAME);

        const body = request.payload;

        alumno.push(new ObjectID(body.id));

        collection = db.collection("Alumno").updateOne({'_id':{'$in':alumno}}, {$set: {"name": body.name, "surname": body.surname}});

        //alumnos = collection;
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

    return collection.then(function(result) {
        return result;
     })  
}

/** BORRAR ALUMNOS */
HANDLERS.deleteAlumnos = async (request, reply) => {

    const alumnos = [];

    var response;

    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    try {

        const db = await client.db(DB_NAME);

        const header = request.payload;
        
        console.log(header);

        header.forEach(element => {
            alumnos.push(new ObjectID(element.id));
        });

        response = db.collection("Alumno").remove({'_id':{'$in':alumnos}});

    } catch(err) {
        console.log('Error deleteAlumnos' + err);
    } finally {
        client.close();
    }

    //The promise will always log pending as long as its results are not resolved yet. 
    //Regardless of the promise state (resolved or still pending) you must call .then on the promise to capture the results:
    return response.then(function(result) {
        console.log(result.result.n)

        if(result.result.n == 1) {
            return "Se guardo";
        } else {
            return "NO SE GUARDO";
        }
     })  
}

module.exports = HANDLERS;
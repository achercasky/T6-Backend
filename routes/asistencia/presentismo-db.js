'use strict'

var DateFormat = require('dateformat');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const ObjectID = mongo.ObjectID;

require('dotenv').config();

let DB_NAME = 't6';

let DB_COLLECTION_NAME = 'Asistencia';

const HANDLERS = {};

/** GET ASISTENCIAS */
HANDLERS.getAsistenciafromDB = async () => {

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

    return collection.then(function(result) {
        console.log('GET ASISTENCIAS ' + JSON.stringify(result));
        return result;
     }).catch(function(error) {
         console.log('GET ASISTENCIAS ERROR' + error);
     });
}

/** GET ASISTENCIAS BY ID */
HANDLERS.getAsistenciaByIdfromDB = async (request, h) => {

    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    var collection;

    try {
        const db = await client.db(DB_NAME);

        //var id = new ObjectID(request.params.id);

        var requestDate = request.params.date;

        var date = DateFormat(requestDate, 'shortDate');

        collection = db.collection(DB_COLLECTION_NAME).findOne(
            {
                'date': date
            }
        );

    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

    return collection.then(function(result) {
        console.log('GET ASISTENCIAS BY ID' + JSON.stringify(result));
        return result;
     }).catch(function(error) {
         console.log('GET ASISTENCIAS BY ID ERROR' + error);
     });
}

/** POST ASISTENCIA */
HANDLERS.postAsistenciafromDB = async (request, h) => {

    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    var collection;

    try {
        const db = await client.db(DB_NAME);

        const body = request.payload;
        body.date = DateFormat(body.date, 'shortDate');

        //collection = db.collection(DB_COLLECTION_NAME).findOne({ "materia" : body.materia});

        collection = db.collection(DB_COLLECTION_NAME).insertOne(body);
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

    return collection.then(function(result) {
        console.log('POST ASISTENCIA ' + result);
        return result;

            /*if(result == null) {
                 return postAsistencia(request, reply);
             }else {
                 return asistencias = {"title": "YA EXISTE!"};
             }*/
     }).catch(function(error) {
        console.log('POST ASISTENCIA  ' + error);
    });
}

/*async function postAsistencia(request, reply) {
    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    var asistencias;

    try {
        const db = await client.db(DB_NAME);

        const body = request.payload;

        asistencias = db.collection(DB_COLLECTION_NAME).insertOne(body);
         
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
}*/

/** PUT ASISTENCIA */
HANDLERS.editAsistenciafromDB = async (request, h) => {
    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    const horarios = [];

    var collection;

    try {
        const db = await client.db(DB_NAME);

        const body = request.payload;
        body.date = DateFormat(body.date, 'shortDate');
        
        horarios.push(new ObjectID(body._id));
        

        collection = db.collection(DB_COLLECTION_NAME).updateOne( {'_id':{'$in':horarios} }, 
        {
            $set: 
            {
                "date": body.date, 
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
    }).catch(function(error) {
        console.log('PUT ALUMNO ' + error);
    }); 
}

/** BORRAR ASISTENCIA */
HANDLERS.deleteAsistencia = async (request, h) => {

    const asistencias = [];

    var response;

    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    try {

        const db = await client.db(DB_NAME);

        const header = request.payload;

        header.forEach(element => {
            asistencias.push(new ObjectID(element._id));
        });

        response = db.collection(DB_COLLECTION_NAME).remove({'_id':{'$in':asistencias}});

    } catch(err) {
        console.log('Error deleteAsistencia' + err);
    } finally {
        client.close();
    }

    return response.then(function(result) {
        console.log(result.result.n)

        if(result.result.n == 1) {
            return "Se Borro el ASISTENCIA";
        } else {
            return "No se borro el ASISTENCIA";
        }
     })  
}

module.exports = HANDLERS;
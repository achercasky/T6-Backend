'use strict'
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const ObjectID = mongo.ObjectID;

require('dotenv').config();

let DB_NAME = 't6';
let DB_COLLECTION_NAME = 'Cronograma';

const HANDLERS = {};

/** GET CRONOGRAMA*/
HANDLERS.getCronogramaFromDb = async (request, h) => {

    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    var collection;

    try {
        const db = await client.db(DB_NAME);
        
        collection = db.collection(DB_COLLECTION_NAME).find().toArray();

        console.log(collection);
        
    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

    return collection.then(function(result) {
        console.log(result);
        return result;
     });  
}

/** GET CRONOGRAMA by ID*/
HANDLERS.getCronogramaByIdFromDb = async (request, h) => {

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
        return result;
     }).catch(function(error) {
        console.log('GET CRONOGRAMA BY ID ERROR' + error);
    });  
}

/** POST CRONOGRAMA */
HANDLERS.postCronogramafromDB = async (request, h) => {
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
        console.log('POST CRONOGRAMA ' + result);
        return result;
    }).catch(function(error) {
        console.log('POST CRONOGRAMA ' + error);
    });
}

/** PUT CRONOGRAMA */
HANDLERS.putCronogramafromDB = async (request, h) => {
    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    const cronogramas = [];

    var collection;

    try {
        const db = await client.db(DB_NAME);

        const body = request.payload;

        cronogramas.push(new ObjectID(body._id));
       

        console.log(cronogramas);

        collection = db.collection(DB_COLLECTION_NAME).updateOne({ '_id': { '$in': cronogramas } }, {
            $set:
            {
                "year": body.year,
                "division": body.division,
                "horarios": body.horarios
            }
        });

    } catch (err) {
        console.log(err);
    } finally {
        client.close();
    }

    return collection.then(function (result) {
        console.log('PUT CRONOGRAMA ' + result);
        return result;
    }).catch(function(error) {
        console.log('PUT CRONOGRAMA ' + error);
    });
}

/** DELETE CRONOGRAMA */
HANDLERS.deleteCronogramaFromDb = async (request, h) => {

    var response;

    const cronogramaIds = [];

    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    try {

        const db = await client.db(DB_NAME);

        const header = request.payload;

        header.forEach(element => {
            cronogramaIds.push(new ObjectID(element._id));
        });

        response = db.collection(DB_COLLECTION_NAME).remove({'_id':{'$in':cronogramaIds}});

    } catch(err) {
        console.log('Error DELETE CRONOGRAMA' + err);
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
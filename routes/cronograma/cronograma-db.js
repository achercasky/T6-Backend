'use strict'
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

require('dotenv').config();

let DB_NAME = 't6';

const HANDLERS = {};

/** Obtener ALUMNOS by ID*/
HANDLERS.getCronogramaFromDb = async (request, h) => {

    const client = await MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true });

    var collection;

    try {
        const db = await client.db(DB_NAME);
        
        collection = db.collection("Cronograma").find().toArray();

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

module.exports = HANDLERS;
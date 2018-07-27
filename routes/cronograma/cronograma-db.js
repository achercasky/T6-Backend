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

module.exports = HANDLERS;
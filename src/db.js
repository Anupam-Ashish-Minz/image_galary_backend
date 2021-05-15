import mysql from 'mysql';
import util from 'util';
import { MongoClient } from 'mongodb';

// callback to return value
function mysqlConnect (query, callBack) {
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'test',
        password : 'test',
        database : 'image_galary'
    });

    connection.connect();
    
    connection.query(query, function (error, results, fields) {
        // to be converted to promise using util.promisify which takes in 
        // (error, value) syntax is null/undefined in no error
        callBack(error, results);
    });

    connection.end();
}

function mysqlRunQuery (query) {
    const connect = util.promisify(mysqlConnect);
    const data = connect(query);
    return data;
}

const db_uri = "mongodb://127.0.0.1:27017/";

const runMongo = async ({dbName, collectionName}, query) => {
    const client = new MongoClient(db_uri);
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);
    const data = await query(collection);
    await client.close();
    return data;
};

export { mysqlConnect, mysqlRunQuery, runMongo };


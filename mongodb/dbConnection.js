const { MongoClient } = require("mongodb");
const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

const dbConnection = async () => {
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db("mongoDB_Database");
    return db;
};

module.exports = {dbConnection}
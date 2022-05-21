const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://andrewjsanjaya:0898008980Andrew@cluster0.vnvnw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
let db;

async function connection() {
  try {
    await client.connect();
    db = client.db("m-cure-mongo-database");
  } catch (err) {
    console.log(err);
  }
}

function getDB() {
  return db;
}

module.exports = { connection, getDB };

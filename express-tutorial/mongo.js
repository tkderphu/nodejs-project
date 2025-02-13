import {MongoClient} from 'mongodb'
const url = "mongodb://localhost:27017"
const client = new MongoClient(url)

let conn;
try {
    conn = await client.connect()
} catch(err) {
    console.log(err);
}

let db = conn.db("test")
export default db
import { MongoClient} from "mongodb";
import dotenv from 'dotenv'
dotenv.config()

const URL_MONGODB: string = process.env.URL_MONGODB || ""
console.log(URL_MONGODB)
let client: MongoClient = new MongoClient("mongodb://localhost:27017")

client.connect().then(c => {
    console.log("ok")
}).catch(err => {
    console.log(err)
}) 
let db = client.db("test")
export default db
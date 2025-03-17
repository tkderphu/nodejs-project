

const redis = require('redis')
let redisClient;
async function connect() {
    redisClient = await redis.createClient()
        .on('error', (err) => {
            console.log(err)
        })
        .connect();

   redisClient.subscribe("notification", (message) => {
    console.log("receive message: ", message)
   })

}

connect().catch(err => {
    console.log("error: ", err)
})




/**
 * Notification feature
 * when user following someone, when that person  create post then 
 * user who followed will be receive message from that person
 */
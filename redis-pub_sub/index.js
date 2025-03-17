
const redis = require('redis')
let redisClient;
async function connect() {
    redisClient = await redis.createClient()
        .on('error', (err) => {
            console.log(err)
        })
        .connect();

    for(let i = 0; i < 2; i++) {
        redisClient.publish("notification", "message " + i)
    }

}

connect().catch(err => {
    console.log("error: ", err)
})



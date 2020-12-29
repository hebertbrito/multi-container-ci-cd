"use strict";
const keys = require('./keys')
const redis = require('redis')

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
})

const subRedisClient = redisClient.duplicate()

function fibonacci(index){
    if(index < 2) return 1
    return fibonacci(index - 1) + fibonacci(index - 2);
}

subRedisClient.on("message", (channell, message) =>{
    redisClient.hset("value", message, fibonacci(parseInt(message)))
})
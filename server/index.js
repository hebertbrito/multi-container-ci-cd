const keys = require("./keys")

const express = require("express")
const bodyParser = express.json();
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.json())


//PostGres setup
const { Pool } = require("pg")

const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
})

pgClient.on('connect', () => {
    pgClient
        .query('CREATE TABLE IF NOT EXISTS values (number INT)')
        .catch((err) => console.log(err));
});

//redis setup
const redis = require('redis')

const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
})
const subRedisClient = redisClient.duplicate()

app.get("/", async function (req, resp) {
    resp.json("ok")
})

app.get("/value/all", async function (req, resp) {
    try {

        const values = await pgClient.query("SELECT * FROM values")
        resp.status(200).json(values.rows)
    } catch (error) {
        resp.status(500).json("internal_server_error")
    }
})

app.get("/value/all", async function (req, resp) {
    try {

        redisClient.hgetall("values", (err, values) => {
            resp.status(200).json(values)
        })
    } catch (error) {
        resp.status(500).json("internal_server_error")
    }
})

app.post("/value/all", async function (req, resp) {
    try {

        const index = req.body.index
        if (parseInt(index) > 40) {
            return resp.status(401).json("index to high")
        }

        redisClient.hset("values", index, "Nothing yet!")
        subRedisClient.publish("isnert", index);
        await pgClient.query('INSERT INTO values(number) VALUES($1)', [index])
        resp.json({ working: true })
    } catch (error) {
        resp.status(500).json("internal_server_error")
    }
})

app.listen(5000, () => {
    console.log("port litening 8000")
})
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
require('dotenv').config()
const db = require('monk')(process.env.mongoconnstring)
const eventCollection = db.get('Calendar')

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
})

app.use(bodyParser.json())
app.use((req, res, next) => {
    next()
})

app.get('/Calendar', async (req, res) => {
    const Calendar = await eventCollection.find({})
    res.send(Calendar)
})

app.post('/Calendar', async (req, res) => {
    const eventData = req.body
    const savedEvent = await eventCollection.insert(eventData)
    res.send(savedEvent)
})

app.put('/Calendar', async (req, res) => {
    const eventData = req.body
    console.log(eventData)
    const updateEvent = await eventCollection.update(eventData._id, eventData)
    res.send(updateEvent)
})

app.listen('3001', () => console.log('running on 3001'))
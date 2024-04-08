const express = require('express')
const path = require('path')
const cors = require('cors')
const { connectDB, closeDB } = require('./database/db')
const mlbRouter = require('./routes/mlb.router')
const tripleARouter = require('./routes/tripleA.router')
const doubleARouter = require('./routes/doubleA.router')
const highARouter = require('./routes/highA.router')

const app = express()
const port = process.env.PORT || 8000

const corsOptions = {
	// origin: 'https://wobar.onrender.com'
	// origin: 'http://localhost:5173'
	origin: 'https://www.worldbaseballrating.com'
}

// Middlewares
app.use(cors(corsOptions))
app.use(express.json())

// Routes
app.use('/mlb-ratings', mlbRouter)
app.use('/tripleA-ratings', tripleARouter)
app.use('/doubleA-ratings', doubleARouter)
app.use('/highA-ratings', highARouter)

const startServer = async () => {
	try {
		await connectDB()
	} catch (error) {
		console.log('ERROR CONNECTING TO DATABASE', error)
	}
	app.listen(port, () => {
		console.log(`Listening on port ${port}...`)
	})
}

startServer()

process.on('SIGINT', async () => {
	await closeDB()
	process.exit(0)
})

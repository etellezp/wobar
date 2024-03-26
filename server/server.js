const express = require('express')
const cors = require('cors')
const { connectDB, closeDB } = require('./database/db')
const mlbRouter = require('./routes/mlb.router')
const tripleARouter = require('./routes/tripleA.router')
const doubleARouter = require('./routes/doubleA.router')

const app = express()
const port = process.env.PORT || 8000

const corsOptions = {
	origin: 'https://wobar.onrender.com'
}

// Middlewares
app.use(cors(corsOptions))
app.use(express.json())

// Routes
app.use('/mlbRatings', mlbRouter)
app.use('/tripleARatings', tripleARouter)
app.use('/doubleARatings', doubleARouter)

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

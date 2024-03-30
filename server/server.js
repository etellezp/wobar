const express = require('express')
const cors = require('cors')
const { createProxyMiddleware } = require('http-proxy-middleware')
const { connectDB, closeDB } = require('./database/db')
const mlbRouter = require('./routes/mlb.router')
const tripleARouter = require('./routes/tripleA.router')
const doubleARouter = require('./routes/doubleA.router')
const highARouter = require('./routes/highA.router')

const app = express()
const port = process.env.PORT || 8000

const corsOptions = {
	origin: 'https://wobar.onrender.com'
}

// Middlewares
app.use(cors(corsOptions))
app.use(express.json())

// Proxy requests to your React app
app.use(
	'/team-rankings',
	createProxyMiddleware({
		target: 'https://wobar.onrender.com',
		changeOrigin: true
	})
)
app.use(
	'/player-rankings',
	createProxyMiddleware({
		target: 'https://wobar.onrender.com',
		changeOrigin: true
	})
)

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

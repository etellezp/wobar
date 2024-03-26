require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb')

const mongoUri = process.env.MONGODB_URI

const client = new MongoClient(mongoUri, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true
	}
})

let db

const connectDB = async () => {
	try {
		await client.connect()
		console.log('Connected to MongoDB')
		db = client.db('Wobar')
	} catch (error) {
		console.error('Error connecting to MongoDB:', error)
	}
}

const getDB = () => {
	return db
}

const closeDB = async () => {
	try {
		await client.close()
		console.log('MongoDB connection closed')
	} catch (error) {
		console.error('Error closing MongoDB connection:', error)
	}
}

module.exports = {
	connectDB,
	getDB,
	closeDB
}

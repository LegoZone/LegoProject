const mongoose = require('mongoose')
const bluebird = require('bluebird')

const initializeDB = () => {
	const promise = mongoose.connect('mongodb://admin:admin@ds119675.mlab.com:19675/legopackages', { useMongoClient: true })	
}

const connectDbToBlueBird = () => {
	mongoose.Promise = bluebird
}

const startDB = () => {
	initializeDB()
	connectDbToBlueBird()
}

module.exports = startDB




const mongoose = require('mongoose')

const packagesSchema = new mongoose.Schema ({
	name: { type: String, unique: true, required: true},
	length: { type: String, require: true },
	img: { type: String, required: false }
})

module.exports = mongoose.model('legoPack', packagesSchema)

 
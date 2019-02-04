const mongoose = require('mongoose')
const Schema = mongoose.Schema
mongoose.promise = Promise

// Define productSchema
// TODO: add validation for image
// TODO: obtain userid for owneruserid
const productSchema = new Schema({
    title: { type: String, unique: false, required: true },
	owneruserid: { type: String, unique: false, required: true },
	description: { type: String, unique: false, required: true },
    imageurl: { type: String, unique: true, required: true },
    category: { type: String, unique: false, required: false },
    location: { type: String, unique: false, required: true },
    status: { type: String, unique: false, required: true },
	createdate: { 
		type: Date, required: true, default: Date.now }
})

// Create reference to Proudct & export
const Product = mongoose.model('Product', productSchema)
module.exports = Product
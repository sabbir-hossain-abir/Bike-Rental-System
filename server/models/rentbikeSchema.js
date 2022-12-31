const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const rentbikeSchema = new mongoose.Schema({
     brand: {
         type : String,
         required: true
     },
     model: {
         type: String,
         required: true
     },
     year: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    seats: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    rent: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        default: "Available for rent"
    },
    bookedHours: {
        type: Number,
        default: 0
    },
    fileName: {
        type: String,
        required: true
    },
    filePath: {
        type: String,
        required: true
    },
    fileType: {
        type: String,
        required: true
    },
    fileSize: {
        type: String,
        required: true
    }
},{timestamps:true})

rentbikeSchema.index({ brand: "text", model: "text" });

const Rentbike = mongoose.model('RENTBIKE', rentbikeSchema);

module.exports = Rentbike;



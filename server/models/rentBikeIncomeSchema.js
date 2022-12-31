const mongoose = require('mongoose');


const rentBikeIncomeSchema = new mongoose.Schema({
    userById: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    soldItems: [
        {
            productId: {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'renttbike',
                required : true
            },
            bookedHours: {
                type : Number,
                required : true
            },
            brand: {
                type : String,
                required : true
            },
            model: {
                type : String,
                required : true
            },
            retailPricePerItem: {
                type : Number,
                required : true
            },
            totalIncome: {
                type : Number,
                required : true
            },
        }
    ]

},{timestamps:true})




const Rentbikeincomes = mongoose.model('RENTBIKEINCOME', rentBikeIncomeSchema);

module.exports = Rentbikeincomes;



const mongoose = require('mongoose');


const rentcartSchema = new mongoose.Schema({
    userById: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    cartItems: [
        {
            rentbikeid: {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'Rentbike',
                required : true
            },
            requiredhours: {
                type : Number,
                required : true
            },
            rentperhour: {
                type : Number,
                required : true
            },
            totalbill: {
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
            }
        }
    ]

},{timestamps:true})




const Rentcart = mongoose.model('RENTCART', rentcartSchema);

module.exports = Rentcart;



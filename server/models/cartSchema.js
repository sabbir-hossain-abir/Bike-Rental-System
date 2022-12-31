const mongoose = require('mongoose');


const cartSchema = new mongoose.Schema({
    userById: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    cartItems: [
        {
            product: {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'renttbike',
                required : true
            },
            quantity: {
                type : Number,
                default : 1
            },
            price: {
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




const Cart= mongoose.model('CART', cartSchema);

module.exports = Cart;



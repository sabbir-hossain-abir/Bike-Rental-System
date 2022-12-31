const mongoose = require('mongoose');


const rentbikereviewSchema = new mongoose.Schema({
    bikeById: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Rentbike',
        required : true
    },
    allReviews: [
        {
            userById: {
                type : mongoose.Schema.Types.ObjectId,
                ref : 'User',
                required : true
            },
            name: {
                type : String,
                required : true
            },
            email: {
                type : String,
                required : true
            },
            comments: {
                type : String,
                required : true
            }
        }
    ]

},{timestamps:true})




const Rentbikereviews = mongoose.model('RENTBIKEREVIEW', rentbikereviewSchema);

module.exports = Rentbikereviews;



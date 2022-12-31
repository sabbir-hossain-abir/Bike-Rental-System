const express = require('express');
const router = express.Router();
const authenticate = require("../middelware/authenticate");



const User = require('../models/userSchema');
const Rentbike = require('../models/rentbikeSchema');
const Rentcart = require('../models/rentcartSchema');
const Rentbikeincomes = require('../models/rentBikeIncomeSchema');


module.exports = router.post('/updateRentDataBase', authenticate, async(req, res)=>{
    const getRentedBikes = req.body.items;
    let rentedBikePrice, rentedBikeId, rentedBikeHours, rentedBikeBrand, rentedBikeModel;
    
    getRentedBikes.map(getRentedBikes=>{
        rentedBikePrice = getRentedBikes.totalbill;
        rentedBikeId = getRentedBikes.rentbikeid;
        rentedBikeHours = getRentedBikes.requiredhours;
        rentedBikeBrand = getRentedBikes.brand;
        rentedBikeModel = getRentedBikes.model;
    })
    
    const findUser = await User.findOne({_id: req.userID});
    const findUserByID = findUser._id;
    const findBike = await Rentbike.findOne({_id: rentedBikeId});
    const cartData = await Rentcart.findOne({userById: findUserByID});
    const cartId = cartData._id;
    const bikeById = findBike._id; 
    const rentBikeBuyedPrice = findBike.price;

    try {
        
        const newincome = new Rentbikeincomes({
            userById : findUser,
            soldItems: [{
                productId : bikeById, 
                bookedHours : rentedBikeHours, 
                brand : rentedBikeBrand, 
                model : rentedBikeModel, 
                retailPricePerItem : rentBikeBuyedPrice, 
                totalIncome : rentedBikePrice
            }]
        });

        await newincome.save();

        
        await Rentcart.deleteOne({"_id": cartId});
        
    }
    catch(error) {
        res.status(500).send(error.message);
    }

})
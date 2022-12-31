const express = require('express');
const router = express.Router();
const authenticate = require("../middelware/authenticate");


const User = require('../models/userSchema');
const Rentbike = require('../models/rentbikeSchema');
const Rentcart = require('../models/rentcartSchema');
let alert = require('alert');


module.exports = router.post('/addrentcartocart', authenticate, async(req, res)=>{
    const getItemId = req.body.itemId;
    const getRentHours = req.body.rentHours;
    const findUser = await User.findOne({_id: req.userID});
    const findUserById = findUser._id;
    const findItem = await Rentbike.findOne({_id: getItemId});
    const itemPrice = findItem.rent;
    const itemById = findItem._id;
    
    const itemBrand = findItem.brand;
    const itemModel = findItem.model;

    try {
        let loginUser = await Rentcart.findOne({userById: findUserById});
        
        if(loginUser){
            let loginUserId = loginUser.userById;
            let itemIdInCart;
            
            loginUser.cartItems.map((cartItems)=>{
                itemIdInCart= cartItems.rentbikeid;
            })
           
        if(loginUserId){
            
            if(itemById.equals(itemIdInCart)){
                    
                alert('Item is already in the cart')
        
            }
            else{
                
                loginUser.cartItems.push({
                    rentbikeid:itemById, 
                    requiredhours:getRentHours, 
                    rentperhour:itemPrice, 
                    totalbill:itemPrice * getRentHours, 
                    brand:itemBrand, 
                    model:itemModel});
            }
            loginUser = await loginUser.save();
            return res.status(201).send(loginUser);
        }
    }
        else{
            
            const newCart= new Rentcart({
                userById : findUser,
                cartItems: [{
                    rentbikeid:itemById, 
                    requiredhours:getRentHours, 
                    rentperhour:itemPrice, 
                    totalbill:itemPrice * getRentHours, 
                    brand:itemBrand, 
                    model:itemModel
                }]
            });

            await newCart.save();

            return res.status(201).send(newCart);
        }

    } catch (error) {
        console.log(error)
        res.status(500).send("something went wrong");
    }

   
} )
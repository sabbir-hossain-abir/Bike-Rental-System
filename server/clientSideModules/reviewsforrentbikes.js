const express = require('express');
const router = express.Router();
const authenticate = require("../middelware/authenticate");


const User = require('../models/userSchema');
const Rentbike = require('../models/rentbikeSchema');
const Rentbikereviews = require('../models/rentbikereviewSchema');

let getReviewRentBikeId;

module.exports =router.post('/sendReviewRentBikeId', authenticate, async (req, res) =>{
    getReviewRentBikeId = req.body.selectedBikeId
}),



module.exports = router.get('/getRentBikeReviews', authenticate, async (req, res) =>{
    const findUser = await User.findOne({_id: req.userID});
    const findBike = await Rentbike.findOne({_id: getReviewRentBikeId.id});

    const data = {findBike,findUser}
    
    try{
        
        res.status(200).send(data);

    }catch(error) {
        res.status(400).send(error.message);
    }

    
}),


module.exports = router.get('/getallreviewsforselectedrentbike', authenticate, async (req, res) =>{

    const findAllReviews = await Rentbikereviews.findOne({bikeById: getReviewRentBikeId.id});
    
    try{
        
        res.status(200).send(findAllReviews);

    }catch(error) {
        res.status(400).send(error.message);
    }
}),


module.exports = router.post('/postrentbikereviews', authenticate, async (req, res)=>{

    const {id, name, email, message, selectedBikeId} = req.body;
    const findBike = await Rentbike.findOne({_id: selectedBikeId.id});
    const findBikeId = findBike._id;
    const findBikeReview = await Rentbikereviews.findOne({bikeById: findBikeId})
   

    try {
        
        if(findBikeReview){
            const bikeReviewId = findBikeReview.bikeById
            if(bikeReviewId.equals(findBikeId)){
                    findBikeReview.allReviews.push({
                    userById : id, 
                    name : name, 
                    email : email, 
                    comments : message,
               });
            }
            await findBikeReview.save();
            res.status(201).send({ message: "review submited successfully"});
        }
        else{
            const newReview = new Rentbikereviews({
                bikeById : findBike,
                allReviews: [{
                userById : id, 
                name : name, 
                email : email, 
                comments : message, 
                }]
            });

            await newReview.save();
            res.status(201).json({ message: "review submited successfully"});
        }
    }
    catch(error) {
        res.status(500).send(error.message);
    }
})
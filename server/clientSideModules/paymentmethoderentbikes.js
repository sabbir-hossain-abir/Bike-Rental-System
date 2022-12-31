const express = require('express');
const router = express.Router();
const authenticate = require("../middelware/authenticate");


const stripe = require("stripe")(process.env.STRIPE_SEC_KEY);
const {v4 : uuidv4} = require('uuid');

const Rentbike = require('../models/rentbikeSchema');

module.exports = router.post('/stripeRentPay', async (req, res, next) =>{
    const {token, amount, idRentedBike, hoursRequired} = req.body;
    const idempotencyKey = uuidv4();

    return [stripe.customers.create({
        email: token.email,
        source: token
    })
    .then(customer =>{
        stripe.charges.create({
            amount: amount,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email
        }, {idempotencyKey})
    })
    .then( result =>{
        res.status(200).json(result);
    })
    .catch(error =>{
        console.log(error)
    })],

    [await Rentbike.updateOne({"_id": idRentedBike},{$set:{"availability" : "Not Available for "+hoursRequired, "bookedHours": hoursRequired}})]

})
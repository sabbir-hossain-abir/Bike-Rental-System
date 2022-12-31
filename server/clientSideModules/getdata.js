const express = require('express');
const router = express.Router();

const authenticate = require("../middelware/authenticate");

//getting user complete data
module.exports = router.get('/getdata', authenticate, (req, res) =>{
    res.send(req.rootUser);
});
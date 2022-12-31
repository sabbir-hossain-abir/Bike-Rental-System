const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const bcrypt = require('bcryptjs');



require('../database/conn');

router.get('/', (req, res) =>{
    res.send('home page router')
});


// Client Side Modules ---for-- SignIn, SignUp, SignOut, Contactform
router.use(require('../clientSideModules/signup'))
router.use(require('../clientSideModules/signin'))
router.use(require('../clientSideModules/signout'))
router.use(require('../clientSideModules/getdata'))
router.use(require('../clientSideModules/contactform'))
router.use(require('../clientSideModules/displayallrentbikes'))
router.use(require('../clientSideModules/exploreallrentbikes'))
router.use(require('../clientSideModules/rentbikesearch'))
router.use(require('../clientSideModules/reviewsforrentbikes'))
router.use(require('../clientSideModules/addtocartforrentbikes'))
router.use(require('../clientSideModules/displayrentcartdata'))
router.use(require('../clientSideModules/paymentmethoderentbikes'))
router.use(require('../clientSideModules/updatedbafetrrentedbike'))






// Admin Side Modules---for--- SignIn, SignOut
router.use(require('../adminSideModules/signinadmin'))
router.use(require('../adminSideModules/signoutadmin'))
router.use(require('../adminSideModules/getadmindata'))

router.use(require('../adminSideModules/addrentbikes'))
router.use(require('../adminSideModules/getallrentbikes'))
router.use(require('../adminSideModules/incomeforrentbikes'))

// Admin Side Modules---for--- Users
router.use(require('../adminSideModules/deleteuser'))
router.use(require('../adminSideModules/getallusers'))

module.exports = router;
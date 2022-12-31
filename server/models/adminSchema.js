const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const adminSchema = new mongoose.Schema({
     adminName: {
         type : String,
         required: true
     },
     email: {
         type: String,
         required: true
     },
     phone: {
        type: String,
        required: true
    },
    adminPassword: {
        type: String,
        required: true
    },
    cPassword: {
        type: String,
        required: true
    },
    tokens: [
        {
            token:{
                type: String
            }
        }
    ]
})

// hashing password

adminSchema.pre('save', async function(next){

    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cPassword = await bcrypt.hash(this.cPassword, 12);
    }
    next();

});


//generating token
adminSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);

        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;

    }catch(err){
        console.log(err)
    }
}


const Admin = mongoose.model('ADMIN', adminSchema);

module.exports = Admin;



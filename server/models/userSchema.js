const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
     name: {
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
    password: {
        type: String,
        required: true
    },
    cPassword: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    },
    messages:[
        {
            name: {
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
           message: {
               type : String,
               required: true
           } 
        }
    ],
    tokens: [
        {
            token:{
                type: String
            }
        }
    ]
})

// hashing password

userSchema.pre('save', async function(next){
    
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cPassword = await bcrypt.hash(this.cPassword, 12);
    }
    next();

});


//generating token
userSchema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id: this._id}, process.env.SECRET_KEY);
    
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;

    }catch(err){
        console.log(err)
    }
}

//storing message in db
userSchema.methods.addMessage = async function (name, email, phone, message){
    try {
        this.messages = this.messages.concat({name, email, phone, message})
        await this.save();
        return this.messages;
    } catch (error) {
        console.log(error)
    }
}

const User = mongoose.model('USER', userSchema);

module.exports = User;



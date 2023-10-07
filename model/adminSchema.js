//ADMIN SCHEMA

const mongoose=require('mongoose')
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')


const schema= new mongoose.Schema({
  
    email: {
        type: String,
        required: true
    },
 
  
    password: {
        type: String,
        required: true
    },

    cpassword: {
        type: String,
        required: true
    },
 
    tokens:[
        {
            token: {
                type: String,
                required: true
            }
        }
    ],
  
})



//Hashing the password
schema.pre('save', async function (next){
         if(this.isModified('password')){
            this.password = await bcrypt.hash(this.password, 12);
            this.cpassword = await bcrypt.hash(this.cpassword, 12);
        }
        next();
});

//Generating Token
schema.methods.generateAuthToken = async function(){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log(err);
    }
}



//exporting Schema to auth.js

const adminSchema = mongoose.model('ADMIN', schema);

module.exports = adminSchema;
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username:{
        type : String,
        required:[ true, 'username is required'],
    },
    email:{
        type: String,
        required:[ true, 'email  is required'],

    },
    password:{
        type: String,
        required: [ true, 'password is required'],
    },
    address:{
        type:Array,
    },
    phone:{
        type: String,
        required : [ true, 'user name is required'],
    },
    usertype: { 
        type: String, 
        enum: ['admin', 'client' , 'vendor','driver'],   
        default: 'client',
    }, 
    profile:{
        type : String,
        default : 'https://imgs.search.brave.com/KU40rN8bw6uW6VCkfaN0eWvpyt2NNTPlATZDXlg-sqM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzE2LzA1LzQ1LzM2/LzM2MF9GXzE2MDU0/NTM2MTlfZGxOUWFl/ZjNCbmEwdTdKRTVV/blpmUmp6clRxeVlr/WWguanBn'

    },
    phrase:{
        type: String,
        required:[true,"phrase is required"]
    },

     // 🔹 Add these fields for OTP login
    otpCode: { type: String }, // store hashed OTP or plain temporarily
    otpExpiry: { type: Date }, // when OTP expires
},{timestamps :true});

userSchema.pre('save', async function(next){
    const user = this;
    if(!user.isModified('password'))return next();
    try {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(this.password, salt);
            this.password = hashedPassword;

        next();

    } catch (error) {
        return next(error);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword){
    try {
        const isMatched = await bcrypt.compare(candidatePassword, this.password);
        return isMatched;
    } catch (error) {
        
    }
}


const user = mongoose.model('User' , userSchema);
module.exports = user;
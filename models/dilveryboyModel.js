const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const dilveryboySchema = new mongoose.Schema({
    name:{
        type : String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    mobileno:{
         type : String,
         required: true
    },
    email:{
         type : String,
         required: true
    }

});


const dilveryboy = mongoose.model('Dilveryboy' , dilveryboySchema);
module.exports = dilveryboy;
const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    title:{
        type : String,
        required: [true, 'Food title is required'],
        unique: true
    },
    discription:{
        type: String,
        required: [true, 'Food discription is required'],
    },
    price:{
        type: Number,
         required: [true, 'Food price is required'],
    },
    imageUrl:{
        type:String,
        default:'baad mein karte hai ',
    },
    foodTags:{
        type:String,
    },
    cateogary:{
        type: String,
    },
    code:{
         type: String,
    },
    isAvailable:{
         type : Boolean,
         default: true
    },
    resturent:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Resturent'
    },
    rating:{
        type:Number,
        default:5,
        min:1,
        max:5
    },
    ratingCount:{
        type:String,
    }

});


const food = mongoose.model('Food' , foodSchema);
module.exports = food;
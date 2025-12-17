const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({

    food:[{
      foodId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Food",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
      price: {
        type: Number,
        required: true,
      },
    },
    ],
        
    payment:{
         type: Number,
         required: true,
    },
    buyer: {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    status:{
        type:String,
        enum:["preparing","on the way","delivered"],
        default:"preparing"
    }    

    
},
{timestamps:true}
)

module.exports = mongoose.model("Orders" ,orderSchema )
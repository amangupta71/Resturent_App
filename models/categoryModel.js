const mongoose = require('mongoose')

const cateogarySchema = new mongoose.Schema({
    title:{
        type:String,
        reqired:[true, 'cateogary title is required']
    },
    imageUrl:{
        type:String,
        default:'baad mei dekhte hai'
    },
},
{timestamps:true}
) 

module.exports = mongoose.model('Category',cateogarySchema)
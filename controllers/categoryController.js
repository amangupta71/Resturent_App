const categoryModel = require('../models/categoryModel');

const createCAtController = async(req,res)=>{
    try {
        const{title,imageUrl} = req.body
        //validation 
        if(!title || !imageUrl){
            return res.status(500).send({message:'provide cateogary title and image url'})
        }
        const newcateogary = new categoryModel({title,imageUrl})
        await newcateogary.save();
        res.status(200).send({
            message:'new cateogary created ',
            newcateogary: newcateogary.title,
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({messgae:'error in creating cateogary', error});
    }
}

const getallCATController = async(req , res)=>{
    try {
        const cateogaries = await categoryModel.find({})
        if(!cateogaries){
            return res.status(404).send({message:'no cateogries found'})
        }
        res.status(200).send({
            sucess:true,
            totalCat : cateogaries.length,
            cateogaries,
        })
    } catch (error) {
         console.log(error)
        res.status(500).send({messgae:'error in getall cateogary', error});
    }
}

const updateCATController = async(req,res)=>{
      try {
        const{id} = req.params;
        const{ title , imageUrl} = req.body;
        const updatedCateogary = await categoryModel.findByIdAndUpdate(
        id,
        {title,imageUrl},{new:true}
         );
        if(! updatedCateogary){
        return res.send(500).send({message:'no cateogary found'})
        }
        res.status(200).send(        {
            message : 'cateogary updated succesfully',
            cateogaryupdated:updatedCateogary.title
        })
      } catch (error) {
         console.log(error)
        res.status(500).send({messgae:'error in update cateogary', error});
      }
}

const deleteCATController = async(req,res)=>{
    try {
        const {id} = req.params
        if(!id){
            return res.status(500).send({message:'please provide cateogary Id'})
        }

        const cateogary = await categoryModel.findById(id)
        if(!cateogary){
            return res.status(500).send({message:'no cateogary exist withh this id '})
        }
        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            message:' category deleted',
            cateogarydelete: cateogary.title
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).send({messgae:'error in delete cateogary', error});
    }

}
module.exports = {
    createCAtController,
    getallCATController,
    updateCATController,
    deleteCATController
}
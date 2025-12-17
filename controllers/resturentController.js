const resturentModel = require('../models/returentModel')

const createResturentController = async(req,res)=>{
    try {
        
        const{
            title,imageUrl,foods,time,pickup,dilvery,isopen,logoUrl,rating,
            ratingCount,code,coords
        } = req.body;


        // validation
        if(!title || !coords){
            res.status(500).send({message:'please provide title and address'})
        }
        const newResturent = new resturentModel({ title,imageUrl,foods,time,pickup,dilvery,
            isopen,logoUrl,rating,ratingCount,code,coords})

        await newResturent.save();
        res.status(201).send({message:'new resturent added succesfully'})    
    } catch (error) {
        
    }

}

const getallreturentController = async(req,res)=>{
    try {
        const resturent = await resturentModel.find({})
        if(!resturent){
            res.status(404).send({message:'No resturent available'})
        }
        
        res.status(200).send({
            sucess:true,
            totalcount: resturent.length,
            resturent
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({message:'error in get all  api'})
    }
}

const getReturentbyidController = async(req,res)=>{
    try {
        const resturentid = req.params.id
        if(!resturentid){
            return res.status(400).send({message:'please provide returent id'})
        }
        //find returent
        const resturent = await resturentModel.findById(resturentid)
        if(!resturent){
            res.status(404).send({message:'returent not found'})
        }
        res.status(200).send({
            resturent,
        })
    } catch (error) {
         console.log(error)
        res.status(500).send({message:'error in get by id api'})
    }
}


//delete resturent

const deleteResturentController = async(req,res)=>{
    try {
        const resturentid = req.params.id
          if(!resturentid){
            return res.status(400).send({message:'please provide returent id'})
        }
        const resturent = await resturentModel.findByIdAndDelete(resturentid)

         res.status(200).send(
            resturent.title,{
             message:'returent deleted succesfully',
        })

    } catch (error) {
         console.log(error)
        res.status(500).send({message:'error in delete resturnt api'})
    }
}

module.exports = {
    createResturentController,
    getallreturentController,
    getReturentbyidController,
    deleteResturentController,
}
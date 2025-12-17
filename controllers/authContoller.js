const userModel = require('../models/usermodel');
const bcrypt = require('bcrypt');
const { jwtAuthMiddleware, generateToken } = require('./../jwt');

//register
const registerController = async(req,res)=>{
   try {
           const{username,email,password,phone,address,phrase} = req.body;
           //validation
           if(!username || !email ||!password || !phone|| !address || !phrase){
            return res.status(500).send({message: 'Please Provide All fields'})
           }
           // check user
           const existing = await userModel.findOne({email});
           if(existing){
            return res.status(500).send({message : 'email already registered',})
           }
           //create new user
           const user = await userModel.create({
            username,email,password,address,phone,phrase,
           });

           //
            const payload = { id: user.id , role: user.usertype};
            const token = generateToken( payload);
            console.log(user.username , 'registered successfully')
            console.log("token is :", token);

           res.status(201).json({
            message: 'succesfully registered',
            id: user._id,       
             token: token,
             username: user.username,
             email: user.email,
             usertype: user.usertype,})
   } catch (error) {
      console.log(error);
      res.status(500).send({message:'error during register' , error})
   }
};

//login
const loginController = async (req,res)=>{
   try {
     const{email, password} = req.body; // assume body contains JSON data with username and password

        //find the person by username
        const user = await userModel.findOne({email:email});

        //if user is not found or password does not match
        if(!user || !(await user.comparePassword(password))){
            return res.status(401).json({error: 'invalid email or password'});
        }


        console.log('person logged in :', user.usertype);
        
        //token generation using payload data
        payload = { id: user.id , usertype: user.usertype,username: user.username};
        const token = generateToken(payload);
        
        //console.log('person id', user.id);


         res.status(200).json({
             message: 'Login successful',
             id: user._id,       
             token: token,
             username: user.username,
             email: user.email,
             usertype: user.usertype,
               });


   } catch (error) {
       console.log(error);
      res.status(500).send({message:'error during login'})
   }
}

module.exports= {
    registerController,
    loginController 

};

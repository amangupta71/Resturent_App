const testUserController =(req,res) =>{
    try {
        res.status(200).send({message: 'test User Data API  '});
    } catch (error) {
     console.log('error in test API', error)   
    }
};


module.exports =  {testUserController};
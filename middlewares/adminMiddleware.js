const userModel = require('../models/usermodel')


const adminmiddleware = module.exports = async(req , resizeBy,next)=>{
    try {
        const userId = req.user.id;
        const user = await userModel.findById(userId);

      if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (user.usertype !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied: Admins only" });
    }
        else{
            next();
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({
            sucess:false,
            message: " Un-Authoried Access"
        })
        
        
    }
}

module.exports = adminmiddleware
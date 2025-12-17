const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req,res,next)=>{
     if(!req.headers.authorization){
        return res.status(401).json({error: 'Unauthorized: No token provided'});
    }

    const token = req.headers.authorization.split(' ')[1];
     if(!token){
        return res.status(401).json({error: 'Unauthorized: No token provided'});
    }
    
    try {
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        
        req.user = decoded;
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({error: 'Unauthorized: Invalid token'});
    }
}

const generateToken = (userData) =>{
     return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:'7d'});
}

module.exports ={
    jwtAuthMiddleware,
    generateToken
}
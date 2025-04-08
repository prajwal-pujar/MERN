var jwt = require('jsonwebtoken');
var jwtsecreat = "i am a good boy";

const fetchuser = async(req , res , next) =>{
    try{
        const token = req.header("auth-token");
        if(!token){
            return res.status(400).json({ errors: "NO TOKEN FOUND" });
        }
        const data = jwt.verify(token, jwtsecreat)
        req.user = data.user
        next()
    }catch(err){
        console.log(err)
    }
   
}

module.exports = fetchuser
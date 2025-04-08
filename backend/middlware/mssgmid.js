var jwt = require('jsonwebtoken');
var jwtsecreat = "i am a good boy";


const fetchuser = (req , res , next) =>{
    try{
        const token1 = req.header("send-token")
        const token2 = req.header("rec-token")
        if(!token1 || !token2){
            res.status(500).json({ error: "Invalid token" });
        }
        const send = jwt.verify(token1 , jwtsecreat)
        const send2 = jwt.verify(token2 , jwtsecreat)
        req.user1 = send.user
        req.user2 = send2.user
        next()
    }
    catch(err){
        console.log(err)
        res.status(500).json({ error: "INternal server error" });
    }
    
}
module.exports = fetchuser
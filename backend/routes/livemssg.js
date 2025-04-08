const express = require('express');
const router = express.Router();
const User = require('../modules/User')
const fetchuser = require('../middlware/login')
const fetchmuser = require('../middlware/mssgmid')
const { check, validationResult }
    = require('express-validator');
const bodyparser = require('body-parser')
const livemssg = require('../modules/Livemssg')
var jwt = require('jsonwebtoken');
var jwtsecreat = "i am a good boy"



router.get('/getusers' , fetchuser , async(req , res)=>{
    try {
        const users = await User.find({ _id: { $ne: req.user } })
        .select('-_id -password -email');
        const user2 = await User.find({ _id: { $ne: req.user } })
        let auth = []
        auth = user2.map((ele)=>{
            var token = jwt.sign({ user : ele._id }, jwtsecreat);
            return token
        })
       
        res.json({users , auth});
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.post('/send' , [
    check('text', 'text length should be 2 to 20 characters')
                    .isLength({ min: 2 , max: 20 }),] , fetchmuser , async(req , res)=>{
    try {
         const errors = validationResult(req);
         
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
          const {text} = req.body
        
            const data1 = await User.findOne({ _id: req.user1});
           
            const mssg = new livemssg({
            senderid : req.user1,
            receiveid : req.user2,
            text,
            name : data1.name
          })
          const data = await mssg.save()
          res.json(data)
         
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.get('/fetch'  , fetchmuser , async(req , res)=>{
    try{
        const user1 = req.user1
        const user2 = req.user2
        const messages = await livemssg.find({
            $or: [
                { senderid: user1, receiveid: user2 },
                { senderid: user2, receiveid: user1 }
            ]
        }).sort({ timestamp: 1 }).select("-senderid -receiveid -_id"); // Sort messages by timestamp

        res.json(messages);
    }
    catch(err){
        console.log(err)
        res.status(500).json({ error: "Internal Server Error" });
    }
})






module.exports = router
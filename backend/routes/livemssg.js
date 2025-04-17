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
const Req = require("../modules/Req")
const Friends = require("../modules/Friends")


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

// Send Friend Request
router.post("/req", fetchmuser, async (req, res) => {
    try {
        const { user1, user2 } = req;

        // Check if already friends
        const alreadyFriends = await Friends.findOne({
            user: user1,
            friendid: user2
        });

        if (alreadyFriends) {
            return res.status(400).json({ error: "Already friends" });
        }

        // Check if request already sent
        const existingReq = await Req.findOne({
            senderid: user1,
            receiveid: user2
        });

        if (existingReq) {
            return res.status(400).json({ error: "Request already sent" });
        }

        const nam = await User.findById(user1).select("name");

        const data = new Req({
            senderid: user1,
            receiveid: user2,
            name: nam.name
        });

        const reqs = await data.save();
        res.json(reqs);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

 
 
 // Get Friend Requests
 router.get("/getreq", fetchuser , async(req,res) => {
     try {
         const requests = await Req.find({ receiveid: req.user }).select('name senderid');
         const auth = requests.map((ele) => {
             return jwt.sign({ user: ele.senderid }, jwtsecreat);
         });
         res.json({ requests, auth });
     } catch(err) {
         console.log(err);
         res.status(500).json({ error: "Internal Server Error" });
     }
 });
 
 
 // Accept Friend Request
 router.post("/addfre", fetchmuser , async(req, res) => {
     try {
         const { mssg } = req.body;
         const receiverId = req.user2;
         const senderId = req.user1;
 
         const receiver = await User.findById(receiverId).select('name');
         const sender = await User.findById(senderId).select('name');
 
         if (!receiver || !sender) {
             return res.status(404).json({ error: "User not found" });
         }
 
         if (mssg === "yes") {
             const friend1 = new Friends({ user: senderId, friendid: receiverId, name: receiver.name });
             const friend2 = new Friends({ user: receiverId, friendid: senderId, name: sender.name });
 
             await friend1.save();
             await friend2.save();
 
             await Req.deleteOne({ senderid: receiverId, receiveid: senderId });
 
             res.json({ success: true, friends: [friend1, friend2] });
         } else {
             return res.status(400).json({ errors: "User did not accept the request" });
         }
 
     } catch (err) {
         console.log(err);
         res.status(500).json({ error: "Internal Server Error" });
     }
 });
 
 
 // Get Friends
 router.get("/getfriends", fetchuser, async (req, res) => {
     try {
         const userId = req.user;
 
         const friends = await Friends.find({ user: userId }).select('friendid name');
         const auth = friends.map((ele) => {
             return jwt.sign({ user: ele.friendid }, jwtsecreat);
         });
 
         res.json({ friends, auth });
     } catch (err) {
         console.log(err);
         res.status(500).json({ error: "Internal Server Error" });
     }
 });
 







module.exports = router
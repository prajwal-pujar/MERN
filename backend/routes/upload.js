const express = require('express');
const router = express.Router();
const multer  = require('multer')
const Group = require('../modules/Group')
const fetchuser = require('../middlware/login')
const fetchmuser = require('../middlware/mssgmid')
var jwt = require('jsonwebtoken');
var jwtsecreat = "i am a good boy"
const Groupmssg = require('../modules/Groupmssg')
const User = require('../modules/User')

router.post('/grp' ,fetchuser , async(req ,res)=>{
  try{
    let {name , users} = req.body
    const creatorgrp = req.user
    let userid = []
    userid = users.map((ele)=>{
      const data = jwt.verify(ele, jwtsecreat)
      req.user = data.user 
      return req.user
    })
    const grp = new Group({
      name ,creator: creatorgrp, users:userid
    })
    const data = await grp.save()
    res.json(data)
  }
  catch(err){
    console.log(err)
    res.status(500).json({ error: "Internal Server Error" });

  }
})

router.get('/grpdetail' ,fetchuser , async(req ,res)=>{
  try{
    const token = req.user;
    const data = await Group.find({ users: { $in: [token] } }).select('-_id -users');
    const data1 = await Group.find({ users: { $in: [token] } });
    let token1 = []
    token1 = data1.map((ele)=>{
         var tok = jwt.sign({ user: ele._id }, jwtsecreat);
         return tok
    })
  
   
    res.json({data , token1});
  }
  catch(err){
    console.log(err)
  }
  
})


router.post('/mssg' , fetchmuser , async(req,res)=>{
  try{
    const token = req.user1;
    const token1 = req.user2;
    let username = await User.findById(token1).select("name");
    const {text , users} = req.body
    let userid = []
    userid = users.map((ele)=>{
      const data = jwt.verify(ele, jwtsecreat)
      req.user = data.user 
      return req.user
    })
    const grpmsg = new Groupmssg({
      name : username.name , groupId:token , text , users : userid
    })
    const data = await grpmsg.save()
    res.json(data)
  }
  catch(err){
    console.log(err)
    res.status(500).json({ error: "Internal Server Error" });

  }
})

router.get('/get' , fetchmuser , async(req,res)=>{
  try{
    const token = req.user1;
    const token1 = req.user2;
   
    const data = await Groupmssg.find({groupId : token}).select("-groupId -_id")
    res.json(data)
  }
  catch(err){
    console.log(err)
    res.status(500).json({ error: "Internal Server Error" });

  }

})

router.delete('/del', fetchmuser, async (req, res) => {
  try {
    const token = req.user1
    const token1 = req.user2
    console.log(token , token1)

    const dat = await Group.findById(token1);
    console.log(dat.creator)

    if (token == dat.creator) {
      
      await Group.findByIdAndDelete(token1);
      res.send("Message successful");
    } else {
      res.status(403).json({ error: "You are not the creator of the group" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});





module.exports = router
const express=require("express");
const router = express.Router();
const Item=require('../models/Item');
const { body, validationResult } = require('express-validator');
const { request } = require("express");

// Route1: fetchingAllitem using get request
router.get('/fetchallitem', async(req, res) => {
    try {
      const itemdetails=await Item.find();
      res.json(itemdetails);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }
  });

// Route2: adding new item using post 
router.post("/additem",[
  body("type"),
  body("description")
],async(req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  try{
    const {type,description}=req.body;
    const itemdetails=new Item({
      type,description
    });
    const saveData=await itemdetails.save();
    res.json(saveData);
  }catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

// Route:4 delete the using delete request
router.delete("/deleteitem/:id",async (req,res)=>{
  //find the item to be delete and delete it
  try{
    let itemdetails=await Item.findById(req.params.id);
    if(!itemdetails){return res.status(404).send("Not Found")};
    if(itemdetails.id.toString()!==req.params.id){
      return res.send("Not Allowed");
    }
    itemdetails=await Item.findByIdAndDelete(req.params.id);
    res.json("Success:The Item has been deleted");
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports=router
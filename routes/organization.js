const express=require("express");
const router = express.Router();
const Organization=require('../models/Organization');
const { body, validationResult } = require('express-validator');
const { request } = require("express");

// Route1: fetchingAllorganization using get request
router.get('/fetchallorganization', async(req, res) => {
    try {
      const organizationsdetails=await Organization.find();
      res.json(organizationsdetails);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }
  });

// Route2: adding new organization using post 
router.post("/addorganization",[
  body("name"),
],async(req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  try{
    const {name}=req.body;
    const organizationsdetails=new Organization({
      name
    });
    const saveData=await organizationsdetails.save();
    res.json(saveData);
  }catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

// Route:4 delete the using delete request
router.delete("/deleteorganization/:id",async (req,res)=>{
  //find the organization to be delete and delete it
  try{
    let organizationsdetails=await Organization.findById(req.params.id);
    if(!organizationsdetails){return res.status(404).send("Not Found")};
    if(organizationsdetails.id.toString()!==req.params.id){
      return res.send("Not Allowed");
    }
    organizationsdetails=await Organization.findByIdAndDelete(req.params.id);
    res.json("Success:The organization has been deleted");
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports=router
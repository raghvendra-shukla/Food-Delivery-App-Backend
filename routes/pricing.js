const express=require("express");
const router = express.Router();
const Pricing=require('../models/Pricing');
const { body, validationResult } = require('express-validator');
const { request } = require("express");
const Organization=require("../models/Organization");
const Item=require("../models/Item");

// Route1: fetchingAllPricing using get request
router.get('/fetchallPricing', async(req, res) => {
    try {
      const pricingdetails=await Pricing.find();
      res.json(pricingdetails);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error occured");
    }
  });

// Route2: adding new Pricing using post 
router.post("/addpricing",[
  body("organization_id").notEmpty(),
  body("item_id").notEmpty(),
  body("zone").notEmpty(),
  body("base_distance_in_km").isNumeric(),
  body("km_price").isNumeric(),
  body("fix_price").isNumeric(),
],async(req,res)=>{
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  try{
    const { organization_id, item_id, zone, base_distance_in_km, km_price, fix_price } = req.body;

    // Check if the organization exists
    const organization = await Organization.findById(organization_id);
    if (!organization) {
      return res.status(404).json({ error: "Organization not found" });
    }

    // Check if the item exists
    const item = await Item.findById(item_id);
    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    const pricingdetails=new Pricing({
      organization_id,
      item_id,
      zone,
      base_distance_in_km,
      km_price,
      fix_price
    });
    const saveData=await pricingdetails.save();
    res.json(saveData);
  }catch(error){
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

// Route:4 delete the using delete request
router.delete("/deletePricing/:id",async (req,res)=>{
  //find the Pricing to be delete and delete it
  try{
    let pricingdetails=await Pricing.findById(req.params.id);
    if(!pricingdetails){return res.status(404).send("Not Found")};
    if(pricingdetails.id.toString()!==req.params.id){
      return res.send("Not Allowed");
    }
    pricingdetails=await Pricing.findByIdAndDelete(req.params.id);
    res.json("Success:The Price has been deleted");
  }
  catch(error){
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

module.exports=router
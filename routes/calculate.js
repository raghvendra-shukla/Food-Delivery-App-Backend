// routes/pricing.js
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const Pricing= require('../models/Pricing');
const calculateTotalPrice=(baseDistance, kmPrice, fixPrice, totalDistance)=>{
    const additionalDistance = Math.max(totalDistance - baseDistance, 0);
    const additionalCost = additionalDistance * kmPrice;
    const totalPrice = fixPrice + additionalCost;
    return totalPrice;
  }

router.post("/totalprice",[
    body("zone").notEmpty(),
    body(" organization_id").notEmpty(),
    body("total_distance").isNumeric(),
    body("item_type").notEmpty()
  ],async (req, res) => {
  try {
    const { zone, organization_id, total_distance, item_type } = req.body;
    const pricingDetails = await Pricing.findOne({
      where: {
        organization_id,
        zone
      }
    });

    const totalPrice =calculateTotalPrice(
      pricingDetails.base_distance_in_km,
      pricingDetails.km_price,
      pricingDetails.fix_price,
      total_distance
    );

    res.json({ total_price: totalPrice });
  } 
  catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports=router

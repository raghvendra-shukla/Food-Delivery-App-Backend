const mongoose = require("mongoose");
const { Schema } = mongoose;

const PricingSchema = new Schema({
    organization_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "organization",
        required: true
    },
    item_id: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "item",
        required: true
    },
    zone: { 
        type: String,
        required: true 
    },
    base_distance_in_km: { 
        type:Number, 
        default: 5 
    },
    km_price: { 
        type: Number, 
        default: 1.5 
    },
    fix_price: { 
        type: Number, 
        default: 10 
    }
});

module.exports = mongoose.model("pricing", PricingSchema);

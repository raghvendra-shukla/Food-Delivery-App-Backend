const mongoose=require("mongoose");
const { Schema } = mongoose;

const Itemschema = new Schema({
    type:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    }
});

module.exports=mongoose.model("item",Itemschema);
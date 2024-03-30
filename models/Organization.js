const mongoose=require("mongoose");
const { Schema } = mongoose;

const Organizationschema = new Schema({
    name:{
        type:String,
        require:true
    }
});
const organization=mongoose.model("organization",Organizationschema);
module.exports=organization;
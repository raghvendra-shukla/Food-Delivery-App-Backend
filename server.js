const connectToMongo=require("./db");
connectToMongo();
const express = require('express');
const cors =require("cors");
const app = express();
const port =process.env.PORT || 5000;
app.set("view engine","ejs");
//A middleWare to  use req.body
app.use(express.json());
app.use(
  cors({
    origin:"*"
  })
)
app.use(express.static(__dirname + '/public'));
app.use('/public', express.static(__dirname + '/public'));
app.get("/",(req,res)=>{
  res.render("index");
})
//Avialable Routes
app.use("/api/item",require("./routes/item"));
app.use("/api/organization",require("./routes/organization"));
app.use("/api/pricing",require("./routes/pricing"));
app.use("/api/calculate",require("./routes/calculate"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})
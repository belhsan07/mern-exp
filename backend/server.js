require("dotenv").config();
const path = require('path')
const express = require("express");
const productRoutes = require("./routes/productRoutes");
const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "API running..." });
});

app.use("/api/products", productRoutes);

if (process.env.NODE_ENV ==="production") {
  app.use(express.static(path.joins(__dirname,'/frontend/build')))
  app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'frontend','build','index.html'))
  })
}else{
  app.get('/',(req,res)=>{
    res.send('api running')
  })
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

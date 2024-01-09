const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");

const clientRoutes = require("./routes/client.js");
const generalRoutes = require("./routes/general.js");
const managementRoutes = require("./routes/management.js");
const salesRoutes = require("./routes/sales.js");


// data imports
const modelsPath = "./models/";

const User =require( modelsPath + "User.js");
const Product = require(modelsPath + "Product.js");
const ProductStat = require(modelsPath + "ProductStat.js");
const Transaction = require(modelsPath + "Transaction.js");
const OverallStat = require(modelsPath + "OverallStat.js");
const AffiliateStat = require(modelsPath + "AffiliateStat.js");

const {
  dataUser,
  dataProduct,
  dataProductStat,
  dataTransaction,
  dataOverallStat,
  dataAffiliateStat,
} =require ("./data/index.js");

/* CONFIGURATION */
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
// app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

/* ROUTES */
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

/* MONGOOSE SETUP */
const mongouri=process.env.MONGO_URL;

const connect=async()=>{
    await mongoose.connect(mongouri)
    console.log("Now connected to mongo")
}

connect();

//App Setup
const port=process.env.PORT

app.listen(port,()=>{
    console.log(`App listening on port http://127.0.0.1:${port}`)
})

    /* ONLY ADD DATA ONE TIME */
    // AffiliateStat.insertMany(dataAffiliateStat);
    // OverallStat.insertMany(dataOverallStat);
    // Product.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat);
    // Transaction.insertMany(dataTransaction);
    // User.insertMany(dataUser);


    




    
   
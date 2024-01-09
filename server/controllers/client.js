const Product = require("../models/Product.js");
const ProductStat = require("../models/ProductStat.js");
const Transaction = require("../models/Transaction.js");
const User = require("../models/User.js");
const getCountryIso3 = require("country-iso-2-to-3");

 const getProducts = async (req, res) => {
  try {

    //grab all producs as we using find without any filter (query)
    const products = await Product.find();

    // Promise.all allows for concurrent execution of asynchronous operations, taking advantage of parallelism and potentially reducing the total time it takes to complete all the operations

    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stat = await ProductStat.find({
          productId: product._id,
        });

        //also add stat of product to each product
        return {
          //product._doc will retail all other properties
          ...product._doc,
          stat,
        };
      })
    );

    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getCustomers=async(req,res)=>{

  try{
    const customers=await User.find({role:"user"}).select("-password");
    res.status(200).json(customers)
  }catch(error){
    res.status(404).json({message:error.message})
  }
}

const getTransactions=async(req,res)=>{

  try{
    //sort should like this : { "field" : "userId" , "sort" : "desc" }
    const { page=1 , pageSize=20 , sort=null , search="" } = req.query;

    const genearteSort =()=>{
      const sortParsed = JSON.parse(sort);
      const sortFormatted={
        [sortParsed.field]:sortParsed.sort === "asc"? 1 : -1         
      };
      return sortFormatted;
    }
    const sortFormatted=Boolean(sort) ? genearteSort():{};

    const transactions = await Transaction.find({   
        userId:{$regex:new RegExp(search,"i")}     

    })

    .sort( sortFormatted )
    .skip( page * pageSize )
    .limit( pageSize )
   
const total = await Transaction.countDocuments({   
  userId:{$regex:new RegExp(search,"i")}
 })
    res.status(200).json({
      transactions,
      total,
    })

  }catch(error){
    res.status(404).json({message:error.message})
  }
}

 const getGeography = async (req, res) => {
  try {
    const users = await User.find();

    const mappedLocations = users.reduce((acc, { country }) => {
      const countryISO3 = getCountryIso3(country);
      if (!acc[countryISO3]) {
        acc[countryISO3] = 0;
      }
      acc[countryISO3]++;
      return acc;
    }, {});

    const formattedLocations = Object.keys(mappedLocations).map((country) => ({
      id: country,
      value: mappedLocations[country],
    }));
  
    res.status(200).json(formattedLocations);
  }catch(error){
    return res.status(404).json({message:error.message})
  }
}

module.exports={getProducts , getCustomers , getTransactions , getGeography };
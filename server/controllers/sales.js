const OverallStat = require("../models/OverallStat.js")

const getSales=async(req,res)=>{
    try{
        const overallStats= await OverallStat.find();
        
        //overllStats is actually an array with only 1 object
        res.status(200).json(overallStats[0])
    }catch(error){
        res.status(404).json({message:error.message})
    }
}

module.exports={getSales}
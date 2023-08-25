const mongoose = require('mongoose')

module.exports = async() =>{
    try{
        const connectionParams ={
            useNewUrlParser: true,
            // useCreateIndex: true,
            useUnifiedTopology: true
        };
        await mongoose.connect('mongodb+srv://29sharvariptl:to-do@cluster0.lxxrefy.mongodb.net/',
        connectionParams);
        console.log("Connected to DB");
    } catch (error){
        console.log("Failed connection to DB", error)
    }
}
const mongoose= require('mongoose');
require('dotenv').config();

const mongoDbURL=process.env.MONGO_URI;

const connectToMongo=async()=>{
    await mongoose.connect(mongoDbURL).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
}
module.exports=connectToMongo;
const mongoose= require('mongoose');

const mongoDbURL='mongodb://localhost:27017/visitorManagement';

const connectToMongo=async()=>{
    await mongoose.connect(mongoDbURL).then(()=> console.log("Connected to Mongo Successfully")).catch(err => console.log(err));
}
module.exports=connectToMongo;
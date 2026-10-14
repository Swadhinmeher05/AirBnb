const mongoose=require("mongoose");
const initData=require("./data.js");
const Listing=require("../models/listing.js");
const { init } = require("../models/user.js");

main()
.then(()=>{
    console.log("connection success!");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanedrlust'); 
}


const initDb=async()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({
        ...obj,owner:"6abea1b0ed1fa96a2cf1e03a",
    }));
    await Listing.insertMany(initData.data);
    console.log(" all data are saved!");
};

initDb();
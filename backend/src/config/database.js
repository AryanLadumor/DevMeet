const mongoose  =  require("mongoose");


const connectDB =async ()=>{
    await mongoose.connect("mongodb+srv://aryanladumor666:aryan1187@mynode.zxpe0vt.mongodb.net/devMeet")
}

module.exports = connectDB


const mongoose  = require("mongoose")

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User",
        index :true
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User",
        index :true
    },
    status:{
        type : String,
        required : true,
        enum :{
          values : ["interested" , "ignored" , "accepted" , "rejected"]  ,
          message : `{VALUE} is incorrect status type`
        } 
    }

} , {timestamps : true})




//created compuond index for optimised searching id 
connectionRequestSchema.index({fromUserId : 1 , toUserId:1})

//we can also create index with single indx if we only have one field
//TODO research INdex



//to secure APi [cannot send request To Ourself]
connectionRequestSchema.pre("save" ,  function (){
    //capturing Document
    const connectionRequest = this
    //Comparing Id of the sender and receiver
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        //if reached here doc.save() process is killed  , data not gonna reach mongodb
        throw new Error("Cannot send Request To Yourself")
    }
    //if different Id then only mongoDB will proceed to save 
    //No nedd of next here 
})


const ConnectionRequest = mongoose.model("ConnectionRequest" , connectionRequestSchema)
module.exports = ConnectionRequest;
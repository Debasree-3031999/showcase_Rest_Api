const mongoose=require("mongoose")


const connect =()=>{
    return mongoose.connect(
        "mongodb+srv://admin1234:soitanPranjal@cluster0.1iwdzcf.mongodb.net/NodeExpress?retryWrites=true&w=majority"
    )
}

module.exports=connect;
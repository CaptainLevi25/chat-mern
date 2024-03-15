import mongoose from "mongoose";

const messageSchema = new mongoose.Schema ( {
    message : { 
        type : String,
    },
    users : {
        type : Array,
    },
    sender : { 
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "User",
        // required: true,
        type : String,
        required : true
    },
    
},
{
    timestamps: true,
}
)


export default mongoose.model("Message", messageSchema);
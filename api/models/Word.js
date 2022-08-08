import mongoose from "mongoose";


const WordSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    language:{
        type: String,
        required: true
    },
    words:{
        type: String,
        required: true
    },

});

export default mongoose.model("Word", WordSchema)
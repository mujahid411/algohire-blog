import mongoose from "mongoose";

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    blogContent:{
       type:String,
       required:true
    },
    userId:{
        type:String
    },
    userName:{
        type:String
    },
    likes:{
        type:Number,
        default:0
    },
    comments:[]

}, { timestamps: true })

const blogModel = mongoose.model('Blog', blogSchema);
export default blogModel;

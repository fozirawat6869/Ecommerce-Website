import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"], // validation it cannot be empty
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please enter product name"], 
    },
    price:{
        type:Number,
        required:[true,"Please enter product name"],
        maxLength:[5,"price cannot exceed 5 digits"]
    },
    rating:{
        type:Number,
        default:0
    },
    image:[
        {
            public_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please enter product category"], // validation it cannot be empty
    },
    stock:{
        type:Number,
        required:[true,"Please enter product stock"],
        maxLength:[5,"price cannot exceed 5 digits"],
        default:1
    },
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
           name:{
            type:String,
            required:true
           },
           rating:{
            type:Number,
            required:true
           },
           comment:{
            type:String,
            required:true
           }
        } 
    ],
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

export default mongoose.model("productModel",productSchema)
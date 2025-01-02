import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"],
    },
    image: {
        type: String,
        required: [true, "Please add an image"],
    },
    price: {
        type: Number,
        required: [true, "Please add a price"],
    },
    category: {
        type: String,
        required: [true, "Please add a category"],
    },
    description: {
        type: String,
        required: [true, "Please add a description"],
    },
    isFeatured: {
        type: Boolean,
        default: false
    }, 
    
},{ timestamps: true});

const Product = mongoose.model("Product", productSchema);

export default Product;
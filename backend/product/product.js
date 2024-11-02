import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    title: String,
    price: String,
    offerprice: String,
    productCover: String,
    category: String,
    description: String,
    author: {type: Schema.Types.ObjectId, ref: 'admin'},
}, 
{timeStramps: true}
                    );

const productModel = new mongoose.model('products', productSchema);

export default productModel;
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    products: [
      {
         type : mongoose.Schema.Types.ObjectId,
         ref: 'products',
      }   
        ],
        total:{
          type: String,
          length: 1,
        }
})

const cartModel = new mongoose.model('cart', cartSchema);

export default cartModel;
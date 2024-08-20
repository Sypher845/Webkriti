import mongoose, { modelNames } from 'mongoose';


const userLoginSchema = new mongoose.Schema({
    username: String,
    password: String,
    cart:[Object]
});
const productSchema = new mongoose.Schema({
    name: String,
    img: Array,
    og_price: Number,
    sell_price: Number,
    desc: String
});
const cartSchema = new mongoose.Schema({
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product'
            },
            quantity: Number
        }
    ]
});
export const userDetails = mongoose.model('userDetails',userLoginSchema);
export const Tshirts = mongoose.model('Tshirts',productSchema);
export const Trousers =mongoose.model('Trousers',productSchema);
export const Jeans = mongoose.model('Jeans',productSchema);
export const Cart = mongoose.model('Cart',cartSchema);
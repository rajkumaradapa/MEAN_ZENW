const mongoose = require("mongoose");
const Products = new mongoose.Schema({
    Product_ID: { type: String, default: "" },
    StoreID: { type: String, default: "" },
    Name: { type: String, default: "" },
    Category: { type: String, default: "" },
    Description: { type: String, default: "" },
    Available_Qty: { type: Number, default: 0 },
   
   
    Status: { type: Boolean, default: true },
}, { collection: 'Products', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
module.exports = mongoose.model('Products', Products);
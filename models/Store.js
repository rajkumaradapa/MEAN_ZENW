const mongoose = require("mongoose");
const Store = new mongoose.Schema({
    AdminID: { type: String, default: "" }, //sub User
    StoreID: { type: String, default: "" },
    Name: { type: String, default: "" },
    PhoneNumber: { type: String, default: "" },
    EmailID: { type: String, default: "" },
    Latitude: Number,
    Longitude: Number,
    Point: {
        type: [Number],
        index: '2d'
    },
    location: {
        type: { type: String, default: "Point" },
        coordinates: [Number],
    },
    Status: { type: Boolean, default: true },
    created_at: { type: Date, default: null },
    updated_at: { type: Date, default: null }
}, { collection: 'Store' });
Store.index({ Point: '2dsphere' });
Store.index({ location: '2dsphere' });
module.exports = mongoose.model('Store', Store);
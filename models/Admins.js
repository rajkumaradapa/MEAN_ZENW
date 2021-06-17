const mongoose = require("mongoose");
const Admins = new mongoose.Schema({
    AdminID: { type: String, default: "" },
    SessionID: { type: String, default: "" },
    Admin_Type: { type: Number, default: 0 }, //1.Admin 2.SUb User
    Name: { type: String, default: "" },
    PhoneNumber: { type: String, default: "" },
    EmailID: { type: String, default: "" },
    PasswordHash: { type: String, default: "" },
    PasswordSalt: { type: String, default: "" },
   
    Whether_Phone_Number_Verified: { type: Boolean, default: false },
    Status: { type: Boolean, default: true },
}, { collection: 'Admins', timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });
module.exports = mongoose.model('Admins', Admins);
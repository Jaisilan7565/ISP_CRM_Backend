"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Isp = void 0;
const mongoose = require("mongoose");
const ispSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    ispName: { type: String },
    email: { type: String, },
    address: { type: String, },
    pinCode: { type: String, },
    staticIpCharge: { type: Number, default: 0 },
    contacts: [
        {
            name: { type: String },
            phone: { type: String }
        }
    ],
    plans: [
        {
            planName: { type: String },
            price: { type: Number }
        }
    ],
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date, default: Date.now },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String }
});
exports.Isp = mongoose.model("Isp", ispSchema);
//# sourceMappingURL=isp.model.js.map
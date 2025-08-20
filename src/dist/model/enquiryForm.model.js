"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enquiry = void 0;
const mongoose_1 = require("mongoose");
;
const enquirySchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Types.ObjectId, required: true, auto: true },
    name: { type: String },
    email: { type: String },
    contact: { type: Number },
    address: { type: String },
    plan: { type: String },
    location: {
        lat: { type: String },
        lng: { type: String }
    },
    enquiryStatus: { type: String, default: "Pending" },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
    createdOn: { type: Date },
    createdBy: { type: String }
});
exports.Enquiry = mongoose_1.default.model('EnquiryForm', enquirySchema);
//# sourceMappingURL=enquiryForm.model.js.map
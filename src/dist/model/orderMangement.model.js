"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderManagement = void 0;
const mongoose_1 = require("mongoose");
const mongoose_plugin_autoinc_1 = require("mongoose-plugin-autoinc");
const orderManagementSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Types.ObjectId, required: true, auto: true },
    employeeId: { type: String },
    orderId: { type: String },
    orderNumber: { type: Number },
    orderDate: { type: Date, default: Date.now },
    customerName: { type: String },
    customerAddress: { type: String },
    customerEmail: { type: String },
    customerContact: { type: Number },
    pinCode: { type: Number },
    city: { type: String },
    feasibility: { type: String },
    plan: { type: String },
    inventory: [
        {
            itemName: { type: String },
            quantity: { type: Number },
            price: { type: Number },
        },
    ],
    totalAmount: { type: Number },
    orderStatus: { type: String },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
}, { timestamps: { createdAt: 'createdOn', updatedAt: 'modifiedOn' } });
orderManagementSchema.plugin(mongoose_plugin_autoinc_1.autoIncrement, {
    model: 'OrderMangement',
    field: 'orderNumber',
    startAt: 1000,
    incrementBy: 1
});
orderManagementSchema.pre('save', function (next) {
    if (!this.orderId && this.orderNumber) {
        this.orderId = `ORD${this.orderNumber}`;
    }
    next();
});
exports.OrderManagement = mongoose_1.default.model("OrderMangement", orderManagementSchema);
//# sourceMappingURL=orderMangement.model.js.map
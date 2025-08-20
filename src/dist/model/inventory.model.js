"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inventory = void 0;
const mongoose_1 = require("mongoose");
const category_model_1 = require("./category.model");
const inventorySchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Types.ObjectId, required: true, auto: true },
    productId: { type: String },
    productName: { type: String },
    CategoryId: { type: mongoose_1.default.Types.ObjectId, ref: category_model_1.Category },
    quantity: { type: Number },
    price: { type: Number },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
}, { timestamps: { createdAt: 'createdOn', updatedAt: 'modifiedOn' } });
exports.Inventory = mongoose_1.default.model("Inventory", inventorySchema);
//# sourceMappingURL=inventory.model.js.map
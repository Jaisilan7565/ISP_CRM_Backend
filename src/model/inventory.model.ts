import mongoose from "mongoose";
import { Category } from "./category.model";

export interface InventoryDocument extends mongoose.Document {
    _id?:any;
    productId?: string;
    productName?: string;
    CategoryId?: any;
    quantity?: number;
    price?: number;
    isDeleted?: boolean;
    status?: number;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
}

const inventorySchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    productId: { type: String },
    productName: { type: String },
    CategoryId: { type: mongoose.Types.ObjectId, ref: Category },
    quantity: { type: Number ,default:0},
    price: { type: Number },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
},{ timestamps: { createdAt: 'createdOn', updatedAt: 'modifiedOn' } });

export const Inventory = mongoose.model("Inventory", inventorySchema);
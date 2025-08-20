import mongoose from "mongoose";
import { autoIncrement } from "mongoose-plugin-autoinc";
import { Category } from "./category.model";

export interface OrderMangementDocument extends mongoose.Document {
  _id?: any;
  employeeId?: string;
  orderId?: String;
  orderNumber?: number;
  orderDate?: Date;
  customerName?: string;
  customerAddress?: string;
  customerEmail?: string;
  customerContact?: number;
  pinCode?: number;
  city?: string;
  feasibility?: any;
  plan?: any[];
  inventory?: any[];
  totalAmount?: number;
  orderStatus?: string;
  bundled?: boolean;
  subscribeDate?: Date;
  isDeleted?: boolean;
  status?: number;
  createdOn?: Date;
  createdBy?: string;
  modifiedOn?: Date;
  modifiedBy?: string;
}

const orderManagementSchema = new mongoose.Schema(
  {
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
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
    feasibility: {
       feas_Id:{type:mongoose.Types.ObjectId},
       feas_Name:{type:String}
      },
    plan: { 
      planId:{type:mongoose.Types.ObjectId},
      planName: { type: String }, 
      price: { type: Number },
    },

    inventory: [
      {
        productId: { type: String },
        productName: { type: String },
        CategoryId: { type: String },
        quantity: { type: Number },
        price: { type: Number },
      },
    ],
    totalAmount: { type: Number },
    orderStatus: { type: String, default: "Pending" },
    bundled: { type: Boolean, default: false },
    subscribeDate: { type: Date, default: "" },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
  },
  { timestamps: { createdAt: "createdOn", updatedAt: "modifiedOn" } }
);

orderManagementSchema.plugin(autoIncrement, {
  model: "OrderMangement",
  field: "orderNumber",
  startAt: 1000,
  incrementBy: 1,
});

orderManagementSchema.pre("save", function (next) {
  if (!this.orderId && this.orderNumber) {
    this.orderId = `ORD${this.orderNumber}`;
  }
  next();
});

export const OrderManagement = mongoose.model("OrderMangement",orderManagementSchema);



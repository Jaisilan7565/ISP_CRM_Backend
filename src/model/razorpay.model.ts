// src/model/razorpay.model.ts
import mongoose from "mongoose";

export interface PaymentDocument extends mongoose.Document {
    _id?:any;
    custId?: string;
    subsId?: string;
    amount?: number;
    subsplan?: string;
    activationDate?: Date;
    renewalDate?: Date;
    paymentLink?: string;
    dueDate?: Date;
    status?: string;
    idDeleted?: boolean;
    createdOn?:Date;
    createdBy?:string;
    modifiedOn?:Date;
    modifiedBy?:string
}


const RazorpayPaymentSchema = new mongoose.Schema(
  {
    _id:{type:mongoose.Types.ObjectId, required: true, auto: true },
    custId: { type: String, },
    subsId: { type: String,  },
    amount: { type: Number,},
    subsplan:{type:String,},
    activationDate: { type: Date, },
    renewalDate: { type: Date, },
    paymentLink: { type: String, },
    dueDate: { type: Date,  },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },
    isDeleted: { type: Boolean, default: false },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
  },
  { timestamps: true }
);

export const RazorpayPayment = mongoose.model(
  "RazorpayPayment",
  RazorpayPaymentSchema
);


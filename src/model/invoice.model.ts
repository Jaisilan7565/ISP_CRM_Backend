 import mongoose from "mongoose";
 import  { v4 as uuidv4 } from "uuid";

 export interface InvoiceDocument extends mongoose.Document {
    _id?: string;
    invoiceNumber?: string;
    orderId?: string;
    invoiceDate?: Date;
    startDate?: Date;
    endDate?: Date;
    paymentDueDate?: Date;
    customerId?: string;
    customerName?: string;
    customerAddress?: string;
    customerContact?: number;
    customerEmail?: string;
    pinCode?: number;
    inventory?: any[];
    subAmount?: number;
    gst?: number;
    discount?: number;
    totalAmount?: number;
    isDeleted?: boolean;
    status?: number;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
  }


  const invoiceSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    invoiceNumber: { type: String },
    orderId: { type: String },
    invoiceDate: { type: Date },
    startDate: { type: Date },
    endDate: { type: Date },
    paymentDueDate: { type: Date },
    customerId: { type: String },
    customerName: { type: String },
    customerAddress: { type: String },
    customerContact: { type: Number },
    customerEmail: { type: String },
    pinCode: { type: Number },
    inventory: [
      {
        productId: { type: String },
        price: { type: Number },
        
    }],
    subAmount: { type: Number },
    gst: { type: Number },
    discount: { type: Number },
    totalAmount: { type: Number },
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
  });



  invoiceSchema.pre("save", async function (next) {
    if (!this.invoiceNumber) {
        this.invoiceNumber = `INV-${uuidv4().split("-")[0].toUpperCase()}`;
    }
    next();
});

  export const Invoice = mongoose.model("Invoice", invoiceSchema);
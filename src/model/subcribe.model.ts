import mongoose from "mongoose";


export interface SubcribeDocument extends mongoose.Document {
    _id?:any;
    orderId?:any;
    custId?:string;
    custEmail?:string;
    subsId?:string;
    activationDate?:Date;
    subscribeStatus?:string;
    isDeleted?: boolean;
    status?: number;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
}

const subcribeSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    orderId:{type:mongoose.Types.ObjectId, ref:"OrderMangement"},
    custId:{type:String,default:""},                // customer ID 
    custEmail:{type:String},                       //customer email
    subsId:{type:String},                       // subcription ID 
    activationDate:{type:Date,default:Date.now()},
    renewalDate:{type:Date,default:""},
    subscribeStatus:{type:String,default:"active"},
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
},{ timestamps: { createdAt: 'createdOn', updatedAt: 'modifiedOn' } });



subcribeSchema.pre("save", async function (next) {
    if (!this.subsId) {
        const count = await mongoose.model("Subcribe").countDocuments();
      this.subsId = `Sub${count + 11}`;
    }
    next();
  });
export const Subcribe = mongoose.model("Subcribe", subcribeSchema);
import * as mongoose from "mongoose";

export interface IspDocument extends mongoose.Document {
    _id?: any;
    ispName?: string;
    email?: string;
    address?: string;
    pinCode?: string;
    staticIpCharge?: number;
    contacts?:any[];
    plans?:any[];
    isDeleted?: boolean;
    status?: number;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
}

const ispSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    ispName: { type: String },
    email: { type: String,},
    address: { type: String,},
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
            price: { type: Number  }
        }
    ],

    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date, default: Date.now },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String }
});


export const Isp = mongoose.model<IspDocument>("Isp", ispSchema);

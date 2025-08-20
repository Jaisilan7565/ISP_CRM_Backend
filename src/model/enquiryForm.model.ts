import mongoose from 'mongoose';

export interface EnquiryDocument extends mongoose.Document {
    _id?: any;
    name?: string;
    email?: string;
    contact?: number;
    address?: string;
    plan?: string;
    location?: any[];
    isDeleted?: boolean;
    enquiryStatus?:string;
    status?: number;
    modifiedOn?: Date;
    modifiedBy?: string;
    createdOn?: Date;
    createdBy?: string;
};

const enquirySchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    name: { type: String },
    email: {type:String},
    contact: {type : Number},
    address: {type : String},
    plan: {type : String},
    location:{
        lat:{type: String},
        lng:{type: String}
    },
    enquiryStatus: {type:String,default:"Pending"},
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
    createdOn: { type: Date },
    createdBy: { type: String }
});

export const Enquiry = mongoose.model('EnquiryForm', enquirySchema);
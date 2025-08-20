import mongoose from "mongoose";

export interface TicketDocument extends mongoose.Document {
    _id?: any;
    ticketId?: string;
    name?: string;
    email?: string;
    subject?: string;
    description?: string;
    state?: string;
    pincode?: number;
    ticketStatus?: string;
    isDeleted?: boolean;
    status?: number;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
}

const ticketSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    ticketId: { type: String },
    name: { type: String },
    ticketStatus: { type: String ,default:"Pending"},
    email: { type: String },
    subject: { type: String },
    description: { type: String },
    state: { type: String },
    pincode: { type: Number },  
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
},{ timestamps: { createdAt: 'createdOn', updatedAt: 'modifiedOn' } });

export const Ticket = mongoose.model("Ticket", ticketSchema);
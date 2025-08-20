import mongoose from 'mongoose';
import { autoIncrement } from 'mongoose-plugin-autoinc';

export interface EmployeeDocument extends mongoose.Document {
    _id?: any;
    name?: string;
    employeeId?: string;
    employeeIdNumber?: number;
    email?: string;
    contact?: number;
    password?: any;
    joiningDate?: Date;
    employeeRole?: string;
    isDeleted?: boolean;
    status?: number;
    createdOn?: Date;
    createdBy?: string;
    modifiedOn?: Date;
    modifiedBy?: string;
}

const employeeSchema = new mongoose.Schema({
    _id: { type: mongoose.Types.ObjectId, required: true, auto: true },
    employeeId: { type: String, unique: true },
    employeeIdNumber: { type: Number, unique: true }, // Auto-incremented field
    name: { type: String },
    email: { type: String },
    password: { type: String },
    contact: { type: Number },
    joiningDate: { type: Date },
    employeeRole: { type: String },
    // employeeRole: [{
    //     role: { type: String, refPath: 'employeeRole.modelType' },
    //     modelType: { type: String, enum: ['Admin', 'Employee', 'Manager'],},
    // }],
    isDeleted: { type: Boolean, default: false },
    status: { type: Number, default: 1 },
    createdOn: { type: Date },
    createdBy: { type: String },
    modifiedOn: { type: Date },
    modifiedBy: { type: String },
});

employeeSchema.plugin(autoIncrement, {
    model: 'Employee',
    field: 'employeeIdNumber',
    startAt: 1000,
    incrementBy: 1
});

employeeSchema.pre<EmployeeDocument>('save', function (next) {
    if (!this.employeeId && this.employeeIdNumber) {
        this.employeeId = `EMP${this.employeeIdNumber}`;
    }
    next();
});

export const Employee = mongoose.model<EmployeeDocument>('Employee', employeeSchema);

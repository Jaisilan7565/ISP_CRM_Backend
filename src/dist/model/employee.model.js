"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
const mongoose_1 = require("mongoose");
const mongoose_plugin_autoinc_1 = require("mongoose-plugin-autoinc");
const employeeSchema = new mongoose_1.default.Schema({
    _id: { type: mongoose_1.default.Types.ObjectId, required: true, auto: true },
    employeeId: { type: String, unique: true },
    employeeIdNumber: { type: Number, unique: true },
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
employeeSchema.plugin(mongoose_plugin_autoinc_1.autoIncrement, {
    model: 'Employee',
    field: 'employeeIdNumber',
    startAt: 1000,
    incrementBy: 1
});
employeeSchema.pre('save', function (next) {
    if (!this.employeeId && this.employeeIdNumber) {
        this.employeeId = `EMP${this.employeeIdNumber}`;
    }
    next();
});
exports.Employee = mongoose_1.default.model('Employee', employeeSchema);
//# sourceMappingURL=employee.model.js.map
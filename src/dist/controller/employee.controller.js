"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEmployee = exports.getSingleEmployee = exports.getAllEmployees = exports.loginEmail = exports.saveEmployee = void 0;
const express_validator_1 = require("express-validator");
const ErrorMessage_1 = require("../helper/ErrorMessage");
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
const Encryption_1 = require("../helper/Encryption");
const TokenManager = require("../utils/tokenManager");
const employee_model_1 = require("../model/employee.model");
var activity = 'Employee';
/**
 * @author Mohanraj V
 * @date 25-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to create employee as a User.
 */
let saveEmployee = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const usersData = await employee_model_1.Employee.findOne({ $and: [{ isDeleted: false }, { email: req.body.email }, { contact: req.body.contact }] });
            if (!usersData) {
                req.body.password = await (0, Encryption_1.encrypt)(req.body.password);
                const employeeDetails = req.body;
                const createData = new employee_model_1.Employee(employeeDetails);
                let insertData = await createData.save();
                const token = await TokenManager.CreateJWTToken({
                    id: insertData["_id"],
                    name: insertData["name"],
                });
                const result = {};
                result['_id'] = insertData._id;
                result['name'] = insertData.name;
                result['employeeRole'] = insertData.employeeRole;
                let finalResult = {};
                finalResult["loginType"] = 'Employee';
                finalResult["employeeDetails"] = result;
                finalResult["token"] = token;
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Save-Employees', true, 200, result, ErrorMessage_1.clientError.success.registerSuccessfully);
            }
            else {
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-Employees', true, 422, {}, 'Mobilenumber (or) Email already registered');
            }
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-Employees', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-Employees', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.saveEmployee = saveEmployee;
/**
 * @author Mohanraj V
 * @date 27-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to Login employees
 */
let loginEmail = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const user = await employee_model_1.Employee.findOne({ $and: [{ email: req.body.email }, { isDeleted: false }] }, { email: 1, password: 1, name: 1, status: 1, employeeRole: 1, employeeId: 1 });
            if (user) {
                const newHash = await (0, Encryption_1.decrypt)(user.password);
                console.log(user.password, req.body.password, newHash);
                if (user["status"] === 2) {
                    (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Login-Email', false, 499, {}, ErrorMessage_1.clientError.account.inActive);
                }
                else if (newHash != req.body.password) {
                    (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Login-Email', false, 403, {}, "Invalid Password !");
                }
                else {
                    const token = await TokenManager.CreateJWTToken({
                        id: user["_id"],
                        name: user["name"],
                        loginType: 'employee'
                    });
                    const details = {};
                    details['_id'] = user._id;
                    details['email'] = user.email;
                    details['employeeId'] = user.employeeId;
                    details['name'] = user.name;
                    details['employeeRole'] = user.employeeRole;
                    let finalResult = {};
                    finalResult["loginType"] = 'employee';
                    finalResult["employeeDetails"] = details;
                    finalResult["token"] = token;
                    (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Login-employee', true, 200, finalResult, ErrorMessage_1.clientError.success.loginSuccess);
                }
            }
            else {
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Login-Employees', true, 422, {}, 'Email Not Registered');
            }
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Login-employee', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Login-Employees', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.loginEmail = loginEmail;
/**
 * @author Mohanraj V
 * @date 03-03-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to get all employees
 */
let getAllEmployees = async (req, res, next) => {
    try {
        const employees = await employee_model_1.Employee.find({ isDeleted: false }, { password: 0 });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-All-Employees', true, 200, employees, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-All-Employees', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getAllEmployees = getAllEmployees;
/**
 * @author Mohanraj V
 * @date 03-03-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to get single employee.
 */
let getSingleEmployee = async (req, res, next) => {
    try {
        const employee = await employee_model_1.Employee.findById({ _id: req.query._id });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-Single-Employees', true, 200, employee, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-Single-Employees', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getSingleEmployee = getSingleEmployee;
/**
 * @author Mohanraj V
 * @date 03-03-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to update employee
 */
let updateEmployee = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const employee = await employee_model_1.Employee.findByIdAndUpdate({ _id: req.body._id }, {
                $set: {
                    name: req.body.name,
                    employeeRole: req.body.employeeRole
                }
            });
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Update-Employee', true, 200, employee, ErrorMessage_1.clientError.success.updateSuccess);
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-Employee', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-Employee', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.updateEmployee = updateEmployee;
//# sourceMappingURL=employee.controller.js.map
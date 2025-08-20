"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteIsp = exports.updateIsp = exports.getSingleIsp = exports.getAllIsp = exports.saveIsp = void 0;
const express_validator_1 = require("express-validator");
const ErrorMessage_1 = require("../helper/ErrorMessage");
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
const isp_model_1 = require("../model/isp.model"); // Assuming this is the model file
const activity = "ISP";
/**
 * @author Mohanraj V
 * @date 12-03-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function is used to create ISP
 */
let saveIsp = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const ispData = req.body;
            const createIsp = new isp_model_1.Isp(ispData);
            const insertIsp = await createIsp.save();
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Save-ISP', true, 200, insertIsp, ErrorMessage_1.clientError.success.registerSuccessfully);
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-ISP', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-ISP', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.saveIsp = saveIsp;
/**
 * @author Mohanraj V
 * @date 12-03-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function is used to get all ISPs
 */
let getAllIsp = async (req, res, next) => {
    try {
        const ispList = await isp_model_1.Isp.find({ isDeleted: false });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-All-ISP', true, 200, ispList, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-All-ISP', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getAllIsp = getAllIsp;
/**
 * @author Mohanraj V
 * @date 12-03-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function is used to get single ISP
 */
let getSingleIsp = async (req, res, next) => {
    try {
        const isp = await isp_model_1.Isp.findById({ $and: [{ isDeleted: false }, { _id: req.query._id }] });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Get-Single-ISP', true, 200, isp, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get-Single-ISP', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getSingleIsp = getSingleIsp;
/**
 * @author Mohanraj V
 * @date 12-03-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function is used to update ISP
 */
let updateIsp = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const ispmData = await isp_model_1.Isp.findOneAndUpdate({ _id: req.body._id }, {
                $set: {
                    ispName: req.body.ispName,
                    email: req.body.email,
                    address: req.body.address,
                    pinCode: req.body.pinCode,
                    staticIpCharge: req.body.staticIpCharge,
                    contacts: req.body.contacts,
                    plans: req.body.plans,
                    modifiedOn: new Date(),
                }
            });
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Update-ISP', true, 200, ispmData, ErrorMessage_1.clientError.success.updateSuccess);
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-ISP', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-ISP', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.updateIsp = updateIsp;
/**
 * @author Mohanraj V
 * @date 12-03-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This function is used to delete ISP
 */
let deleteIsp = async (req, res, next) => {
    try {
        const isp = await isp_model_1.Isp.findOneAndUpdate({ _id: req.query._id }, {
            $set: {
                isDeleted: true,
                modifiedOn: new Date(),
            }
        }, { new: true });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Delete-ISP', true, 200, isp, ErrorMessage_1.clientError.success.deleteSuccess);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Delete-ISP', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.deleteIsp = deleteIsp;
//# sourceMappingURL=isp.controller.js.map
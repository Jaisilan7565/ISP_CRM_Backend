"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateEnquiry = exports.getAllEnquiry = exports.saveEnquiryData = void 0;
const express_validator_1 = require("express-validator");
const ErrorMessage_1 = require("../helper/ErrorMessage");
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
const enquiryForm_model_1 = require("../model/enquiryForm.model");
var activity = "Enquiry";
/**
 * @author Mohanraj V
 * @date  21-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to create Enquiry Form.
 */
let saveEnquiryData = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const EnquiryData = await enquiryForm_model_1.Enquiry.findOne({ $and: [{ isDeleted: false }, { email: req.body.email }] });
            if (!EnquiryData) {
                const EnquiryDetails = req.body;
                const createData = new enquiryForm_model_1.Enquiry(EnquiryDetails);
                let insertData = await createData.save();
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Save-Enquiry', true, 200, {}, ErrorMessage_1.clientError.success.registerSuccessfully);
            }
            else {
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-Enquiry', true, 422, {}, 'Email already registered');
            }
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-Enquiry', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-Enquiry', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.saveEnquiryData = saveEnquiryData;
/**
 * @author Mohanraj V
 * @date  21-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to view all enquery Form.
 */
let getAllEnquiry = async (req, res, next) => {
    try {
        const showData = await enquiryForm_model_1.Enquiry.find({ isDeleted: false });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'GetAll-Enquiry', true, 200, showData, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'GetAll-Enquiry', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getAllEnquiry = getAllEnquiry;
/**
 * @author Mohanraj V
 * @date  21-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to update Enquiry Form.
 */
let updateEnquiry = async (req, res, next) => {
    try {
        const updateEnquiry = await enquiryForm_model_1.Enquiry.findOneAndUpdate({ _id: req.body._id }, {
            $set: {
                enquiryStatus: req.body.updateStatus
            }
        });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'Update-Enquiry', true, 200, updateEnquiry, ErrorMessage_1.clientError.success.updateSuccess);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-Enquiry', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.updateEnquiry = updateEnquiry;
//# sourceMappingURL=enquiryForm.controller.js.map
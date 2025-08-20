"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteOrderManagement = exports.getSingleEmployeeOrders = exports.updateOrderManagement = exports.getAllOrderManagement = exports.saveOrderData = void 0;
const express_validator_1 = require("express-validator");
const ErrorMessage_1 = require("../helper/ErrorMessage");
const commonResponseHandler_1 = require("../helper/commonResponseHandler");
const orderMangement_model_1 = require("../model/orderMangement.model");
var activity = "OrderManagement";
/**
 * @author Mohanraj V
 * @date  25-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to create employee orders.
 */
let saveOrderData = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const orderData = await orderMangement_model_1.OrderManagement.findOne({ $and: [{ isDeleted: false }, { customerEmail: req.body.customerEmail }] });
            if (!orderData) {
                const orderDetails = req.body;
                const createData = new orderMangement_model_1.OrderManagement(orderDetails);
                let insertData = await createData.save();
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-2', 'Save-OrderManagement', true, 200, insertData, ErrorMessage_1.clientError.success.registerSuccessfully);
            }
            else {
                (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-OrderManagement', true, 422, {}, 'customerEmail already registered');
            }
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-OrderManagement', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Save-OrderManagement', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.saveOrderData = saveOrderData;
/**
 * @author Mohanraj V
 * @date  25-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to view all   Orders.
 */
let getAllOrderManagement = async (req, res, next) => {
    try {
        const showData = await orderMangement_model_1.OrderManagement.find({ isDeleted: false });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'GetAll-OrderManagement', true, 200, showData, ErrorMessage_1.clientError.success.fetchedSuccessfully);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'GetAll-OrderManagement', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getAllOrderManagement = getAllOrderManagement;
/**
 * @author Mohanraj V
 * @date  25-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to update Order Form.
 */
let updateOrderManagement = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        try {
            const updateOrderManagement = await orderMangement_model_1.OrderManagement.findOneAndUpdate({ _id: req.body._id }, {
                $set: {
                    orderStatus: req.body.orderStatus
                }
            });
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'Update-OrderManagement', true, 200, updateOrderManagement, ErrorMessage_1.clientError.success.updateSuccess);
        }
        catch (err) {
            (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-OrderManagement', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
        }
    }
    else {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Update-OrderManagement', false, 422, {}, ErrorMessage_1.errorMessage.fieldValidation, JSON.stringify(errors.mapped()));
    }
};
exports.updateOrderManagement = updateOrderManagement;
/**
 * @author Mohanraj V
 * @date  26-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to get single employee orders.
 */
let getSingleEmployeeOrders = async (req, res, next) => {
    try {
        const getEmployeeOrders = await orderMangement_model_1.OrderManagement.find({ $and: [{ isDeleted: false }, { employeeId: req.query.employeeId }] });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'Get Single-OrderManagement', true, 200, getEmployeeOrders, ErrorMessage_1.clientError.success.updateSuccess);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Get Single-OrderManagement', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.getSingleEmployeeOrders = getSingleEmployeeOrders;
/**
 * @author Mohanraj V
 * @date  26-02-2025
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 * @description This Function is used to delete employee orders.
 */
let deleteOrderManagement = async (req, res, next) => {
    try {
        const deleteOrderManagement = await orderMangement_model_1.OrderManagement.findOneAndUpdate({ _id: req.query._id }, {
            $set: {
                isDeleted: true
            }
        });
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-1', 'Delete-OrderManagement', true, 200, deleteOrderManagement, ErrorMessage_1.clientError.success.updateSuccess);
    }
    catch (err) {
        (0, commonResponseHandler_1.response)(req, res, activity, 'Level-3', 'Delete-OrderManagement', false, 500, {}, ErrorMessage_1.errorMessage.internalServer, err.message);
    }
};
exports.deleteOrderManagement = deleteOrderManagement;
//# sourceMappingURL=orderManagement.controller.js.map